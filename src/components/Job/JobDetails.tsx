"use client"
import { useAddDetailsQuery } from '@/redux/api/ads.api'
import DetailsSkeleton from '@/shared/DetailsSkeleton';
import ErrorComponent from '@/shared/ErrorComponent';
import ShopBanner from '@/shared/ShopBanner';
import Link from 'next/link';
import bannerimg from "../../../public/Job banner.png"
import { IoIosArrowForward } from 'react-icons/io';
import { Building, Calendar } from 'lucide-react';
import moment from "moment";

function JobDetails({ id }: { id: string }) {
    const { isLoading, isError, isSuccess, data } = useAddDetailsQuery({ id });

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div >

            <ShopBanner
                image={bannerimg}
                title="Job Details"
                desc="View job full details"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Job Details
            </ShopBanner>

            {
                isLoading && <DetailsSkeleton />
            }


            {(data && isSuccess) ? data?.data?.category !== "Job" ? <ErrorComponent /> : <div className='bg-[#F2F4F8] py-8'>
                <div className='container space-y-5 lg:space-y-6'>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-xl font-popin font-semibold flex flex-row gap-x-1 items-center'> <Building size={20} /> {data?.data?.job?.company_name}</h3>
                        <h4 className='text-xl font-popin font-medium text-primary'>{data?.data?.title}</h4>
                        <div className='space-y-1'>
                            <p className='text-lg font-medium font-popin'>About Company</p>
                            <p className='text-sm font-popin'>{data?.data?.job?.about_company}</p>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <p className='text-primary text-base font-medium flex flex-row gap-x-1 items-center'> <Calendar size={16} /> Dedline : </p>
                            <p className='font-popin'>{data?.data?.job?.dedline || "N/A"}</p>
                        </div>
                    </div>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-lg font-popin font-semibold flex flex-row gap-x-1 items-center mb-5'> Summery : </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            <p className='text-base font-popin'>
                                Vacancy :
                                <span className='font-medium'> {data?.data?.job?.vacancy || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                Age :
                                <span className='font-medium'> {data?.data?.job?.age || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                Location :
                                <span className='font-medium'> {data?.data?.job?.job_location || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                Salary :
                                <span className='font-medium'> {data?.data?.job?.salary || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                Experience :
                                <span className='font-medium'> {data?.data?.job?.experience || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                Published :
                                <span className='font-medium'> {moment(data?.data?.createdAt).format("MMM Do YY") || "N/A"}</span>
                            </p>
                        </div>
                    </div>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-lg font-popin font-semibold flex flex-row gap-x-1 items-center mb-5'> Overview </h3>
                        <pre className='text-sm font-popin'>{data?.data?.description}</pre>
                    </div>

                </div>
            </div> : <></>}

        </div>
    )
}

export default JobDetails