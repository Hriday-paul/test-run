"use client"

// ----used client for ignore seo--------

import { Add } from '@/redux/types'
import {MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

function AdDetailsOwner({ data }: { data: { data: Add } }) {
    return (

        <div className='bg-white p-5 rounded-lg'>
            <div className='pb-4 border-b border-stroke'>
                <h3 className='text-xl font-popin font-medium'>Seller Information</h3>
            </div>
            <div className='flex flex-row gap-x-2.5 items-center pt-4'>
                <Image src={data?.data?.owner?.picture?.url || "/empty-user.png"} height={1000} width={1000} className='h-8 w-8 bg-cover rounded-full' alt='user image' />
                <h6 className='text-base font-popin font-medium'>{data?.data?.owner?.first_name + " " + (data?.data?.owner?.last_name || "")}</h6>
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

    )
}

export default AdDetailsOwner