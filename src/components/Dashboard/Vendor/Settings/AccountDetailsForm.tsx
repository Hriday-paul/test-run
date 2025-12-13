"use client"
import { SelectWithSearch } from '@/components/ui/SelectWithSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@/redux/api/authApi';
import { useAllDivisionsQuery, useAreasByDivDistrictQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import { IArea, IDistrict, IDivision, IUser } from '@/redux/types';
import ErrorComponent from '@/shared/ErrorComponent';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { MdOutlineEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

type FieldType = {
    phone: string,
    first_name: string,
    last_name: string | null,
    email: string | null,
    whatsapp: string | null
    picture: { url: string, key: string } | null

    divisionId: string | null,
    districtId: string | null,
    areaId: string | null,

    facebook: string | null
    twitter: string | null,
    youtube: string | null,
    instagram: string | null
    linkedin: string | null,
    address: string | null,
    website: string | null
}

function AccountDetailsForm() {
    const { isLoading: profileGetLoad, isSuccess: profileSuccess, isError, data: profileData } = useGetUserProfileQuery();

    const [image, setImage] = useState<File | null>(null);

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
    };


    if (profileGetLoad) {
        return <div className='space-y-5 items-center w-full'>
            <Skeleton className="h-40 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
        </div>
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div className='space-y-5'>
            {/* ------------------photo section----------- */}
            <div className='bg-white py-8 flex flex-row gap-2 justify-center items-center border border-stroke rounded-xl'>
                <div className='relative'>
                    <Image src={image ? URL.createObjectURL(image) : (profileData?.data?.picture?.url || "/empty-user.png")} alt='user image' className='h-20 w-20 object-cover rounded-full border border-primary' height={600} width={600} />

                    <label htmlFor="chosePhoto" className='cursor-pointer absolute right-0 bottom-0.5 bg-primary/50 h-6 w-6 p-1 rounded-full flex justify-center items-center'>
                        <MdOutlineEdit className='text-white' />
                    </label>
                    <input onChange={fileonChange} multiple={false} type="file" name="chosePhoto" id="chosePhoto" className='hidden' accept="image/*" />

                </div>
                <div className='space-y-1'>
                    <h3 className='text-xl text-black font-popin font-medium'>{profileData?.data?.first_name + " " + profileData?.data?.last_name}</h3>
                    <p className='text-sm font-popin'>{profileData?.data?.phone}</p>
                </div>
            </div>

            <div className='bg-white p-5 border border-stroke rounded-xl'>
                <div className='border-b border-stroke pb-3'>
                    <h6 className='text-xl font-popin font-medium'>Account Details</h6>
                </div>

                {
                    (profileSuccess && profileData) && <UpdateProfileForm profileData={profileData?.data} image={image} />
                }

            </div>

        </div>
    )
}

export default AccountDetailsForm;

const UpdateProfileForm = ({ profileData, image }: { profileData: IUser, image: File | null }) => {
    const [postUpdate, { isLoading }] = useUpdateProfileMutation();

    const { isLoading: divisionloading, data, isSuccess, } = useAllDivisionsQuery();
    const [division, setDivision] = useState<any>(null);

    const [district, setDistrict] = useState<any>(null);

    const { isLoading: districtLoad, isFetching: districtFetch, data: districts, isSuccess: districtSuccess } = useDistrictsByDivisionQuery({ divisionId: division ? division?.id : profileData?.division ? profileData?.division?.id : 1 });

    const query: { division?: number, district?: number } = {}

    if (division) {
        query.division = division?.id
    }
    if(profileData?.district?.id){
        query.district = profileData?.district?.id
    }
    if (district) {
        query.district = district?.id
    }

    const { isLoading: areatLoad, isFetching: areaFetch, data: areas, isSuccess: areaSuccess } = useAreasByDivDistrictQuery(query);

    const {
        register,
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
    } = useForm<FieldType>({
        defaultValues: {
            ...profileData,
            divisionId: profileData?.division?.id.toString() || undefined,
            districtId: profileData?.district?.id.toString() || undefined,
            areaId: profileData?.area?.id.toString() || undefined,
        }
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {

            console.log(data)

            const form = new FormData();

            form.append('data', JSON.stringify(data))

            if (image) {
                form.append('picture', image);
            }

            const res = await postUpdate({ data: form }).unwrap()

            Swal.fire({
                title: "Profile Updated Successfully!",
                text: "Your account data now updated",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'success',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            })

        } catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong, try again",
                text: "Try again or delay some times, then again try",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            })
        }
    }

    useEffect(() => {
        if (division) {
            resetField("districtId", {
                defaultValue: null
            })
            resetField("areaId", {
                defaultValue: null
            })
        }
    }, [division])

    useEffect(() => {
        if (district && district?.name) {
            resetField("areaId", {
                defaultValue: null
            })
        }
    }, [district])

    return (
        <div className='pt-5'>
            <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Firstname' className="mb-1.5 block text-black dark:text-white font-popin">
                            First name
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            id='Firstname'
                            {...register("first_name", { required: true })}
                            placeholder="First Name"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.first_name ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.first_name && <p className="text-red-500 text-sm col-span-2">{errors?.first_name?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='lastname' className="mb-1.5 block text-black dark:text-white font-popin">
                            Last name
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='lastname'
                            {...register("last_name",
                                // { required: true }
                            )}
                            placeholder="Last name"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.last_name ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.last_name && <p className="text-red-500 text-sm col-span-2">{errors?.last_name?.message}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='email' className="mb-1.5 block text-black dark:text-white font-popin">
                            Email
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="email"
                            id='email'
                            {...register("email",
                                // { required: true }
                            )}
                            placeholder="xyz@gmail.com"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.email ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.email && <p className="text-red-500 text-sm col-span-2">{errors?.email?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Whatsapp' className="mb-1.5 block text-black dark:text-white font-popin">
                            Whatsapp
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='Whatsapp'
                            {...register("whatsapp",
                                // { required: true }
                            )}
                            placeholder="Whatsapp"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.whatsapp ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.whatsapp && <p className="text-red-500 text-sm col-span-2">{errors?.whatsapp?.message}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='division' className="mb-1.5 block text-black dark:text-white font-popin">
                            Division
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <SelectWithSearch
                            name='divisionId'
                            items={isSuccess ? data?.data?.divisions?.map(i => {
                                return { label: i?.name, value: i?.id, id: i?.id }
                            }) : []}
                            setState={setDivision}
                            control={control}
                            isLoading={divisionloading}
                            errors={errors}
                            placeholder='Select Division'
                            validationRules={{
                                // required: "Select a division",
                            }}
                        />
                        {errors?.divisionId && <p className="text-red-500 text-sm col-span-2">{errors?.divisionId?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='district' className="mb-1.5 block text-black dark:text-white font-popin">
                            District
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <SelectWithSearch
                            name='districtId'
                            items={districtSuccess ? districts?.data?.map(i => {
                                return { label: i?.name, value: i?.id, id : i?.id }
                            }) : []}
                            control={control}
                            isLoading={districtLoad || districtFetch}
                            setState={setDistrict}
                            errors={errors}
                            placeholder='Select District'
                            validationRules={{
                                // required: "Select a district",
                            }}
                        />
                        {errors?.districtId && <p className="text-red-500 text-sm col-span-2">{errors?.districtId?.message}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Area' className="mb-1.5 block text-black dark:text-white font-popin">
                            Area
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <SelectWithSearch
                            name='areaId'
                            items={areaSuccess ? areas?.data?.map(i => {
                                return { label: i?.name, value: i?.id }
                            }) : []}
                            control={control}
                            isLoading={areatLoad || areaFetch}
                            errors={errors}
                            placeholder='Select Area'
                            validationRules={{
                                // required: "Select a division",
                            }}
                        />
                        {errors?.areaId && <p className="text-red-500 text-sm col-span-2">{errors?.areaId?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='address' className="mb-1.5 block text-black dark:text-white font-popin">
                            Address
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='address'
                            {...register("address",
                                // { required: true }
                            )}
                            placeholder="Gulsan-02, Dhaka"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.address ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.address && <p className="text-red-500 text-sm col-span-2">{errors?.address?.message}</p>}
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Website' className="mb-1.5 block text-black dark:text-white font-popin">
                            Website
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='Website'
                            {...register("website",
                                // { required: true }
                            )}
                            placeholder="https://google.com"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.website ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.website && <p className="text-red-500 text-sm col-span-2">{errors?.website?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Facebook' className="mb-1.5 block text-black dark:text-white font-popin">
                            Facebook
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='Facebook'
                            {...register("facebook",
                                // { required: true }
                            )}
                            placeholder="Facebook"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.facebook ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.facebook && <p className="text-red-500 text-sm col-span-2">{errors?.facebook?.message}</p>}
                    </div>


                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='instagram' className="mb-1.5 block text-black dark:text-white font-popin">
                            Instagram
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='instagram'
                            {...register("instagram",
                                // { required: true }
                            )}
                            placeholder="https://instagram.com"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.instagram ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.instagram && <p className="text-red-500 text-sm col-span-2">{errors?.instagram?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Youtube' className="mb-1.5 block text-black dark:text-white font-popin">
                            Youtube
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='Youtube'
                            {...register("youtube",
                                // { required: true }
                            )}
                            placeholder="https://youtube.com"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.youtube ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.youtube && <p className="text-red-500 text-sm col-span-2">{errors?.youtube?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='twitter' className="mb-1.5 block text-black dark:text-white font-popin">
                            Twitter
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='twitter'
                            {...register("twitter",
                                // { required: true }
                            )}
                            placeholder="Gulsan-02, Dhaka"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.twitter ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.twitter && <p className="text-red-500 text-sm col-span-2">{errors?.twitter?.message}</p>}
                    </div>
                </div>

                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-popin rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Update"}</span>
                </button>

            </form>
        </div>
    )
}