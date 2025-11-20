"use client"
import { useAddDetailsQuery } from "@/redux/api/ads.api";
import DetailsSkeleton from "@/shared/DetailsSkeleton";
import ErrorComponent from "@/shared/ErrorComponent";
import ShopBanner from "@/shared/ShopBanner";
import { BookOpen, Clock, DollarSign, Globe, MapPin, Phone, VenusAndMars } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import bannerimg from "../../../public/lawyer_banner.png"
import { placeHolderBlurImg } from "@/utils/config";

function LawyerDetails({ id }: { id: string }) {

    const { isLoading, isError, isSuccess, data } = useAddDetailsQuery({ id });

    if (isError) {
        return <ErrorComponent />
    }


    return (
        <div>
            <ShopBanner
                image={bannerimg}
                title="lawyer Details"
                desc="View Lawyer full details"
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Lawyer Details
            </ShopBanner>

            <div className="bg-[#F2F4F8]">

                <div className="container">

                    {
                        isLoading && <DetailsSkeleton />
                    }

                    {(data && isSuccess) ? data?.data?.category !== "Lawyer" ? <ErrorComponent /> : <div>

                        {/* Hero Section */}
                        <section className="border-b border-border">
                            <div className="mx-auto max-w-6xl px-6 py-20">
                                <div className="grid md:grid-cols-3 gap-12 items-start">
                                    {/* Profile Picture */}
                                    <div className="md:col-span-1 flex justify-center">
                                        <div className="relative w-full max-w-sm">
                                            <Image
                                                src={data?.data?.images[0]?.url || "/empty-user.png"}
                                                alt={"lawyer image"}
                                                width={1000}
                                                height={1000}
                                                className="w-full rounded-lg object-cover aspect-square"
                                                placeholder="blur"
                                                blurDataURL={placeHolderBlurImg}
                                            />
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="md:col-span-2 space-y-5">
                                        <h1 className="text-2xl md:text-3xl font-semibold font-popin mb-3 text-balance">{data?.data?.title}</h1>

                                        <div className="space-y-3">
                                            <div className='flex flex-row gap-x-2 items-center'>
                                                <p className='text-black text-base font-medium flex flex-row gap-x-1 items-center'> <Phone size={16} /> Phone : </p>
                                                <p className='font-popin'>{data?.data?.lawyer?.phone || "N/A"}</p>
                                            </div>

                                            <div className='flex flex-row gap-x-2 items-center'>
                                                <p className='text-black text-base font-medium flex flex-row gap-x-1 items-center'> <MapPin size={16} /> Location : </p>
                                                <p className='font-popin'>{data?.data?.lawyer?.chamber_location || "N/A"}</p>
                                            </div>

                                            <div className='flex flex-row gap-x-2 items-center'>
                                                <p className='text-black text-base font-medium flex flex-row gap-x-1 items-center'> <VenusAndMars size={16} /> Gender : </p>
                                                <p className='font-popin'>{data?.data?.lawyer?.gender || "N/A"}</p>
                                            </div>
                                        </div>



                                        {/* Specializations Section */}
                                        <section className="">
                                            <h2 className="text-xl font-semibold mb-2 font-popin">Specializations</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {data?.data?.lawyer?.specialization.map((spec, idx) => (
                                                    <div key={idx} className="px-4 py-2 text-sm border border-stroke rounded-md font-popin">
                                                        {spec}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Key Stats */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            <div className="bg-div p-4 rounded-lg border border-border">
                                                <p className="text-sm text-muted-foreground mb-1 font-popin">Experience</p>
                                                <p className="text-xl font-bold text-primary font-popin">{data?.data?.lawyer?.experience_years}+ Years</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Details Section */}
                        <section className="border-b border-border">
                            <div className="px-2 md:px-4 lg:px-6 py-6 md:py-8 lg:py-10">
                                <h2 className="text-lg lg:text-xl font-semibold font-popin mb-3 md:mb-5 lg:mb-5">Professional Details</h2>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* License Information */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4 ">
                                            <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">License Number</p>
                                                <p className="text-base font-semibold font-popin text-foreground">{data?.data?.lawyer?.license_number || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bar Council */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">Bar Council</p>
                                                <p className="text-base font-semibold font-popin text-foreground">{data?.data?.lawyer?.bar_council || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chamber Location */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4">
                                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">Chamber Location</p>
                                                <p className="text-base font-semibold font-popin text-foreground">{data?.data?.lawyer?.chamber_location || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Consultation Fee */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4">
                                            <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">Consultation Fee</p>
                                                <p className="text-base font-semibold font-popin text-foreground">
                                                    ${data?.data?.lawyer?.consultation_fee || "N/A"}/session
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hourly Rate */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4">
                                            <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">Hourly Rate</p>
                                                <p className="text-base font-semibold font-popin text-foreground">${data?.data?.lawyer?.hourly_rate}/hour</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="p-6 border border-border bg-div hover:shadow-lg duration-200 hover:bg-white">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium font-popin text-muted-foreground">Office Hours</p>
                                                <p className="text-base font-semibold font-popin text-foreground">
                                                    {data?.data?.lawyer?.available_from || "N/A"} - {data?.data?.lawyer?.available_to || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold font-popin mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-primary" />
                                        Languages
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data?.data?.lawyer?.language?.map((lang, idx) => (
                                            <div key={idx} className="px-4 py-2 border border-stroke rounded-md font-popin text-sm">
                                                {lang}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                        </section>

                    </div> : <></>}

                </div>

            </div>
        </div>
    )
}

export default LawyerDetails