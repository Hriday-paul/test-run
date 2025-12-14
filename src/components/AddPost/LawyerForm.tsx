"use client"
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go';
import { SelectWithSearch } from '../ui/SelectWithSearch';
import { lawyerSpecializations } from '@/utils/config';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import { useAddLawyerMutation } from '@/redux/api/ads.api';
import Swal from 'sweetalert2';
import MultipleSelect from '../ui/MultiSelect';

type FieldType = {
    title: string,

    "description": string,

    phone: string | null
    gender: string | null
    license_number: string | null
    bar_council: string | null

    specialization: string[] // e.g. ["criminal", "corporate", "family"]
    experience_years: string | null // years of experience
    language: string[]
    chamber_location: string | null

    consultation_fee: string | null // fee per consultation
    hourly_rate: string | null

    available_from: string | null
    available_to: string | null
}

function LawyerForm() {

    const [postAdd, { isLoading }] = useAddLawyerMutation();

    const [image, setImage] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FieldType>({ defaultValues: {} });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {
            if (!image) {
                toast.error('Please, select minimum 1 image', { position: "top-center" });
                return;
            }

            const form = new FormData();

            form.append('data', JSON.stringify(data))

            form.append('images', image);

            const res = await postAdd(form).unwrap();

            Swal.fire({
                title: "Lawyer Ad posted successfully!",
                text: "Your lawyer add posted successfully",
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
                "description": "",
                available_from: "",
                available_to: "",
                bar_council: "",
                chamber_location: "",
                consultation_fee: "",
                experience_years: "",
                gender: "",
                hourly_rate: "",
                language: [],
                license_number: "",
                phone: "",
                specialization: []
            });
            setImage(null);

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
    };

    const removeImg = useCallback(() => {
        setImage(null)
    }, [image]);

    return (
        <div>

            <section className='mb-4'>
                <div className='mb-1.5 block text-black font-popin text-base text-left'>
                    Images
                    <span className="text-red-500 text-base ml-1">*</span>
                </div>
                {!image ? <div className='flex flex-row flex-wrap gap-x-2 items-center'>
                    <label htmlFor='addImage' className='h-24 w-24 rounded-md border-2 border-dotted border-strokeinput hover:border-gray-700 cursor-pointer duration-100 flex flex-col justify-center items-center'>
                        <GoPlus className='text-orange-500 text-base' />
                        <p className="mb-1.5 block text-orange-500 font-popin text-xs text-center">Upload Image</p>
                    </label>
                    <input onChange={fileonChange} type="file" name="addImage" id="addImage" className='hidden' accept="image/*" />
                </div> :

                    <div className='relative w-24 h-24'>
                        <div className='w-24 h-24'>
                            <Image src={URL.createObjectURL(image)} fill className='h-full w-full object-cover rounded-md' alt='uploaded' />
                        </div>

                        <button type='button' onClick={() => removeImg()} className='absolute top-0 right-0 p-1 bg-black/90 z-50 cursor-pointer'>
                            <Trash2 className='text-sm text-danger' size={16} />
                        </button>
                    </div>

                }
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


                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='phone' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Phone
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <input
                            type="text"
                            id='phone'
                            {...register("phone", { required: true })}
                            placeholder="Write your phone number"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.phone ? 'border-primary' : ' border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.phone && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.phone?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='chamber_location' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Chamber Location
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='chamber_location'
                            {...register("chamber_location",
                                // { required: true }
                            )}
                            placeholder="Write your chamber location"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.chamber_location ? 'border-primary' : ' border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.chamber_location && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.chamber_location?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='gender' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Gender
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='gender'
                            items={["Male", "Female", "Other"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select gender'
                            validationRules={{
                                required: "Select gender",
                            }}
                        />
                        {errors?.gender && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.gender?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Experience' className="mb-1.5 block text-black dark:text-white font-popin">
                            Experience
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step={"0.02"}
                            id='Experience'
                            {...register("experience_years",
                                // { required: true }
                                
                                {
                                    setValueAs: (v) => v === "" ? null : Number(v),
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid Experience format",
                                    },
                                }
                            )}
                            placeholder="write experience"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.experience_years ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.experience_years && <p className="text-red-500 text-sm col-span-2">{errors?.experience_years?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='specialization' className="mb-1.5 block text-black font-popin">
                            Specialization
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <MultipleSelect
                            name='specialization'
                            items={lawyerSpecializations.map(service => {
                                return { label: service, value: service }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select specialization'
                            validationRules={{
                                required: "Select minimum 1 specialization",
                            }}
                        />
                        {errors?.specialization && <p className="text-red-500 text-sm col-span-2">{errors?.specialization?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='language' className="mb-1.5 block text-black font-popin">
                            Language
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <MultipleSelect
                            name='language'
                            items={["English", "Bangla", "Hindi", "Other"].map(service => {
                                return { label: service, value: service }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select language'
                            validationRules={{
                                required: "Select minimum 1 language",
                            }}
                        />
                        {errors?.language && <p className="text-red-500 text-sm col-span-2">{errors?.language?.message}</p>}
                    </div>

                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='bar_council' className="mb-1.5 block text-black dark:text-white font-popin">
                            Bar Council
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='bar_council'
                            {...register("bar_council",
                                // { required: true }

                            )}
                            placeholder="write ber counsil number"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.bar_council ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.bar_council && <p className="text-red-500 text-sm col-span-2">{errors?.bar_council?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='license_number' className="mb-1.5 block text-black dark:text-white font-popin">
                            License number
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='license_number'
                            {...register("license_number",
                                // { required: true }

                            )}
                            placeholder="write license number"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.license_number ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.license_number && <p className="text-red-500 text-sm col-span-2">{errors?.license_number?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='available_from' className="mb-1.5 block text-black dark:text-white font-popin">
                            Available from
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='available_from'
                            {...register("available_from",
                                // { required: true }

                            )}
                            placeholder="eg : 09:00 Am"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.available_from ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.available_from && <p className="text-red-500 text-sm col-span-2">{errors?.available_from?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='available_to' className="mb-1.5 block text-black dark:text-white font-popin">
                            Available to
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='available_to'
                            {...register("available_to",
                                // { required: true }

                            )}
                            placeholder="eg : 10:00 Pm"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.available_to ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.available_to && <p className="text-red-500 text-sm col-span-2">{errors?.available_to?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='consultation_fee' className="mb-1.5 block text-black dark:text-white font-popin">
                            Consultation fee
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step={"0.02"}
                            id='consultation_fee'
                            {...register("consultation_fee",
                                // { required: true }
                                {
                                    setValueAs: (v) => v === "" ? null : Number(v),
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid consultation fee format",
                                    },
                                }
                            )}
                            placeholder="write consultation fee"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.consultation_fee ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.consultation_fee && <p className="text-red-500 text-sm col-span-2">{errors?.consultation_fee?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='hourly_rate' className="mb-1.5 block text-black dark:text-white font-popin">
                            Hourly rate
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step={"0.02"}
                            id='hourly_rate'
                            {...register("hourly_rate",
                                // { required: true }
                                {
                                    setValueAs: (v) => v === "" ? null : Number(v),
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid hourly rate format",
                                    },
                                }
                            )}
                            placeholder="write hourly rate"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.hourly_rate ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.hourly_rate && <p className="text-red-500 text-sm col-span-2">{errors?.hourly_rate?.message}</p>}
                    </div>
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


                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-popin rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Submit"}</span>
                </button>

            </form>
        </div>
    )
}

export default LawyerForm