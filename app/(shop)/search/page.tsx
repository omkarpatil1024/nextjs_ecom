import { Suspense } from "react"
import Link from "next/link"
import { ChevronRight, SearchX } from "lucide-react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []

  const products: Product[] = await res.json()
  const lowerQuery = query.toLowerCase()

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery),
  )
}

async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query)

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <SearchX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground mb-6">We couldn&apos;t find any products matching &quot;{query}&quot;</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">Found {products.length} results</p>
      <ProductGrid products={products} />
    </>
  )
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : "Search",
    description: q ? `Search results for ${q}` : "Search for products",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams

  if (!q) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-2">Search Products</h1>
          <p className="text-muted-foreground">Enter a search term to find products</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Search</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">Search results for &quot;{q}&quot;</h1>

      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <SearchResults query={q} />
      </Suspense>
    </div>
  )
}
