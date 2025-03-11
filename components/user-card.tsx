import Image from "next/image"
import type { User } from "@/types/graph"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  // Map presence status to colors and labels similar to Teams
  const getPresenceInfo = () => {
    if (!user.presence) {
      return { color: "#8A8A8A", label: "Unknown" }
    }

    switch (user.presence.availability) {
      case "Available":
        return { color: "#6BB700", label: "Available" }
      case "AvailableIdle":
        return { color: "#8A8A8A", label: "Away" }
      case "Away":
        return { color: "#FFC300", label: "Away" }
      case "BeRightBack":
        return { color: "#FFC300", label: "Be Right Back" }
      case "Busy":
        return { color: "#D93B3B", label: "Busy" }
      case "BusyIdle":
        return { color: "#D93B3B", label: "Busy" }
      case "DoNotDisturb":
        return { color: "#D93B3B", label: "Do Not Disturb" }
      case "Offline":
        return { color: "#8A8A8A", label: "Offline" }
      default:
        return { color: "#8A8A8A", label: "Unknown" }
    }
  }

  const presenceInfo = getPresenceInfo()

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 flex-shrink-0">
          {user.photoUrl ? (
            <Image
              src={user.photoUrl || "/placeholder.svg"}
              alt={user.displayName}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8091F2] text-xl font-semibold text-white">
              {user.displayName.charAt(0)}
            </div>
          )}
          <div
            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white"
            style={{ backgroundColor: presenceInfo.color }}
            title={presenceInfo.label}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-[#0D0D0D]">{user.displayName}</h3>
          <p className="truncate text-sm text-gray-600">{user.mail}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#5864A6]">Status:</span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: presenceInfo.color }} />
            {presenceInfo.label}
          </span>
        </div>

        {user.jobTitle && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#5864A6]">Title:</span>
            <span className="truncate">{user.jobTitle}</span>
          </div>
        )}

        {user.department && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#5864A6]">Department:</span>
            <span className="truncate">{user.department}</span>
          </div>
        )}
      </div>
    </div>
  )
}

