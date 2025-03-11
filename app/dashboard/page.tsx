"use client"

import { useState, useEffect, useMemo } from "react"
import { useAuth } from "@/providers/auth-provider"
import { fetchUsers, fetchPresence, fetchUserPhoto } from "@/lib/graph-service"
import type { User, FilterOptions } from "@/types/graph"
import UserCard from "@/components/user-card"
import FilterPanel from "@/components/filter-panel"

export default function Dashboard() {
  const { getToken } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    department: "",
    presenceStatus: "",
  })

  const departments = useMemo(() => {
    const deptSet = new Set<string>()
    users.forEach((user) => {
      if (user.department) {
        deptSet.add(user.department)
      }
    })
    return Array.from(deptSet).sort()
  }, [users])

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = await getToken()
      if (!token) {
        throw new Error("Failed to get authentication token")
      }

      // Fetch users
      const usersData = await fetchUsers(token)

      if (usersData.length === 0) {
        setLoading(false)
        setUsers([])
        return
      }

      // Fetch presence for all users
      const userIds = usersData.map((user) => user.id)
      const presenceData = await fetchPresence(token, userIds)

      // Fetch photos and combine all data
      const usersWithPresence = await Promise.all(
        usersData.map(async (user) => {
          const photoUrl = await fetchUserPhoto(token, user.id)
          return {
            ...user,
            photoUrl,
            presence: presenceData[user.id],
          }
        }),
      )

      setUsers(usersWithPresence)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Filter by search term
      const searchMatch =
        !filters.search ||
        user.displayName.toLowerCase().includes(filters.search.toLowerCase()) ||
        (user.mail && user.mail.toLowerCase().includes(filters.search.toLowerCase())) ||
        (user.jobTitle && user.jobTitle.toLowerCase().includes(filters.search.toLowerCase()))

      // Filter by department
      const departmentMatch = !filters.department || user.department === filters.department

      // Filter by presence status
      const presenceMatch =
        !filters.presenceStatus || (user.presence && user.presence.availability === filters.presenceStatus)

      return searchMatch && departmentMatch && presenceMatch
    })
  }, [users, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold text-[#4E5FBF]">User Directory</h2>
        <div className="flex gap-2">
          <button onClick={fetchData} className="rounded bg-[#5864A6] px-4 py-2 text-white hover:bg-[#4E5FBF]">
            Refresh
          </button>
        </div>
      </div>

      <FilterPanel filters={filters} setFilters={setFilters} departments={departments} />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-[#4E5FBF] text-xl">Loading users...</div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">No users found matching your filters.</div>
          )}
        </div>
      )}
    </div>
  )
}

