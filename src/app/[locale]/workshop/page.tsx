import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/workshop-banner.png"
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from 'react-icons/io'
import WorkShopFilter from '@/components/WorkShop/WorkShopFilter'
import WorkShops from '@/components/WorkShop/WorkShops'
import { Metadata } from 'next'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import { Suspense } from 'react'
import Adsloading from '@/shared/Adsloading'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Workshop",
  description: "Find workshop in Bangladesh on Runbd, the largest marketplace in Bangladesh! ",

  openGraph: {
    title: 'Workshops in Bangladesh | Runbd',
    description: 'Find workshop in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
    url: '/workshop',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'Workshops in Bangladesh | Runbd',
    description: 'Find workshops in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

async function Workshop({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { limit, sort, page, searchTerm, division, district, area, workshop_type } = await ssp;


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
  if (workshop_type) {
    query.workshop_type = workshop_type
  }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }
  if (limit) {
    query.limit = limit || 21
  }

  const adsPromise = GetAdsByCategory({ endPoint: "/ads/work-shops", query, tags: [tags?.work_shops] });

   const t = await getTranslations('workshop');

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("banner.title")}
        desc={t("banner.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.workshops")}
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
            <WorkShopFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>

            <div>
              <Searchbar />
              <Suspense fallback={<Adsloading />}>
                <WorkShops adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
              </Suspense>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Workshop