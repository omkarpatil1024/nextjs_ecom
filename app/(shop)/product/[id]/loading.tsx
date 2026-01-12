import { ProductDetailsSkeleton } from "@/components/product-details-skeleton"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <ProductDetailsSkeleton />

      <section className="mt-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <ProductGridSkeleton count={4} />
      </section>
    </div>
  )
}
