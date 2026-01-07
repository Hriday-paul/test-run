import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import RentCarFilter from '@/components/RentCar/RentCarFilter'
import RentCars from '@/components/RentCar/RentCars'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Car Rent",
  description: "Find car rent in Bangladesh on Runbd, the largest marketplace in Bangladesh!",

  openGraph: {
    title: 'Car Rent in Bangladesh | Runbd',
    description: 'Find car rent in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
  },
  twitter: {
    title: 'Car Rent in Bangladesh | Runbd',
    description: 'Find car rent in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
  },
}

function Exchang() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Car Rent"
        desc="Find your perfect item"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Car Rent
      </ShopBanner>

      <div className=' bg-[#F2F4F8]'>
        <div className='container pt-8'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
            <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <RentCarFilter />
            </div>
            <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
              <RentCars />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Exchang