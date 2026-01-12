import { ProductGrid } from "./product-grid"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  category: string
  currentProductId: number
}

async function getRelatedProducts(category: string, excludeId: number): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const products: Product[] = await res.json()
  return products.filter((p) => p.id !== excludeId).slice(0, 4)
}

export async function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const products = await getRelatedProducts(category, currentProductId)

  if (products.length === 0) {
    return null
  }

  return <ProductGrid products={products} />
}
