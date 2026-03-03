import ShopBanner from "@/shared/ShopBanner"
import bannerimg from "../../../../public/document-service-banner.png"
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io"
import DocumentCard from "./_components/DocumentCard"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

const documents = [
    {
        id: 1,
        e_name: "Engine Change Application File",
        b_name: "ইঞ্জিন পরিবর্তন ফাইল",
        doc_path: "/form/ইঞ্জিন পরিবর্তন ফাইল.docs",
        pdf_path: "/form/ইঞ্জিন পরিবর্তন ফাইল.pdf"
    },
    {
        id: 2,
        e_name: "Endorsement Duplicate Form",
        b_name: "এন্ড্রোসিমেন্ট প্রতিলিপি ফ্রম",
        doc_path: "/form/এন্ড্রোসিমেন্ট প্রতিলিপি ফ্রম.docs",
        pdf_path: "/form/এন্ড্রোসিমেন্ট প্রতিলিপি ফ্রম.pdf"
    },
    {
        id: 3,
        e_name: "Vehicle Sale Agreement Form",
        b_name: "গাড়ি কেনাবেচার ফর্ম",
        doc_path: "/form/গাড়ি কেনাবেচার ফর্ম.docs",
        pdf_path: "/form/গাড়ি কেনাবেচার ফর্ম.pdf"
    },
    {
        id: 4,
        e_name: "Vehicle Rent Agreement Form",
        b_name: "গাড়ি ভাড়া দেয়া ও নেওয়া চুক্তিপত্র ফর্ম",
        doc_path: "/form/গাড়ি ভাড়া দেয়া ও নেওয়া চুক্তিপত্র ফর্ম.docs",
        pdf_path: "/form/গাড়ি ভাড়া দেয়া ও নেওয়া চুক্তিপত্র ফর্ম.pdf"
    },
    {
        id: 5,
        e_name: "Vehicle Color Change Application File",
        b_name: "গাড়ির রং পরিবর্তনের ফাইল",
        doc_path: "/form/গাড়ির রং পরিবর্তনের ফাইল.docs",
        pdf_path: "/form/গাড়ির রং পরিবর্তনের ফাইল.pdf"
    },
    {
        id: 6,
        e_name: "Fitness Certificate Issue/Renewal/Duplicate Application Form",
        b_name: "ফিটনেস সনদ ইস্যু নবায়ন প্রতিলিপির আবেদন ফরম",
        doc_path: "/form/ফিটনেস সনদ ইস্যু নবায়ন প্রতিলিপির আবেদন ফরম.docs",
        pdf_path: "/form/ফিটনেস সনদ ইস্যু নবায়ন প্রতিলিপির আবেদন ফরম.pdf"
    },
    {
        id: 7,
        e_name: "Seller Attendance Form",
        b_name: "বিক্রেতার হাজিরা ফর্ম",
        doc_path: "/form/বিক্রেতার হাজিরা ফর্ম.docs",
        pdf_path: "/form/বিক্রেতার হাজিরা ফর্ম.pdf"
    },
    {
        id: 8,
        e_name: "Bank Deduction File",
        b_name: "ব্যাংক কর্তন ফাইল",
        doc_path: "/form/ব্যাংক কর্তন ফাইল.docs",
        pdf_path: "/form/ব্যাংক কর্তন ফাইল.pdf"
    },
    {
        id: 13,
        e_name: "Ownership Transfer Buyer's File",
        b_name: "মালিকানা পরিবর্তনের ক্রেতার ফাইল",
        doc_path: "/form/মালিকানা পরিবর্তনের ক্রেতার ফাইল.docs",
        pdf_path: "/form/মালিকানা পরিবর্তনের ক্রেতার ফাইল.pdf"
    },
    {
        id: 9,
        e_name: "Ownership Transfer Seller's File",
        b_name: "মালিকানা পরিবর্তনের বিক্রেতার ফাইল",
        doc_path: "/form/বিক্রেতার হাজিরা ফর্ম.docs",
        pdf_path: "/form/বিক্রেতার হাজিরা ফর্ম.pdf"
    },
    {
        id: 10,
        e_name: "Vehicle Owner Address Change Application",
        b_name: "মোটরযান মালিকের ঠিকানা পরিবর্তনের আবেদনপত্র",
        doc_path: "/form/মোটরযান মালিকের ঠিকানা পরিবর্তনের আবেদনপত্র.docs",
        pdf_path: "/form/মোটরযান মালিকের ঠিকানা পরিবর্তনের আবেদনপত্র.pdf"
    },
    {
        id: 11,
        e_name: "Motor Vehicle Ownership Transfer Form",
        b_name: "মোটরযানের মালিকানা বদলি ফর্ম",
        doc_path: "/form/মোটরযানের মালিকানা বদলি ফর্ম.docs",
        pdf_path: "/form/মোটরযানের মালিকানা বদলি ফর্ম.pdf"
    },
    {
        id: 12,
        e_name: "Road Permit Application Form",
        b_name: "রোড পারমিট ফর্ম",
        doc_path: "/form/রোড পারমিট ফর্ম.docs",
        pdf_path: "/form/রোড পারমিট ফর্ম.pdf"
    }
]

export const metadata: Metadata = {
    title: "Documents",
    description: "You can download any file from Runbd according to your needs.",

    openGraph: {
        title: 'Documents in Runbd',
        description: 'You can download any file from Runbd according to your needs.',
        url: '/documents',
        siteName: 'Runbd',
        images: ['/og-image.png'],
        locale: 'bn_BD',
        type: 'website',
    },
    twitter: {
        title: 'Documents in Runbd',
        description: 'You can download any file from Runbd according to your needs.',
        card: 'summary_large_image',
        creator: '@runbd',
        images: ['/og-image.png'],
    },
}

async function DocumentProcess() {

    const t = await getTranslations('documents');

    return (
        <div>
            <ShopBanner
                image={bannerimg}
                title={t("banner.title")}
                desc={t("banner.subtitle")}
            >
                <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.document")}
            </ShopBanner>

            <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    {/* <DocumentServices /> */}
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 justify-between items-center mb-8 lg:mb-12 md:pt-5'>
                            <div className='space-y-2 md:col-span-2'>
                                <h4 className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-popin font-semibold text-black'>{t("main.title")}</h4>
                                <p className='tet-sm text-gray-800 font-popin'>{t("main.subtitle")}</p>
                            </div>

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {documents?.map(service => {
                                return <DocumentCard key={service?.id} document={service} />
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DocumentProcess