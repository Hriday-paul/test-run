"use client"
import { useAddDetailsQuery } from '@/redux/api/ads.api'
import DetailsCarousel from '@/shared/DetailsCarousel'
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import ErrorComponent from '@/shared/ErrorComponent';
import ShopBanner from '@/shared/ShopBanner';
import Link from 'next/link';
import bannerimg from "../../../public/bikestop_img.png"
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import { Calendar, Eye, MapPin, Phone, Timer } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import moment from "moment";
import { IoPricetagOutline } from 'react-icons/io5';

function BikeDetails({ id }: { id: string }) {
    const { isLoading, isError, isSuccess, data } = useAddDetailsQuery({ id });

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div >

            <ShopBanner
                image={bannerimg}
                title="Bike Details"
                desc="View bike full details"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Bike Details
            </ShopBanner>

            {
                isLoading && <DetailsSkeleton />
            }


            {(data && isSuccess) ? data?.data?.category !== "Bike" ? <ErrorComponent /> : <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <pre className='text-sm font-medium font-figtree'>{data?.data?.description}</pre>
                            </div>

                            {data?.data?.price && <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-xl font-popin font-semibold mb-2 flex flex-row gap-x-1.5 items-center'>
                                    <IoPricetagOutline />
                                    Price</h3>
                                <p className='text-lg font-semibold font-figtree'>{data?.data?.price}</p>
                            </div>}

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>Bike Features : </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Engine</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.engine || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Model</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.model || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Mileage</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.mileage || "N/A"} Km </p>
                                    </div>
                                    {/* <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Gearbox</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.g || "N/A"} </p>
                                    </div> */}
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Color</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.color || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Year</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.year || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Fuel Type</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.fuel_type || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Edition</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.edition || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Brand</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.brand || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Condition</p>
                                        <p className='text-base font-figtree font-semibold'>{data?.data?.bike?.condition || "N/A"} </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-span-5 lg:col-span-2 space-y-5'>
                            <div className='bg-white p-5 rounded-lg'>
                                <div className='pb-4 border-b border-stroke'>
                                    <h3 className='text-xl font-popin font-medium'>Seller Information</h3>
                                </div>
                                <div className='flex flex-row gap-x-2.5 items-center pt-4'>
                                    <Image src={data?.data?.owner?.picture?.url || "/empty-user.png"} height={1000} width={1000} className='h-8 w-8 bg-cover rounded-full' alt='user image' />
                                    <h6 className='text-base font-popin font-medium'>{data?.data?.owner?.first_name + " "+ (data?.data?.owner?.last_name || "")}</h6>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <MapPin size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Location
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>
                                            {data?.data
                                                ? `${data?.data.division?.name || ''}${data.data.division ? ', ' : ''}${data?.data?.district?.name || ''}${data.data?.district ? ', ' : ''}${data.data?.area?.name || ''}`.trim() || 'N/A'
                                                : 'N/A'}
                                        </p>
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
                                    <h3 className='text-xl font-popin font-medium'>Post Overview</h3>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Calendar size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Calander
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("MMM Do YY") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Timer size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Time
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("h:mm a") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Eye size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                View
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.view_count}</p>
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

export default BikeDetails