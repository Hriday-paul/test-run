import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import JobFilter from '@/components/Job/JobFilter'
import Jobs from '@/components/Job/Jobs'
import Exchanges from '@/components/Exchange/Exchanges'
import ExchangeFilter from '@/components/Exchange/ExchangeFilter'

function Exchang() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Exchange"
        desc="Find your perfect item for Exchange"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Exchange
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <ExchangeFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <Exchanges />
          </div>
        </div>
      </div>

    </div>
  )
}
export default Exchang