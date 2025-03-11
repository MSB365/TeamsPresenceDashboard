"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/providers/auth-provider"

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard")
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Long_Plus_B2%20%283%29-hQI4lEM8FPknFpfLpUFvKmbhjrz0xN.png"
            alt="Microsoft 365 Teams Presence Portal"
            width={300}
            height={100}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-[#4E5FBF]">Teams Presence Portal</h1>
          <p className="mt-2 text-[#0D0D0D]">Connect to your Microsoft 365 tenant to view user presence status</p>
        </div>

        <button
          onClick={login}
          className="group relative w-full overflow-hidden rounded-lg bg-[#4E5FBF] px-6 py-3 text-white shadow-md transition-all hover:shadow-lg"
        >
          <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#4E5FBF] via-[#8091F2] to-[#5864A6] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          <span className="relative flex items-center justify-center">
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.5 12.5H14.5V10.5H16.5V13.5H11.5V12.5ZM7.5 12.5H10.5V10.5H7.5V12.5ZM7.5 16.5H10.5V14.5H7.5V16.5ZM11.5 16.5H14.5V14.5H11.5V16.5ZM15.5 7.5H16.5V9.5H15.5V7.5ZM11.5 8.5H14.5V6.5H11.5V8.5ZM7.5 8.5H10.5V6.5H7.5V8.5Z" />
              <path d="M20.5 17.5V6.5C20.5 5.4 19.6 4.5 18.5 4.5H5.5C4.4 4.5 3.5 5.4 3.5 6.5V17.5C3.5 18.6 4.4 19.5 5.5 19.5H18.5C19.6 19.5 20.5 18.6 20.5 17.5ZM18.5 6.5V17.5H5.5V6.5H18.5Z" />
            </svg>
            Sign in with Microsoft
          </span>
        </button>

        <div className="mt-6 text-center text-sm text-[#0D0D0D]">
          <p>This application requires the following permissions:</p>
          <ul className="mt-2 text-xs text-[#5864A6]">
            <li>User.Read</li>
            <li>User.Read.All</li>
            <li>User.ReadBasic.All</li>
            <li>Presence.Read.All</li>
            <li>Directory.Read.All</li>
            <li>ProfilePhoto.ReadWrite.All</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

