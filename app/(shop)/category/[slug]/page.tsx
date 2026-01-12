import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { CategoryFilters } from "@/components/category-filters"
import type { Product } from "@/lib/types"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string; minPrice?: string; maxPrice?: string }>
}

const categoryMap: Record<string, string> = {
  electronics: "electronics",
  "men's clothing": "men's clothing",
  "men%27s%20clothing": "men's clothing",
  "women's clothing": "women's clothing",
  "women%27s%20clothing": "women's clothing",
  jewelery: "jewelery",
  jewelry: "jewelery",
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  return res.json()
}

async function CategoryProducts({
  category,
  sort,
  minPrice,
  maxPrice,
}: {
  category: string
  sort?: string
  minPrice?: number
  maxPrice?: number
}) {
  let products = await getProductsByCategory(category)

  // Filter by price
  if (minPrice !== undefined) {
    products = products.filter((p) => p.price >= minPrice)
  }
  if (maxPrice !== undefined) {
    products = products.filter((p) => p.price <= maxPrice)
  }

  // Sort products
  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price)
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating.rate - a.rating.rate)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found matching your criteria.</p>
      </div>
    )
  }

  return <ProductGrid products={products} />
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const category = categoryMap[decodedSlug.toLowerCase()] || decodedSlug

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Shop`,
    description: `Browse our collection of ${category}. Find the best deals on quality products.`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { sort, minPrice, maxPrice } = await searchParams

  const decodedSlug = decodeURIComponent(slug)
  const category = categoryMap[decodedSlug.toLowerCase()]

  if (!category) {
    notFound()
  }

  const displayName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{displayName}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-muted-foreground mt-1">Discover our curated selection</p>
        </div>
        <CategoryFilters currentSort={sort} />
      </div>

      {/* Products */}
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <CategoryProducts
          category={category}
          sort={sort}
          minPrice={minPrice ? Number(minPrice) : undefined}
          maxPrice={maxPrice ? Number(maxPrice) : undefined}
        />
      </Suspense>
    </div>
  )
}
