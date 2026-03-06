import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/Job banner.png"
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from 'react-icons/io'
import JobFilter from '@/components/Job/JobFilter'
import Jobs from '@/components/Job/Jobs'
import { Metadata } from 'next'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import Adsloading from '@/shared/Adsloading'
import { Suspense } from 'react'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Jobs",
  description: "Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh! ",

  openGraph: {
    title: 'Jobs in Bangladesh | Runbd',
    description: 'Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
    url: '/jobs',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'Jobs in Bangladesh | Runbd',
    description: 'Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

async function JobList({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { limit, sort, page, searchTerm, division, district, area, jobType, employmentType, } = await ssp;

  let sortBy = "createdAt";
  let orderBy = "desc"

  if (sort == "-createdAt") {
    orderBy = "asc"
  } else if (sort == "price") {
    sortBy = "price";
    orderBy = "asc"
  }
  else if (sort == "-price") {
    sortBy = "price";
    orderBy = "desc"
  }

  const query: any = { page, sortBy, sortOrder: orderBy, limit: 21 }


  if (division) {
    query.division = division
  }
  if (district) {
    query.district = district
  }
  if (area) {
    query.area = area
  }

  if (jobType) {
    query.job_type = jobType
  }
  if (employmentType) {
    query.employment_type = employmentType
  }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }
  if (limit) {
    query.limit = limit
  }

  const adsPromise = GetAdsByCategory({ endPoint: "/ads/jobs", query, tags: [tags?.jobs] });

  const t = await getTranslations('job');

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("banner.title")}
        desc={t("banner.subtitle")}>
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.jobs")}
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
            <JobFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <div>
              <Searchbar />

              <Suspense fallback={<Adsloading />}>
                <Jobs adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
              </Suspense>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default JobList