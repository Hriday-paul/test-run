"use client"
import { useAddDetailsQuery } from '@/redux/api/ads.api'
import DetailsCarousel from '@/shared/DetailsCarousel'
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import ErrorComponent from '@/shared/ErrorComponent';
import ShopBanner from '@/shared/ShopBanner';
import Link from 'next/link';
import bannerimg from "../../../public/post-top-bg.jpg"
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import { MapPin, Phone, Tag } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

function ExchangeDetails({ id }: { id: string }) {
    const { isLoading, isError, isSuccess, data } = useAddDetailsQuery({ id });

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div >

            <ShopBanner
                image={bannerimg}
                title="Exchange"
                desc="View Exchange full details"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Exchange
            </ShopBanner>

            {
                isLoading && <DetailsSkeleton />
            }


            {(data && isSuccess) ? data?.data?.category !== "Exchange" ? <ErrorComponent /> : <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <p className='text-sm font-medium font-figtree'>{data?.data?.description}</p>
                            </div>

                        </div>
                        <div className='col-span-5 lg:col-span-2 space-y-5'>
                            <div className='bg-white p-5 rounded-lg'>
                                <div className='pb-4 border-b border-stroke'>
                                    <h3 className='text-xl font-popin font-medium'>Seller Information</h3>
                                </div>
                                <div className='flex flex-row gap-x-2.5 items-center pt-4'>
                                    <Image src={data?.data?.owner?.picture?.url || "/empty-user.png"} height={1000} width={1000} className='h-8 w-8 bg-cover rounded-full' alt='user image' />
                                    <h6 className='text-base font-popin font-medium'>{data?.data?.owner?.first_name + " " + data?.data?.owner?.last_name}</h6>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <MapPin size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Location
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.owner?.district || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Phone size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Phone
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.owner?.phone || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <MdEmail size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Email
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.owner?.email || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <FaWhatsapp size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Whatsapp
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.owner?.whatsapp || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white p-5 rounded-lg'>
                                <div className='pb-4 border-b border-stroke'>
                                    <h3 className='text-xl font-popin font-medium'>Information</h3>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <p className='font-popin text-sm font-medium'>
                                                Condition
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.exchange?.condition || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <p className='font-popin text-sm font-medium'>
                                                Location
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.exchange?.location || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div> : <></>}

        </div>
    )
}

export default ExchangeDetails;