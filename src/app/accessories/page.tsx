import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/Accessories Image.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import AccessoriesFilter from '@/components/Accessories/AccessoriesFilter'
import Accessories from '@/components/Accessories/Accessories'

function Accesories() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Accessories"
        desc="Search and find your accessories"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Accessories
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-4 gap-5 container'>
          <div className='col-span-1 hidden md:block'>
              <AccessoriesFilter />
          </div>
          <div className='col-span-3'>
            <Accessories />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Accesories