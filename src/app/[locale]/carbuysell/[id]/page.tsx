import CarDetails from '@/components/CarBuySell/CarDetails';
import ShopBanner from '@/shared/ShopBanner';
import React, { Suspense } from 'react'
import bannerimg from "../../../../../public/post-top-bg.jpg"
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import GetAdDetails from '@/lib/services/AdDetails';
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import GetSimilarAd from '@/lib/services/SimilarAd';
import SimilarAd from '@/shared/SimilarAd/SimilarAd';
import { LoadingCard } from '@/shared/LoadingCard';
import { Add } from '@/redux/types';
import { TextTruncate } from '@/utils/TextTruncate';
import { getTranslations } from 'next-intl/server';

// ---------------dynamic metadata--------------
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await GetAdDetails({ id }) as { data: Add };

  return {
    title: `${data?.title}`,
    description: TextTruncate(data?.description, 155),

    openGraph: {
      title: TextTruncate(data?.title, 60),
      description: TextTruncate(data?.description, 155),
      url: `/carbuysell/${data?.id}`,
      siteName: 'Runbd',
      images: [data?.images[0]],
      locale: 'bn_BD',
      type: 'website',
      creator: "Runbd",
      publisher: "Runbd"
    },
    twitter: {
      title: TextTruncate(data?.title, 60),
      description: TextTruncate(data?.description, 155),
      card: 'summary_large_image',
      creator: '@runbd',
      images: [data?.images[0]],
    },

  }
}

async function CarDetils({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const promiseCarDetails = GetAdDetails({ id });
  const promiseSimilarAd = GetSimilarAd({ id });

  const t = await getTranslations("car_buy")

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("details.title")}
        desc={t("details.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link>
        <IoIosArrowForward className='' />
        <Link href='/carbuysell' className='text-primary'>{t("bread_cump.car_buy_sell")}</Link>
        <IoIosArrowForward className='' /> {t("bread_cump.details")}
      </ShopBanner>

      <Suspense fallback={<DetailsSkeleton />}>
        <CarDetails promiseCarDetails={promiseCarDetails} />
      </Suspense>

      <Suspense fallback={
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />

        </div>
      }>
        <SimilarAd AddPromise={promiseSimilarAd} />
      </Suspense>

    </div>
  )
}

export default CarDetils;