import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import Cars from '@/components/CarBuySell/Cars'
import CarFilter from '@/components/CarBuySell/CarFilter'
import CarSearchBar from '@/components/CarBuySell/CarSearchBar'
import Searchbar from '@/components/BikeBuySell/Searchbar'

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
          <div className='flex flex-col md:flex-row flex-wrap gap-5 justify-center'>
            <CarSearchBar />
            <Searchbar />
          </div>
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