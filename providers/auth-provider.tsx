"use client"

import { type ReactNode, createContext, useContext, useEffect, useState } from "react"
import { PublicClientApplication, type AccountInfo, InteractionRequiredAuthError } from "@azure/msal-browser"
import { msalConfig, graphScopes } from "@/lib/auth-config"

type AuthContextType = {
  msalInstance: PublicClientApplication | null
  account: AccountInfo | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  msalInstance: null,
  account: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  getToken: async () => null,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [account, setAccount] = useState<AccountInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeMsal = async () => {
      if (!msalConfig.auth.clientId) {
        console.error("Client ID is not configured")
        setIsLoading(false)
        return
      }

      try {
        const msalInstance = new PublicClientApplication(msalConfig)
        await msalInstance.initialize()

        const accounts = msalInstance.getAllAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }

        setMsalInstance(msalInstance)
      } catch (error) {
        console.error("MSAL initialization failed", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeMsal()
  }, [])

  const login = async () => {
    if (!msalInstance) return

    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: graphScopes,
        prompt: "select_account",
      })

      if (loginResponse.account) {
        setAccount(loginResponse.account)
      }
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  const logout = async () => {
    if (!msalInstance) return

    try {
      await msalInstance.logoutPopup()
      setAccount(null)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  const getToken = async (): Promise<string | null> => {
    if (!msalInstance || !account) return null

    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes: graphScopes,
        account: account,
      })
      return response.accessToken
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await msalInstance.acquireTokenPopup({
            scopes: graphScopes,
            account: account,
          })
          return response.accessToken
        } catch (err) {
          console.error("Error acquiring token interactively", err)
          return null
        }
      }
      console.error("Error acquiring token silently", error)
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{
        msalInstance,
        account,
        isAuthenticated: !!account,
        isLoading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

