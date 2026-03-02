import JobDetails from '@/components/Job/JobDetails';
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
import bannerimg from "../../../../public/Job banner.png"

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
      url: `/jobs/${data?.id}`,
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

async function Detils({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const promiseAdDetails = GetAdDetails({ id });
  const promiseSimilarAd = GetSimilarAd({ id });

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Job Details"
        desc="View job full details"
      >
        <Link href='/' className='text-primary'>Home</Link>
        <IoIosArrowForward className='' />
        <Link href='/jobs' className='text-primary'>Jobs</Link>
        <IoIosArrowForward className='' /> Workshop Details
      </ShopBanner>

      <Suspense fallback={<DetailsSkeleton />}>
        <JobDetails promiseAdDetails={promiseAdDetails} />
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

export default Detils