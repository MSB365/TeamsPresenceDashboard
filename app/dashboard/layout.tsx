"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/providers/auth-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, account, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F2F2]">
        <div className="w-full max-w-md p-8 text-center">
          <div className="animate-pulse text-[#4E5FBF] text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F2]">
      <header className="bg-[#4E5FBF] px-4 py-3 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Long_Plus_B2%20%283%29-hQI4lEM8FPknFpfLpUFvKmbhjrz0xN.png"
              alt="Microsoft 365 Teams Presence Portal"
              width={150}
              height={50}
              className="mr-4"
            />
            <h1 className="text-xl font-bold">Teams Presence Portal</h1>
          </div>

          <div className="flex items-center">
            {account && (
              <div className="mr-4 text-sm">
                Signed in as: <span className="font-semibold">{account.name || account.username}</span>
              </div>
            )}
            <button
              onClick={logout}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4">{children}</main>

      <footer className="bg-[#5864A6] px-4 py-3 text-center text-sm text-white">
        <p>Microsoft 365 Teams Presence Portal &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

