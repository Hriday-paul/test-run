import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import Cars from '@/components/CarBuySell/Cars'
import CarFilter from '@/components/CarBuySell/CarFilter'
import CarSearchBar from '@/components/CarBuySell/CarSearchBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Car Buy/Sell",
  description: "Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!",

  openGraph: {
    title: 'Buy & Sell Cars in Bangladesh | Runbd',
    description: 'Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!',
  },
  twitter: {
    title: 'Buy & Sell Cars in Bangladesh | Runbd',
    description: 'Looking to buy a Car? Find bargain deals on new and used cars for sale in Bangladesh or sell cars online at the best price only on Runbd,The largest marketplace in Bangladesh!',
  },
}

function CarBuySell() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Find Your Perfect Car"
        desc="Search and find your best car for buy"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Car Buy/Sell
      </ShopBanner>

      <div className=' bg-[#F2F4F8]'>
        <div className='container pt-8'>

          <CarSearchBar />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
            <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <CarFilter />
            </div>
            <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
              <Cars />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CarBuySell