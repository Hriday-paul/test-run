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
import { Calendar, MapPin, Phone, Timer } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import moment from "moment";

function CarDetails({ id }: { id: string }) {
    const { isLoading, isError, isSuccess, data } = useAddDetailsQuery({ id });

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div >

            <ShopBanner
                image={bannerimg}
                title="Car Details"
                desc="View car full details"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Car Details
            </ShopBanner>

            {
                isLoading && <DetailsSkeleton />
            }


            {(data && isSuccess) ? data?.data?.category !== "Car" ? <ErrorComponent /> : <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <p className='text-sm font-medium font-figtree'>{data?.data?.description}</p>
                            </div>

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>Car Features : </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Engine</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.engine || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Model</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.model || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Mileage</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.mileage || "N/A"} Km </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Gearbox</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.gear_box || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Color</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.color || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Year</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.year || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Fuel Type</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.fuel_type || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Body Type</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.body_type || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Drive Type</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.drive_type || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Air con</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.air_condition ? "Yes" : "No"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Car Type</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.car_type || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Car Seat</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.seat || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Brand</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.brand || "N/A"} </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='text-base font-figtree'>Condition</p>
                                        <p className='text-base font-figtree font-medium'>{data?.data?.car?.condition || "N/A"} </p>
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
                                        <p className='font-popin text-base'>
                                            {data?.data?.owner
                                                ? `${data.data.owner.division?.name || ''}${data.data.owner.division ? ', ' : ''}${data.data.owner.district?.name || ''}${data.data.owner.district ? ', ' : ''}${data.data.owner.area?.name || ''}`.trim() || 'N/A'
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
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div> : <></>}

        </div>
    )
}

export default CarDetails