import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import type { Product } from "@/lib/types"

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products?limit=8", {
    next: { revalidate: 3600 },
  })
  return res.json()
}

async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  return <ProductGrid products={products} />
}

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    image: "/modern-electronics.png",
  },
  {
    name: "Men's Fashion",
    href: "/category/men%27s%20clothing",
    image: "/mens-fashion.png",
  },
  {
    name: "Women's Fashion",
    href: "/category/women%27s%20clothing",
    image: "/womens-fashion.png",
  },
  {
    name: "Jewelry",
    href: "/category/jewelery",
    image: "/luxury-jewelry-collection.png",
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-foreground text-background">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
                Discover Your Style, Define Your World
              </h1>
              <p className="text-lg text-background/70 max-w-md">
                Explore our curated collection of premium products. Quality meets affordability at eStore.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/category/electronics">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/30 text-background hover:bg-background/10 bg-transparent"
                  asChild
                >
                  <Link href="#featured">View Collection</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/modern-lifestyle-products-showcase.jpg" alt="Featured products" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Explore our wide range of products</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-background">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Handpicked selections just for you</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/category/electronics">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold">Join Our Newsletter</h2>
            <p className="text-muted-foreground">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
