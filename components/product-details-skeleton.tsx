import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailsSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-3/4" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>

        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}
