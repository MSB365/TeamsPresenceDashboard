// Microsoft Graph API scopes needed for the application
export const graphScopes = [
  "User.Read",
  "User.Read.All",
  "User.ReadBasic.All",
  "Presence.Read.All",
  "Directory.Read.All",
  "ProfilePhoto.ReadWrite.All",
]

// MSAL configuration
export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: typeof window !== "undefined" ? window.location.origin : "",
    postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : "",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
}

