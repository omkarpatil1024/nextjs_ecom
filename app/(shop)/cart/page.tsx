import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CartContent } from "@/components/cart-content"

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart",
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Shopping Cart</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <CartContent />
    </div>
  )
}
