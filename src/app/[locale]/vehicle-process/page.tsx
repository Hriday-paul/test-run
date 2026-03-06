import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../../public/document-service-banner.png"
import { Link } from '@/i18n/navigation';
import { IoIosArrowForward } from 'react-icons/io'
import DocumentServices from '@/components/DocumentServices/DocumentServices'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
    title: "Vehicle Process",
    description: "Process vehicle documents with Runbd, the largest marketplace in Bangladesh!",

    openGraph: {
        title: 'Vehicle Process in Bangladesh | Runbd',
        description: 'Process vehicle documents with Runbd, the largest marketplace in Bangladesh!',
        url: '/vehicle-process',
        siteName: 'Runbd',
        images: ['/og-image.png'],
        locale: 'bn_BD',
        type: 'website',
    },
    twitter: {
        title: 'Vehicle Process in Bangladesh | Runbd',
        description: 'Process vehicle documents with Runbd, the largest marketplace in Bangladesh!',
        card: 'summary_large_image',
        creator: '@runbd',
        images: ['/og-image.png'],
    },
}

async function DocumentProcess() {

    const t = await getTranslations("vehicle_process")

    return (
        <div>
            <ShopBanner
                image={bannerimg}
                title={t("banner.title")}
                desc={t("banner.subtitle")}>
                <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.vehicle_process")}
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