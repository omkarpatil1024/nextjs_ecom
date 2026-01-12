"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Clock, Truck, CheckCircle, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
}

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch {
        // Invalid data
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-8">When you place an order, it will appear here.</p>
        <Button size="lg" asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const StatusIcon = statusIcons[order.status]
        const statusColor = statusColors[order.status]

        return (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Badge className={`${statusColor} border-0`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.product.id} className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.title}
                      fill
                      className="object-contain p-1"
                    />
                    {item.quantity > 1 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </p>
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
