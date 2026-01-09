import CarDetails from '@/components/CarBuySell/CarDetails';
import ShopBanner from '@/shared/ShopBanner';
import React, { Suspense } from 'react'
import bannerimg from "../../../../public/post-top-bg.jpg"
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import GetAdDetails from '@/lib/services/AdDetails';
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import GetSimilarAd from '@/lib/services/SimilarAd';
import SimilarAd from '@/shared/SimilarAd/SimilarAd';
import { LoadingCard } from '@/shared/LoadingCard';
import { Add } from '@/redux/types';
import { TextTruncate } from '@/utils/TextTruncate';

// ---------------dynamic metadata--------------
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await GetAdDetails({ id }) as { data: Add };

  return {
    title: `${data?.title}`,
    description: `Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!`,

    openGraph: {
      title: TextTruncate(data?.title, 60),
      description: `Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!`,
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
      description: `Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!`,
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

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Car Details"
        desc="View car full details"
      >
        <Link href='/' className='text-primary'>Home</Link>
        <IoIosArrowForward className='' />
        <Link href='/carbuysell' className='text-primary'>Car Buy/Sell</Link>
        <IoIosArrowForward className='' /> Car Details
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