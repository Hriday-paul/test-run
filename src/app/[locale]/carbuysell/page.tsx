import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/post-top-bg.jpg"
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from 'react-icons/io'
import Cars from '@/components/CarBuySell/Cars'
import CarFilter from '@/components/CarBuySell/CarFilter'
import CarSearchBar from '@/components/CarBuySell/CarSearchBar'
import { Metadata } from 'next'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import { Suspense } from 'react'
import Adsloading from '@/shared/Adsloading'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Car Buy/Sell",
  description: "Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!",

  openGraph: {
    title: 'Buy & Sell Cars in Bangladesh | Runbd',
    description: 'Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!',
    url: '/carbuysell',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'Buy & Sell Cars in Bangladesh | Runbd',
    description: 'Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!',
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

async function CarBuySell({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const t = await getTranslations('car_buy');

  const searchParams = await ssp;

  const limit = searchParams?.limit;
  const sort = searchParams?.sort;
  const page = searchParams?.page;
  const minPrice = searchParams?.minPrice;
  const maxPrice = searchParams?.maxPrice;
  const minMileage = searchParams?.minMileage;
  const maxMileage = searchParams?.maxMileage;
  const division = searchParams?.division;
  const district = searchParams?.district;
  const area = searchParams?.area;
  const condition = searchParams?.condition;
  const brand = searchParams?.brand;
  const car_type = searchParams?.car_type
  const searchTerm = searchParams?.searchTerm

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
  if (limit) {
    query.limit = limit
  }
  if (car_type) {
    query.car_type = car_type
  }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }

  const adsPromise = GetAdsByCategory({ endPoint: "/ads/cars", query, tags: [tags?.cars] });

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("banner.title")}
        desc={t("banner.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.car_buy_sell")}
      </ShopBanner>

      <div className=' bg-[#F2F4F8]'>
        <div className='container pt-8'>

          <CarSearchBar />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
            <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <CarFilter />
            </div>
            <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
              <div>
                <Searchbar />

                <Suspense fallback={<Adsloading />}>
                  <Cars adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
                </Suspense>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CarBuySell