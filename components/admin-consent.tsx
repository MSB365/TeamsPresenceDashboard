"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export function AdminConsent() {
  const [clientId, setClientId] = useState("")
  const router = useRouter()

  useEffect(() => {
    setClientId(process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || "")
  }, [])

  const handleAdminConsent = () => {
    const adminConsentUrl = `https://login.microsoftonline.com/organizations/v2.0/adminconsent?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&state=12345`
    router.push(adminConsentUrl)
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Admin Consent Required</h2>
      <p className="mb-4">
        This application requires admin consent to access your organization's data. Please click the button below to
        grant the necessary permissions.
      </p>
      <button onClick={handleAdminConsent} className="bg-[#4E5FBF] text-white px-4 py-2 rounded hover:bg-[#8091F2]">
        Grant Admin Consent
      </button>
    </div>
  )
}

