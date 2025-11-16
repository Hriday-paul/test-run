import { Skeleton } from '@/components/ui/skeleton'

export function LoadingCard() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white border border-stroke">
      <Skeleton className="w-full h-48 bg-zinc-200" />

      {/* Content Section */}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 bg-zinc-200" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full bg-zinc-200" />
            <Skeleton className="h-4 w-1/2 bg-zinc-200" />
          </div>
        </div>

        {/* Specs Grid Skeleton */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full flex-shrink-0 bg-zinc-200" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-full bg-zinc-200" />
                <Skeleton className="h-3 w-2/3 bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <Skeleton className="h-5 w-20 bg-zinc-200" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md bg-zinc-200" />
        </div>
      </div>
    </div>
  )
}
