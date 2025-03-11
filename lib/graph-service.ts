import type { User, Presence } from "@/types/graph"

export async function fetchUsers(accessToken: string): Promise<User[]> {
  try {
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/users?$select=id,displayName,mail,jobTitle,department,userPrincipalName&$top=999",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`)
    }

    const data = await response.json()
    return data.value
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function fetchPresence(accessToken: string, userIds: string[]): Promise<Record<string, Presence>> {
  try {
    // Graph API allows batch requests for presence
    const response = await fetch("https://graph.microsoft.com/v1.0/communications/getPresencesByUserId", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: userIds,
      }),
    })

    if (!response.ok) {
      throw new Error(`Error fetching presence: ${response.status}`)
    }

    const data = await response.json()

    // Convert array to a map for easier lookup
    const presenceMap: Record<string, Presence> = {}
    data.value.forEach((presence: Presence) => {
      presenceMap[presence.id] = presence
    })

    return presenceMap
  } catch (error) {
    console.error("Error fetching presence:", error)
    return {}
  }
}

export async function fetchUserPhoto(accessToken: string, userId: string): Promise<string | null> {
  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        // No photo available
        return null
      }
      throw new Error(`Error fetching user photo: ${response.status}`)
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error(`Error fetching photo for user ${userId}:`, error)
    return null
  }
}

