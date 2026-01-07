import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/document-service-banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import DocumentServices from '@/components/DocumentServices/DocumentServices'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Vehicle Process",
    description: "Process vehicle documents with Runbd, the largest marketplace in Bangladesh!",

    openGraph: {
        title: 'Vehicle Process in Bangladesh | Runbd',
        description: 'Process vehicle documents with Runbd, the largest marketplace in Bangladesh!',
    },
    twitter: {
        title: 'Vehicle Process in Bangladesh | Runbd',
        description: 'Process vehicle documents with Runbd, the largest marketplace in Bangladesh!',
    },
}

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