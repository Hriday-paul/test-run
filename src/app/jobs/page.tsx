import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/Job banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import JobFilter from '@/components/Job/JobFilter'
import Jobs from '@/components/Job/Jobs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jobs",
  description: "Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh! ",

  openGraph: {
    title: 'Jobs in Bangladesh | Runbd',
    description: 'Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
  },
  twitter: {
    title: 'Jobs in Bangladesh | Runbd',
    description: 'Find jobs in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
  },
}

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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
          <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
              <JobFilter />
          </div>
          <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
            <Jobs />
          </div>
        </div>
      </div>

    </div>
  )
}
export default JobList