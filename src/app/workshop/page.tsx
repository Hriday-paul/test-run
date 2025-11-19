import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/workshop-banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import WorkShopFilter from '@/components/WorkShop/WorkShopFilter'
import WorkShops from '@/components/WorkShop/WorkShops'

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
        <div className='grid grid-cols-4 gap-5 container'>
          <div className='col-span-1 hidden md:block'>
              <WorkShopFilter />
          </div>
          <div className='col-span-3'>
            <WorkShops />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Workshop