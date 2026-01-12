"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, Shield, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch } from "@/store/hooks"
import { addToCart, setCartOpen } from "@/store/cart-slice"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      dispatch(setCartOpen(true))
    }, 500)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent quality! Exactly as described and arrived quickly.",
    },
    {
      id: 2,
      name: "Sarah K.",
      rating: 4,
      date: "1 month ago",
      comment: "Great product for the price. Would recommend to others.",
    },
    {
      id: 3,
      name: "Jordan P.",
      rating: 5,
      date: "1 month ago",
      comment: "Love it! Perfect for what I needed. Fast shipping too.",
    },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain p-8" />
        {product.rating.rate >= 4.5 && (
          <Badge className="absolute top-4 left-4" variant="secondary">
            Best Seller
          </Badge>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-balance">{product.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{product.rating.rate}</span>
          <span className="text-muted-foreground">({product.rating.count} reviews)</span>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Tax included. Shipping calculated at checkout.</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={isAdded}>
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
            <span>30-Day Returns</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
