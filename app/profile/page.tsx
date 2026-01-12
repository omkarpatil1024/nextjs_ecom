import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProfileContent } from "@/components/profile-content"

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your account settings",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Profile</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <ProfileContent />
    </div>
  )
}
