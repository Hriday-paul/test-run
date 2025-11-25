"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfileQuery } from '@/redux/api/authApi';
import ErrorComponent from '@/shared/ErrorComponent';
import Image from 'next/image';

function UserHome() {
    const { isLoading: profileGetLoad, isSuccess: profileSuccess, isError, data: profileData } = useGetUserProfileQuery();

    if (profileGetLoad) {
        return <div className='space-y-5 items-center w-full'>
            <Skeleton className="h-40 w-full rounded" />
        </div>
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
             <h3 className='text-base lg:text-lg font-popin text-black py-3'>Welcome, {profileData?.data?.first_name} 🎉</h3>
            <div className='bg-white py-8 flex flex-row gap-2 justify-center items-center border border-stroke rounded-xl'>
                <div className='relative'>
                    <Image src={profileData?.data?.picture?.url || "/empty-user.png"} alt='user image' className='h-20 w-20 object-cover rounded-full border border-primary' height={600} width={600} />
                </div>
                <div className='space-y-1'>
                    <h3 className='text-xl text-black font-popin font-medium'>{profileData?.data?.first_name + " " + profileData?.data?.last_name}</h3>
                    <p className='text-sm font-popin'>{profileData?.data?.phone}</p>
                </div>
            </div>
        </div>
    )
}

export default UserHome