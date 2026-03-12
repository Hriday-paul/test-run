import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/post-top-bg.jpg"
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from 'react-icons/io'
import RentCarFilter from '@/components/RentCar/RentCarFilter'
import RentCars from '@/components/RentCar/RentCars'
import { Metadata } from 'next'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import { Suspense } from 'react'
import Adsloading from '@/shared/Adsloading'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Car Rent",
  description: "Rent cars in Bangladesh easily on Runbd, the largest online marketplace. Find affordable car rentals, compare options, and book your ride hassle-free!",

  metadataBase: new URL('https://runbd.org'),
  alternates: {
    canonical: `/car-rent`,
    languages: {
      en: `/car-rent`,
      bn: `/bn/car-rent`,
      'x-default': `/car-rent`
    }
  },

  openGraph: {
    title: 'Car Rent in Bangladesh | Runbd',
    description: 'Rent cars in Bangladesh easily on Runbd, the largest online marketplace.',
    url: '/car-rent',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'Car Rent in Bangladesh | Runbd',
    description: 'Rent cars in Bangladesh easily on Runbd, the largest online marketplace.',
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

async function CarRent({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { limit, sort, page, searchTerm, division, district, area, category, condition, } = await ssp;


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

  if (condition) {
    query.condition = condition
  }
  if (category) {
    query.category = category
  }
  if (searchTerm) {
    query.searchTerm = searchTerm
  }
  if (limit) {
    query.limit = limit
  }

  const adsPromise = GetAdsByCategory({ endPoint: "/ads/rent-cars", query, tags: [tags?.rent_cars] });

  const t = await getTranslations('car_rent');

  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title={t("banner.title")}
        desc={t("banner.subtitle")}
      >
        <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.carRents")}
      </ShopBanner>

      <div className=' bg-[#F2F4F8]'>
        <div className='container pt-8'>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
            <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <RentCarFilter />
            </div>
            <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
              <div>
                <Searchbar />

                <Suspense fallback={<Adsloading />}>
                  <RentCars adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
                </Suspense>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default CarRent