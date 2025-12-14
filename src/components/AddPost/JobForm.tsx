"use client"
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectWithSearch } from '../ui/SelectWithSearch';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import { useAddcarMutation, useAddJobMutation } from '@/redux/api/ads.api';
import Swal from 'sweetalert2';
import { useAllDivisionsQuery, useAreasByDivDistrictQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import { useMyProfileQuery } from '@/redux/api/user.api';

type FieldType = {
    title: string,
    // "price": number,

    "description": string,

    "divisionId": string | null,
    "districtId": string | null,
    "areaId": string | null,

    dedline: string
    vacancy: string | null
    salary: string
    age: string
    experience: string | null
    job_location: string
    about_company: string
    company_name: string
    job_type: string
    employment_type: string
}

function JobForm() {
    const { isLoading: profileLoading, isSuccess: profileSuccess, data: profile } = useMyProfileQuery();

    const { isLoading: divisionloading, data, isSuccess, } = useAllDivisionsQuery();
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

    const [postJob, { isLoading }] = useAddJobMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
    } = useForm<FieldType>({ defaultValues: {} });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {

            await postJob(data).unwrap();

            Swal.fire({
                title: "Job Ad posted successfully!",
                text: "Your Job add posted successfully",
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
                // "price": undefined,
                "description": "",
                "divisionId": data?.divisionId,
                "districtId": data?.districtId,
                "areaId": data?.areaId,
                about_company: "",
                age: "",
                company_name: "",
                dedline: "",
                employment_type: "",
                experience: "",
                job_location: "",
                job_type: "",
                salary: "",
                vacancy: ""
            });

        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

    useEffect(() => {
        if (profileSuccess) {
            reset({
                divisionId: profile?.data?.division?.id.toString(),
                districtId: profile?.data?.district?.id.toString(),
                areaId: profile?.data?.area?.id.toString(),
            })

            setDivision({ id: profile?.data?.division?.id })
            setDistrict({ id: profile?.data?.district?.id })
        }
    }, [profile, profileSuccess])

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

    return (
        <div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='country' className="mb-1.5 block text-black dark:text-white font-popin">
                        Job Title
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
                        <label htmlFor='companyname' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Company name
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <input
                            type="text"
                            id='companyname'
                            {...register("company_name",
                                { required: true }
                            )}
                            placeholder="Company name"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.company_name ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.company_name && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.company_name?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='dedline' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Application Dedline
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>

                        <input
                            type="text"
                            id='dedline'
                            {...register("dedline",
                                // { required: true }
                            )}
                            placeholder="eg : 20 November 2025"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.dedline ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.dedline && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.dedline?.message}</p>}
                    </div>
                </div>

                <div className="w-full mx-auto mb-3">
                    <label htmlFor='aboutcompany' className="mb-1.5 block text-black font-popin">
                        About Company
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <textarea
                        rows={3}
                        id='aboutcompany'
                        {...register("about_company", {
                            required: true,
                        })}
                        placeholder="Write about company"
                        className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.about_company ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.about_company && <p className="text-red-500 text-sm col-span-2">{errors?.about_company?.message}</p>}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-4">
                        <label htmlFor='job_type' className="mb-1.5 block text-black dark:text-white font-popin text-base">
                            Job type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>

                        <SelectWithSearch
                            name='job_type'
                            items={["Onsite", "Remote"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select Job type'
                            validationRules={{
                                required: "Select job type",
                            }}
                        />
                        {errors?.job_type && <p className="text-red-500 text-sm col-span-2 font-popin">{errors?.job_type?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='employment_type' className="mb-1.5 block text-black dark:text-white font-popin">
                            Employment type
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <SelectWithSearch
                            name='employment_type'
                            items={["Fulltime", "Parttime"].map(type => {
                                return { label: type, value: type }
                            })}
                            control={control}
                            errors={errors}
                            placeholder='Select employment type'
                            validationRules={{
                                required: "Select employment type",
                            }}
                        />
                        {errors?.employment_type && <p className="text-red-500 text-sm col-span-2">{errors?.employment_type?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='vacancy' className="mb-1.5 block text-black dark:text-white font-popin">
                            Vacancy
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number"
                            id='vacancy'
                            {...register("vacancy", {
                                // required: true,
                                setValueAs: (v) => v === "" ? null : Number(v),
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid vacancy format",
                                },
                            })}
                            placeholder="Write vacancy"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.vacancy ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.vacancy && <p className="text-red-500 text-sm col-span-2">{errors?.vacancy?.message}</p>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='salary' className="mb-1.5 block text-black dark:text-white font-popin">
                            Salary range
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='salary'
                            {...register("salary",
                                // { required: true }
                            )}
                            placeholder="eg : 20,000 - 50,000"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.salary ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.salary && <p className="text-red-500 text-sm col-span-2">{errors?.salary?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='age' className="mb-1.5 block text-black dark:text-white font-popin">
                            Minimum Age
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='age'
                            {...register("age", {
                                // required: true,

                            })}
                            placeholder="eg : 25 years"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.age ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.age && <p className="text-red-500 text-sm col-span-2">{errors?.age?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='experience' className="mb-1.5 block text-black dark:text-white font-popin">
                            Minimum Experience
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="number" step="0.01"
                            id='experience'
                            {...register("experience", {
                                // required: true,
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid year format",
                                },
                            })}
                            placeholder="eg : 1.5"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.experience ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.experience && <p className="text-red-500 text-sm col-span-2">{errors?.experience?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='job_location' className="mb-1.5 block text-black dark:text-white font-popin">
                            Job Location
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='job_location'
                            {...register("job_location",
                                // { required: true }
                            )}
                            placeholder="write job location"
                            className={`w-full rounded bg-white border  py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.job_location ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                        />
                        {errors?.job_location && <p className="text-red-500 text-sm col-span-2">{errors?.job_location?.message}</p>}
                    </div>

                </div>

                <div className="w-full mx-auto mb-3">
                    <label htmlFor='description' className="mb-1.5 block text-black font-popin">
                        Job Description
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

export default JobForm