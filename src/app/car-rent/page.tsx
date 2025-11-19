import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import RentCarFilter from '@/components/RentCar/RentCarFilter'
import RentCars from '@/components/RentCar/RentCars'

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

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-4 gap-5 container'>
          <div className='col-span-1 hidden lg:block'>
              <RentCarFilter />
          </div>
          <div className='col-span-4 lg:col-span-3'>
            <RentCars />
          </div>
        </div>
      </div>

    </div>
  )
}
export default Exchang