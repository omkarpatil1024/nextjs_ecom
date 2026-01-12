import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { OrderDetails } from "@/components/order-details"

interface OrderPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Order ${id}`,
    description: "View your order details",
  }
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/orders" className="hover:text-foreground">
          Orders
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{id}</span>
      </nav>

      <OrderDetails orderId={id} />
    </div>
  )
}
