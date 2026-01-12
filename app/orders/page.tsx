import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { OrdersList } from "@/components/orders-list"

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your order history",
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">My Orders</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <OrdersList />
    </div>
  )
}
