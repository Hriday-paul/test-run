import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import Cars from '@/components/CarBuySell/Cars'
import CarFilter from '@/components/CarBuySell/CarFilter'

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

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-4 gap-5 container'>
          <div className='col-span-1 hidden md:block'>
              <CarFilter />
          </div>
          <div className='col-span-3'>
            <Cars />
          </div>
        </div>
      </div>

    </div>
  )
}

export default CarBuySell