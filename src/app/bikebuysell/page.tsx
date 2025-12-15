import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/bikestop_img.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import BikeFilter from '@/components/BikeBuySell/BikeFilter'
import Bikes from '@/components/BikeBuySell/Bikes'

function CarBuySell() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Find Your Perfect Bike"
        desc="Search and find your best bike for buy"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Bike Buy/Sell
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <BikeFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <Bikes />
          </div>
        </div>
      </div>

    </div>
  )
}

export default CarBuySell