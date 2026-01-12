"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch } from "@/store/hooks"
import { addToCart, setCartOpen } from "@/store/cart-slice"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart(product))
    dispatch(setCartOpen(true))
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-border transition-colors">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          {product.rating.rate >= 4.5 && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              Best Seller
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating.rate}</span>
              <span className="text-sm text-muted-foreground">({product.rating.count})</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              <Button size="sm" variant="outline" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
