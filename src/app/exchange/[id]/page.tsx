import ExchangeDetails from '@/components/Exchange/ExchangeDetails';
import GetAdDetails from '@/lib/services/AdDetails';
import GetSimilarAd from '@/lib/services/SimilarAd';
import { Add } from '@/redux/types';
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import { LoadingCard } from '@/shared/LoadingCard';
import ShopBanner from '@/shared/ShopBanner';
import SimilarAd from '@/shared/SimilarAd/SimilarAd';
import { TextTruncate } from '@/utils/TextTruncate';
import Link from 'next/link';
import { Suspense } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import bannerimg from "../../../../public/post-top-bg.jpg"

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
      url: `/exchange/${data?.id}`,
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

async function ExchangeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const promiseAdDetails = GetAdDetails({ id });
  const promiseSimilarAd = GetSimilarAd({ id });

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Exchange"
        desc="View Exchange full details"
      >
        <Link href='/' className='text-primary'>Home</Link>
        <IoIosArrowForward className='' />
        <Link href='/exchange' className='text-primary'>Exchanges</Link>
        <IoIosArrowForward className='' /> Exchange Details
      </ShopBanner>

      <Suspense fallback={<DetailsSkeleton />}>
        <ExchangeDetails promiseAdDetails={promiseAdDetails} />
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

export default ExchangeDetail