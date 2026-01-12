import { ProductGridSkeleton } from "@/components/product-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col">
      <section className="bg-foreground">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-full max-w-lg bg-background/20" />
              <Skeleton className="h-12 w-3/4 bg-background/20" />
              <Skeleton className="h-6 w-full max-w-md bg-background/20" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 bg-background/20" />
                <Skeleton className="h-12 w-32 bg-background/20" />
              </div>
            </div>
            <Skeleton className="aspect-square lg:aspect-[4/3] rounded-lg bg-background/20" />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="space-y-2 mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <ProductGridSkeleton count={8} />
      </section>
    </div>
  )
}
