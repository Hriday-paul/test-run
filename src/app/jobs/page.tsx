import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/Job banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import JobFilter from '@/components/Job/JobFilter'
import Jobs from '@/components/Job/Jobs'

function JobList() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Jobs"
        desc="Find and Apply your job"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Jobs
      </ShopBanner>

      <div className='bg-[#F2F4F8] py-8'>
        <div className='grid grid-cols-4 gap-5 container'>
          <div className='col-span-1 hidden lg:block'>
              <JobFilter />
          </div>
          <div className='col-span-4 lg:col-span-3'>
            <Jobs />
          </div>
        </div>
      </div>

    </div>
  )
}
export default JobList