"use client"
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go';
import { SelectWithSearch } from '../ui/SelectWithSearch';
import { Carbrands, carType } from '@/utils/config';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import { useAddcarMutation, useAddRentCarMutation } from '@/redux/api/ads.api';
import Swal from 'sweetalert2';
import { useAllDivisionsQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import { useMyProfileQuery } from '@/redux/api/user.api';

type FieldType = {
    title: string,
    "price": number,
    "description": string,
    "division": string,
    "district": string,
    "car_type": string,
    contact: string
    location: string
}

function CarrentForm() {
    const { isLoading: profileLoading, isSuccess: profileSuccess, data: profile } = useMyProfileQuery();

    const { isLoading: divisionloading, data, isSuccess, } = useAllDivisionsQuery();
    const [division, setDivision] = useState<any>(null);
    const { isLoading: districtLoad, isFetching: districtFetch, data: districts, isSuccess: districtSuccess } = useDistrictsByDivisionQuery({ divisionId: division ? division?.id : 1 });

    const [postAdd, { isLoading }] = useAddRentCarMutation();

    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FieldType>({ defaultValues: { price: 0 } });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {
            if (images?.length <= 0) {
                toast.error('Please, select minimum 1 image', { position: "top-center" });
                return;
            }

            const form = new FormData();

            form.append('data', JSON.stringify(data))
            images.forEach((image) => {
                form.append('images', image);
            });

            const res = await postAdd(form).unwrap();

            Swal.fire({
                title: "Car Rent Ad posted successfully!",
                text: "Your car rent add posted successfully",
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

            reset({
                title: "",
                "price": 0,
                "description": "",
                "division": data?.division,
                "district": data?.district,
                "car_type": "",
                location : "",
                contact : ""
            });
            setImages([]);

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImages(prev => [...prev, ...fileList])
    };

    const removeImg = useCallback((indxParam: number) => {
        const finalImgs = images?.filter((i, indx) => {
            return indx !== indxParam
        })
        setImages(finalImgs)
    }, [images]);

    useEffect(() => {
        if (profileSuccess && isSuccess) {
            reset({
                division: profileSuccess ? (profile?.data?.division || "") : "",
                district: profileSuccess ? (profile?.data?.district || "") : "",
            })
            const division = data?.data?.divisions?.find(i => i?.name == profile?.data?.division);
            setDivision(division)
        }
    }, [profile, profileSuccess, data, isSuccess])

    return (
        <div>

            <section className='mb-4'>
                <div className='mb-1.5 block text-black font-popin text-base text-left'>
                    Images
                    <span className="text-red-500 text-base ml-1">*</span>
                </div>
                <div className='flex flex-row flex-wrap gap-x-2 items-center'>
                    {
                        images?.map((img, indx) => {
                            return <div key={indx} className='relative'>
                                <div className=' w-24 h-24'>
                                    <Image src={URL.createObjectURL(img)} fill className='h-full w-full object-cover rounded-md' alt='uploaded car' />
                                </div>

                                <button type='button' onClick={() => removeImg(indx)} className='absolute top-0 right-0 p-1 bg-black/90 z-50 cursor-pointer'>
                                    <Trash2 className='text-sm text-danger' size={16} />
                                </button>
                            </div>
                        })
                    }
                    <label htmlFor='addImage' className='h-24 w-24 rounded-md border-2 border-dotted border-strokeinput hover:border-gray-700 cursor-pointer duration-100 flex flex-col justify-center items-center'>
                        <GoPlus className='text-orange-500 text-base' />
                        <p className="mb-1.5 block text-orange-500 font-popin text-xs text-center">Add Image</p>
                    </label>
                    <input onChange={fileonChange} type="file" name="addImage" id="addImage" className='hidden' accept="image/*" multiple />
                </div>
            </section>

            <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='country' className="mb-1.5 block text-black dark:text-white font-popin">
                        Title
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        id='title'
                        {...register("title", { required: true })}
                        placeholder="Write short title"
                        className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.title ? 'border-primary' : ' border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.title && <p className="text-red-500 text-sm col-span-2">{errors?.title?.message}</p>}
                </div>
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='price' className="mb-1.5 block text-black dark:text-white font-popin">
                        Price
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="number"
                        id='price'
                        {...register("price", {
                            required: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Invalid price format",
                            },
                        })}
                        placeholder="Write price"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.price ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.price && <p className="text-red-500 text-sm col-span-2">{errors?.price?.message}</p>}
                </div>
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='description' className="mb-1.5 block text-black font-popin">
                        Description
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={5}
                        id='description'
                        {...register("description", {
                            required: true,
                        })}
                        placeholder="Write description"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.description ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.description && <p className="text-red-500 text-sm col-span-2">{errors?.description?.message}</p>}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='cartype' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Car Type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='car_type'
                            items={carType.map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select Car type'
                            validationRules={{
                                required: "Select a car type",
                            }}
                        />
                        {errors?.car_type && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.car_type?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='address' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Address
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='address'
                            {...register("location",
                                // { required: true }
                            )}
                            placeholder="address"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.location ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.location && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.location?.message}</p>}
                    </div>
                </div>

                {/* ------------------seller location------------- */}
                <div>
                    <h4 className='text-xl font-popin py-3 font-medium'>Seller Location</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="w-full mx-auto mb-3">
                            <label htmlFor='division' className="mb-1.5 block text-black dark:text-white font-popin">
                                Division
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <SelectWithSearch
                                name='division'
                                items={isSuccess ? data?.data?.divisions?.map(i => {
                                    return { label: i?.name, value: i?.name, id: i?.id }
                                }) : []}
                                setState={setDivision}
                                control={control}
                                isLoading={divisionloading || profileLoading}
                                errors={errors}
                                placeholder='Select Division'
                                validationRules={{
                                    required: "Select a division",
                                }}
                            />
                            {errors?.division && <p className="text-red-500 text-sm col-span-2">{errors?.division?.message}</p>}
                        </div>
                        <div className="w-full mx-auto mb-3">
                            <label htmlFor='district' className="mb-1.5 block text-black dark:text-white font-popin">
                                District
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <SelectWithSearch
                                name='district'
                                items={districtSuccess ? districts?.data?.map(i => {
                                    return { label: i?.name, value: i?.name }
                                }) : []}
                                control={control}
                                isLoading={districtLoad || districtFetch || profileLoading}
                                disabled={!division}
                                errors={errors}
                                placeholder='Select District'
                                validationRules={{
                                    required: "Select a district",
                                }}
                            />
                            {errors?.district && <p className="text-red-500 text-sm col-span-2">{errors?.district?.message}</p>}
                        </div>
                    </div>
                </div>


                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-popin rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Submit"}</span>
                </button>

            </form>
        </div>
    )
}

export default CarrentForm