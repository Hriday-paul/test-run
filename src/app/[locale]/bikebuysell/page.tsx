import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/bikestop_img.png"
import { IoIosArrowForward } from 'react-icons/io'
import BikeFilter from '@/components/BikeBuySell/BikeFilter'
import Bikes from '@/components/BikeBuySell/Bikes'
import { Metadata } from 'next'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import { Suspense } from 'react'
import Adsloading from '@/shared/Adsloading'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: "Bike Buy/Sell",
  description: "Looking to buy a Bike? Find bargain deals on new and used bikes for sale in Bangladesh or sell bikes online at the best price only on Runbd,The largest marketplace in Bangladesh!",

  openGraph: {
    title: 'Buy & Sell Bike in Bangladesh | Runbd',
    description: 'Looking to buy a Bike? Find bargain deals on new and used bikes for sale in Bangladesh or sell bikes online at the best price only on Runbd,The largest marketplace in Bangladesh!',
    url: '/bikebuysell',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'Buy & Sell Bike in Bangladesh | Runbd',
    description: 'Looking to buy a Bike? Find bargain deals on new and used bikes for sale in Bangladesh or sell bikes online at the best price only on Runbd,The largest marketplace in Bangladesh!',
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

async function BikeBuySell({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { limit, sort, page, minPrice, maxPrice, minMileage, maxMileage, division, district, area, bike_type, condition, brand, searchTerm } = await ssp;

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

  if (minPrice) {
    query.minPrice = minPrice
  }
  if (maxPrice) {
    query.maxPrice = maxPrice
  }
  if (minMileage) {
    query.minMileage = minMileage
  }
  if (maxMileage) {
    query.maxMileage = maxMileage
  }
  if (division) {
    query.division = division
  }
  if (district) {
    query.district = district
  }
  if (area) {
    query.area = area
  }
  if (condition) {
    query.condition = condition
  }
  if (brand) {
    query.brand = brand
  }
  if (bike_type) {
    query.bike_type = bike_type
  }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }
  if (limit) {
    query.limit = limit
  }

  const adsPromise = GetAdsByCategory({ endPoint: "/ads/bikes", query, tags: [tags?.bikes] });

  const t = await getTranslations('bike_buy');

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("banner.title")}
        desc={t("banner.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.bike_buy_sell")}
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
            <BikeFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <div>
              <Searchbar />

              <Suspense fallback={<Adsloading />}>
                <Bikes adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
              </Suspense>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BikeBuySell