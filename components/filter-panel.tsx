"use client"

import type React from "react"

import type { FilterOptions } from "@/types/graph"

interface FilterPanelProps {
  filters: FilterOptions
  setFilters: (filters: FilterOptions) => void
  departments: string[]
}

export default function FilterPanel({ filters, setFilters, departments }: FilterPanelProps) {
  const presenceOptions = [
    { value: "", label: "All Statuses" },
    { value: "Available", label: "Available" },
    { value: "Away", label: "Away" },
    { value: "BeRightBack", label: "Be Right Back" },
    { value: "Busy", label: "Busy" },
    { value: "DoNotDisturb", label: "Do Not Disturb" },
    { value: "Offline", label: "Offline" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const clearFilters = () => {
    setFilters({ search: "", department: "", presenceStatus: "" })
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="search" className="mb-1 block text-sm font-medium text-[#5864A6]">
            Search
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by name, email, or title"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#4E5FBF] focus:outline-none focus:ring-1 focus:ring-[#4E5FBF]"
          />
        </div>

        <div>
          <label htmlFor="department" className="mb-1 block text-sm font-medium text-[#5864A6]">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#4E5FBF] focus:outline-none focus:ring-1 focus:ring-[#4E5FBF]"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="presenceStatus" className="mb-1 block text-sm font-medium text-[#5864A6]">
            Presence Status
          </label>
          <select
            id="presenceStatus"
            name="presenceStatus"
            value={filters.presenceStatus}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#4E5FBF] focus:outline-none focus:ring-1 focus:ring-[#4E5FBF]"
          >
            {presenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(filters.search || filters.department || filters.presenceStatus) && (
        <div className="mt-4 flex justify-end">
          <button onClick={clearFilters} className="text-sm text-[#4E5FBF] hover:underline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

