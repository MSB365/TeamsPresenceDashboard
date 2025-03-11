export interface User {
  id: string
  displayName: string
  mail: string
  jobTitle?: string
  department?: string
  userPrincipalName: string
  photoUrl?: string
  presence?: Presence
}

export interface Presence {
  id: string
  availability: string
  activity: string
}

export type PresenceStatus =
  | "Available"
  | "AvailableIdle"
  | "Away"
  | "BeRightBack"
  | "Busy"
  | "BusyIdle"
  | "DoNotDisturb"
  | "Offline"
  | "PresenceUnknown"

export interface FilterOptions {
  search: string
  department: string
  presenceStatus: string
}

