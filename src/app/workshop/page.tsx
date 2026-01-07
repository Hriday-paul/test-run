import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/workshop-banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import WorkShopFilter from '@/components/WorkShop/WorkShopFilter'
import WorkShops from '@/components/WorkShop/WorkShops'
import { Metadata } from 'next'

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

function Workshop() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Work Shops"
        desc="Search and find wrokshop for best service"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Workshop
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
            <WorkShopFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <WorkShops />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Workshop