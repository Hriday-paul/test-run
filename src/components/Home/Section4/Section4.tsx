"use client"
import Title from "./Title";
import { useAllPackagesQuery } from "@/redux/api/subcription";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorComponent from "@/shared/ErrorComponent";
import PlanCard from "./PlanCard";

export default function Section4() {

  const { isLoading, isSuccess, data, isError } = useAllPackagesQuery();

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <section className="bg-[#F5F7FA] py-12 md:py-16 lg:py-20" id="pricing">
      <div className="container">

        <Title />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 my-15 font-figtree">
          {isLoading ? <>

            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />

          </> : <>

            {
              isSuccess && data?.data.map((plan, index) => {
                const isMiddle = index === 1;
                return (
                  <PlanCard plan={plan} key={plan?.id} isMiddle={isMiddle} />
                );
              })
            }

          </>}
        </div>
      </div>
    </section>
  );
}

export function PricingCardSkeleton() {

  return (
    <>
      <div className="w-full border border-stroke bg-white p-8 rounded-xl">
        {/* Header with plan name and duration */}
        <div className="mb-8 flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-12" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Features list */}
        <div className="mb-8 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 flex-1" />
            </div>
          ))}
        </div>

        {/* Button */}
        <Skeleton className="h-12 w-full rounded-full" />
      </div>

    </>
  )
}

