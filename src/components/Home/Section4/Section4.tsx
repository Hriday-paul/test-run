import { Skeleton } from "@/components/ui/skeleton";
import PlanCard from "./PlanCard";
import Title from "../Section2/Title";
import { Suspense } from "react";
import { IPackage } from "@/redux/types";
import { GetPlans } from "@/lib/services/quer.package";
import { getTranslations } from "next-intl/server";

export default async function Section4() {

  const plan = GetPlans();

  const t = await getTranslations('Home.section4');

  return (
    <section className="bg-[#F5F7FA] py-12 md:py-16 lg:py-20" id="pricing">
      <div className="container">

        <Title subtitle={t("subtitle")} title={t("title")} />
        <p className="text-center mx-auto max-w-xl text-gray-800 font-popin text-sm">{t("description")}</p>

        <div>

          <Suspense fallback={
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

              <PricingCardSkeleton />
              <PricingCardSkeleton />
              <PricingCardSkeleton />

            </div>
          }>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 my-15 font-figtree">
              <Plans planPromise={plan} />
            </div>

          </Suspense>

        </div>
      </div>
    </section>
  );
}

const Plans = async ({ planPromise }: { planPromise: Promise<{ data: IPackage[] }> }) => {

  const data = await planPromise;

  return (

    data?.data.map((plan, index) => {
      const isMiddle = index === 1;
      return (
        <PlanCard plan={plan} key={plan?.id} isMiddle={isMiddle} />
      );
    })

  )

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

