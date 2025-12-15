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