import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/lawyer_banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import LawyerFilter from '@/components/Lawyers/LawyerFilter'
import Lawyers from '@/components/Lawyers/Lawyers'

function Lawyer() {
    return (
        <div>
            <ShopBanner
                image={bannerimg}
                title="Lawyers"
                desc="Find and search best Lawyers for you"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Lawyers
            </ShopBanner>

            <div className='bg-[#F2F4F8] py-8'>
                <div className='grid grid-cols-4 gap-5 container'>
                    <div className='col-span-1 hidden lg:block'>
                        <LawyerFilter />
                    </div>
                    <div className='col-span-4 lg:col-span-3'>
                        <Lawyers />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Lawyer