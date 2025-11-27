import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/document-service-banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import DocumentServices from '@/components/DocumentServices/DocumentServices'

function DocumentProcess() {
    
    return (
        <div>
            <ShopBanner
                image={bannerimg}
                title="Vehicle Process"
                desc="Process your documents with us without any hassle"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Vehicle Process
            </ShopBanner>

            <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <DocumentServices />
                </div>
            </div>

        </div>
    )
}

export default DocumentProcess