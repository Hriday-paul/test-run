import ShopBanner from '@/shared/ShopBanner'
import bannerimg from "../../../public/lawyer_banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import LawyerFilter from '@/components/Lawyers/LawyerFilter'
import Lawyers from '@/components/Lawyers/Lawyers'
import { Metadata } from 'next'
import { GetAdsByCategory } from '@/lib/services/Quary.Ads'
import { tags } from '@/lib/Tags'
import Searchbar from '@/components/BikeBuySell/Searchbar'
import Adsloading from '@/shared/Adsloading'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: "Lawyer",
    description: "Find lawyer in Bangladesh on Runbd, the largest marketplace in Bangladesh! ",

    openGraph: {
        title: 'Lawyer in Bangladesh | Runbd',
        description: 'Find lawyer in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
        url: '/lawyers',
        siteName: 'Runbd',
        images: ['/og-image.png'],
        locale: 'bn_BD',
        type: 'website',
    },
    twitter: {
        title: 'Lawyer in Bangladesh | Runbd',
        description: 'Find lawyer in Bangladesh on Runbd, the largest marketplace in Bangladesh!',
        card: 'summary_large_image',
        creator: '@runbd',
        images: ['/og-image.png'],
    },
}

async function Lawyer({
    searchParams: ssp,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

    const { limit, sort, page, searchTerm, division, district, area, gender, specialization, } = await ssp;

    let sortBy = "createdAt";
    let orderBy = "desc"

    if (sort == "-createdAt") {
        orderBy = "asc"
    } else if (sort == "price") {
        sortBy = "price";
        orderBy = "asc"
    }
    else if (sort == "-price") {
        sortBy = "price";
        orderBy = "desc"
    }

    const query: any = { page, sortBy, sortOrder: orderBy, limit: 21 }


    if (division) {
        query.division = division
    }
    if (district) {
        query.district = district
    }
    if (area) {
        query.area = area
    }

    if (gender) {
        query.gender = gender
    }
    if (specialization) {
        query.specialization = specialization
    }
    if (searchTerm) {
        query.searchTerm = searchTerm
    }
    if (limit) {
        query.limit = limit
    }

    const adsPromise = GetAdsByCategory({ endPoint: "/ads/lawyers", query, tags: [tags?.lawyers] });

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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-5 container py-5'>
                    <div className='lg:col-span-2 xl:col-span-1 hidden lg:block'>
                        <LawyerFilter />
                    </div>
                    <div className='col-span-1 md:col-span-2 lg:col-span-6 xl:col-span-3'>
                        <div>
                            <Searchbar />

                            <Suspense fallback={<Adsloading />}>
                                <Lawyers adsPromise={adsPromise} limit={limit} page={Number(page)} sort={sort} />
                            </Suspense>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Lawyer