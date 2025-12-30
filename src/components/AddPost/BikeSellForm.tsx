"use client"
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go';
import { SelectWithSearch } from '../ui/SelectWithSearch';
import { bikeBrands, Carbrands } from '@/utils/config';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import { useAddBikeMutation, useAddcarMutation, useDltAdImageMutation, useUpdateBikeMutation } from '@/redux/api/ads.api';
import Swal from 'sweetalert2';
import { useAllDivisionsQuery, useAreasByDivDistrictQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import { useMyProfileQuery } from '@/redux/api/user.api';
import { number } from 'motion/react';
import { Add } from '@/redux/types';
import { Popconfirm } from 'antd';

type FieldType = {
    title: string,
    "price": number | string | null,

    "description": string | null,
    "divisionId": string | null,
    "districtId": string | null,
    "areaId": string | null,

    condition: string | null
    brand: string | null
    model: string | null
    year: string | null | number
    engine: string | null
    mileage: string | number | null
    kilometer: string | number | null
    color: string | null
    fuel_type: string | null
    edition: string | null
    bike_type: string | null
}

function BikeSellForm({ defaultData, setOpen }: { defaultData?: Add, setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [updateAd, { isLoading: updateLoading }] = useUpdateBikeMutation();
    const [dltImage] = useDltAdImageMutation();

    const { isLoading: divisionloading, data, isSuccess, } = useAllDivisionsQuery();

    const { isLoading: profileLoading, isSuccess: profileSuccess, data: profile } = useMyProfileQuery();


    const [division, setDivision] = useState<any>(null);
    const [district, setDistrict] = useState<any>(null);

    const { isLoading: districtLoad, isFetching: districtFetch, data: districts, isSuccess: districtSuccess } = useDistrictsByDivisionQuery({ divisionId: division ? division?.id : 1 });

    const query: { division?: number, district?: number } = {}

    if (division) {
        query.division = division?.id
    }
    if (district) {
        query.district = district?.id
    }

    const { isLoading: areatLoad, isFetching: areaFetch, data: areas, isSuccess: areaSuccess } = useAreasByDivDistrictQuery(query);

    const [postAd, { isLoading }] = useAddBikeMutation();

    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
    } = useForm<FieldType>({
        defaultValues: {
            title: defaultData?.title,
            price: defaultData?.price,
            description: defaultData?.description,
            divisionId: defaultData?.divisionId?.toString(),
            districtId: defaultData?.districtId?.toString(),
            areaId: defaultData?.areaId?.toString(),

            ...defaultData?.bike,

        }
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {
            if (images?.length <= 0 && !defaultData) {
                toast.error('Please, select minimum 1 image', { position: "top-center" });
                return;
            }

            const form = new FormData();

            form.append('data', JSON.stringify(data))
            images.forEach((image) => {
                form.append('images', image);
            });

            if (defaultData) {
                await updateAd({ id: defaultData?.id, body: form }).unwrap();
            } else {
                await postAd(form).unwrap();
            }

            Swal.fire({
                title: `Bike Ad ${defaultData ? "updated" : "posted"} successfully!`,
                text: `Your bike add ${defaultData ? "updated" : "posted"} successfully`,
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

            if (defaultData) {

                if (setOpen) {
                    setOpen(false)
                }

                return;
            }

            reset({
                title: "",
                "price": "",
                "description": "",
                "divisionId": data?.divisionId,
                "districtId": data?.districtId,
                "areaId": data?.areaId,
                "bike_type": "",
                "condition": "",
                "brand": "",
                "model": "",
                "mileage": "",
                "year": "",
                "engine": "",
                "color": "",
                "fuel_type": "",
                edition: "",
                kilometer: ""
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
        if (defaultData) {
            setDivision({ id: defaultData?.divisionId })
            setDistrict({ id: defaultData?.districtId })
        }
        else if (profileSuccess) {
            reset({
                divisionId: profile?.data?.division?.id.toString(),
                districtId: profile?.data?.district?.id.toString(),
                areaId: profile?.data?.area?.id.toString(),
            })

            setDivision({ id: profile?.data?.division?.id })
            setDistrict({ id: profile?.data?.district?.id })
        }
    }, [profile, profileSuccess, defaultData])

    useEffect(() => {
        if (division && division?.label) {
            resetField("districtId", {
                defaultValue: null
            })
            resetField("areaId", {
                defaultValue: null
            })
        }
    }, [division])

    useEffect(() => {
        if (district && district?.label) {
            resetField("areaId", {
                defaultValue: null
            })
        }
    }, [district])

    const handleDltUploadedImg = async (payload: { id: number, addId: number }) => {
        try {
            await dltImage(payload).unwrap();
            toast.success("Image deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

    return (
        <div>

            <section className='mb-4'>
                <div className='mb-1.5 block text-black font-popin text-base text-left'>
                    Images
                    <span className="text-red-500 text-base ml-1">*</span>
                </div>
                <div className='flex flex-row flex-wrap gap-2 items-center'>
                    {/* //uploaded images  */}
                    {
                        defaultData?.images?.map((img, indx) => {
                            return <div key={img?.key} className='relative'>
                                <div className=' w-24 h-24'>
                                    <Image src={img?.url} fill className='h-full w-full object-cover rounded-md' alt='uploaded image' />
                                </div>

                                <Popconfirm
                                    title="Are you sure ?"
                                    description={`This image will be delete permanently`}
                                    onConfirm={() => handleDltUploadedImg({ id: img?.id, addId: defaultData?.id })}
                                    okText="Yes"
                                    cancelText="No"
                                    getPopupContainer={(node) => node.parentElement!}
                                >
                                    <button type='button' className='absolute top-0 right-0 p-1 bg-black/90 z-50 cursor-pointer'>
                                        <Trash2 className='text-sm text-danger' size={16} />
                                    </button>
                                </Popconfirm>
                            </div>
                        })
                    }

                    {/* ---------local images------------- */}
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
                        {/* <span className="text-red-500 text-base ml-1">*</span> */}
                    </label>
                    <input
                        type="number"
                        id='price'
                        {...register("price", {
                            // required: true,
                            setValueAs: (v) => v === "" ? null : Number(v),
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
                        <label htmlFor='bike_type' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Bike Type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='bike_type'
                            items={["Motorcycle", "Scooter", "E-bike", "Other"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select Bike type'
                            validationRules={{
                                required: "Select bike type",
                            }}
                        />
                        {errors?.bike_type && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.bike_type?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='condition' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Condition
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='condition'
                            items={["New", "Used"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select condition'
                            validationRules={{
                                required: "Select condition",
                            }}
                        />
                        {errors?.condition && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.condition?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='brand' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Brand
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='brand'
                            items={[...bikeBrands.map(type => {
                                return { label: type, value: type }
                            }), { label: "Other", value: "Other" }]}
                            control={control}
                            errors={errors}
                            placeholder='Select Brand'
                            validationRules={{
                                required: "Select a brand",
                            }}
                        />
                        {errors?.brand && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.brand?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='model' className="mb-1.5 block text-black dark:text-white font-popin">
                            Model
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='model'
                            {...register("model",
                                // { required: true }
                            )}
                            placeholder="Model name"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.model ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.model && <p className="text-red-500 text-sm col-span-2">{errors?.model?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='engine' className="mb-1.5 block text-black dark:text-white font-popin">
                            Engine
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='engine'
                            {...register("engine",
                                // { required: true }
                            )}
                            placeholder="engine configuration"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.engine ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.engine && <p className="text-red-500 text-sm col-span-2">{errors?.engine?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='edition' className="mb-1.5 block text-black dark:text-white font-popin">
                            Edition
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='edition'
                            {...register("edition",
                                // { required: true }
                            )}
                            placeholder="write edition"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.edition ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.edition && <p className="text-red-500 text-sm col-span-2">{errors?.edition?.message}</p>}
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='mileage' className="mb-1.5 block text-black dark:text-white font-popin">
                            Mileage
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step="0.01"
                            id='mileage'
                            {...register("mileage", {
                                // required: true,
                                setValueAs: (v) => v === "" ? null : Number(v),
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: "Invalid mileage format",
                                },
                            })}
                            placeholder="eg : 4000.45"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.mileage ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.mileage && <p className="text-red-500 text-sm col-span-2">{errors?.mileage?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='year' className="mb-1.5 block text-black dark:text-white font-popin">
                            Year
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number"
                            id='year'
                            {...register("year", {
                                // required: true,
                                setValueAs: (v) => v === "" ? null : Number(v),
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid year format",
                                },
                            })}
                            placeholder="eg : 2025"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.year ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.year && <p className="text-red-500 text-sm col-span-2">{errors?.year?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Kilometer' className="mb-1.5 block text-black dark:text-white font-popin">
                            Kilometer
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step="0.01"
                            id='Kilometer'
                            {...register("kilometer", {
                                // required: true,
                                setValueAs: (v) => v === "" ? null : Number(v),
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid Kilometer format",
                                },
                            })}
                            placeholder="eg : 2025"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.kilometer ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.kilometer && <p className="text-red-500 text-sm col-span-2">{errors?.kilometer?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='color' className="mb-1.5 block text-black dark:text-white font-popin">
                            Color
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='color'
                            {...register("color",
                                // { required: true }
                            )}
                            placeholder="write color"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.color ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.color && <p className="text-red-500 text-sm col-span-2">{errors?.color?.message}</p>}
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='fuelType' className="mb-1.5 block text-black dark:text-white font-popin">
                            Fule Type
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='fuelType'
                            {...register("fuel_type",
                                // { required: true }
                            )}
                            placeholder="eg : petrol"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.fuel_type ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.fuel_type && <p className="text-red-500 text-sm col-span-2">{errors?.fuel_type?.message}</p>}
                    </div>
                </div>

                {/* ------------------seller location------------- */}
                <div>
                    <h4 className='text-xl font-popin py-3 font-medium'>Seller Location</h4>
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
                                isLoading={divisionloading || profileLoading}
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
                                    return { label: i?.name, value: i?.id, id: i?.id }
                                }) : []}
                                control={control}
                                isLoading={districtLoad || districtFetch || profileLoading}
                                disabled={!division}
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

                            <label htmlFor='area' className="mb-1.5 block text-black dark:text-white font-popin">
                                Area
                                {/* <span className="text-red-500 text-base ml-1">*</span> */}
                            </label>

                            <SelectWithSearch
                                name='areaId'
                                items={areaSuccess ? areas?.data?.map(i => {
                                    return { label: i?.name, value: i?.id, id: i?.id }
                                }) : []}
                                control={control}
                                isLoading={areatLoad || profileLoading || areaFetch}
                                errors={errors}
                                placeholder='Select Area'
                                validationRules={{
                                    // required: "Select a area",
                                }}
                            />
                            {errors?.areaId && <p className="text-red-500 text-sm col-span-2">{errors?.areaId?.message}</p>}
                        </div>
                    </div>
                </div>


                <button type='submit' disabled={isLoading || updateLoading} className='bg-primary py-3 font-popin rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {(isLoading || updateLoading) && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{(isLoading || updateLoading) ? 'Loading...' : "Submit"}</span>
                </button>

            </form>
        </div>
    )
}

export default BikeSellForm