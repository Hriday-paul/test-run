import WorkshopDetails from '@/components/WorkShop/WorkshopDetails';
import GetAdDetails from '@/lib/services/AdDetails';
import GetSimilarAd from '@/lib/services/SimilarAd';
import { Add } from '@/redux/types';
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import { LoadingCard } from '@/shared/LoadingCard';
import ShopBanner from '@/shared/ShopBanner';
import SimilarAd from '@/shared/SimilarAd/SimilarAd';
import { TextTruncate } from '@/utils/TextTruncate';
import { Link } from '@/i18n/navigation';;
import { Suspense } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import bannerimg from "../../../../../public/workshop-banner.png"
import { getTranslations } from 'next-intl/server';

// ---------------dynamic metadata--------------
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await GetAdDetails({ id }) as { data: Add };

  return {
    title: `${data?.title}`,
    description: TextTruncate(data?.description, 155),

    metadataBase: new URL('https://runbd.org'),
    alternates: {
      canonical: `/workshop/${id}`,
      languages: {
        en: `/workshop/${id}`,
        bn: `/bn/workshop/${id}`,
        'x-default': `/workshop/${id}`
      }
    },

    openGraph: {
      title: TextTruncate(data?.title, 60),
      description: TextTruncate(data?.description, 155),
      url: `/workshop/${data?.id}`,
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

async function WorkshopDetils({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const promiseAdDetails = GetAdDetails({ id });
  const promiseSimilarAd = GetSimilarAd({ id });

  const t = await getTranslations("workshop")

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("details.title")}
        desc={t("details.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link>
        <IoIosArrowForward className='' />
        <Link href='/workshop' className='text-primary'>{t("bread_cump.workshops")}</Link>
        <IoIosArrowForward className='' /> {t("bread_cump.details")}
      </ShopBanner>

      <Suspense fallback={<DetailsSkeleton />}>
        <WorkshopDetails promiseAdDetails={promiseAdDetails} />
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
export default WorkshopDetils