"use client"
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectWithSearch } from '../ui/SelectWithSearch';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { postNewAdd, updateAdd } from '@/lib/Actions/Post.action';
import { tags } from '@/lib/Tags';
import { useRouter } from '@/i18n/navigation';
import { Add } from '@/redux/types';
import { useDispatch } from 'react-redux';
import baseApi from '@/redux/api/baseApi';

type FieldType = {
    title: string,
    // "price": number,

    "description": string | null,

    "divisionId": string | null,
    "districtId": string | null,
    "areaId": string | null,

    dedline: string | null
    vacancy: string | null
    salary: string | null
    age: string | null
    experience: string | null
    job_location: string | null
    about_company: string | null
    company_name: string | null
    job_type: string | null
    employment_type: string | null
}

function JobForm({ defaultData, setOpen }: { defaultData?: Add, setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {

    const router = useRouter();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting: isLoading },
    } = useForm<FieldType>({
        defaultValues: {
            title: defaultData?.title,
            description: defaultData?.description,
            ...defaultData?.job,
        }
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {

            if (defaultData) {
                // await updateAd({ id: defaultData?.id, body: form }).unwrap();
                const updatedRes = await updateAdd({ endPoint: `/ads/jobs/${defaultData?.id}`, payload: JSON.stringify(data), tags: [tags?.jobs] });
                if (updatedRes?.redirect) {
                    router.push("/auth/login");
                    toast.error("Session expired. Please log in again.");
                    return;
                } else if (updatedRes.error) {
                    toast.error(updatedRes.error)
                    return;
                }

            } else {

                // await postJob(data).unwrap();
                const postedRes = await postNewAdd({
                    endPoint: "/ads/jobs",
                    payload: JSON.stringify(data),
                    tags: [tags?.jobs]
                });

                if (postedRes?.redirect) {
                    router.push("/auth/login");
                    toast.error("Session expired. Please log in again.");
                    return;
                } else if (postedRes.error) {
                    toast.error(postedRes.error)
                    return;
                }
            }

            dispatch(baseApi.util.invalidateTags(["ads"]))

            Swal.fire({
                title: `Job Ad ${defaultData ? "updated" : "posted"} successfully!`,
                text: `Your Job add ${defaultData ? "updated" : "posted"} successfully`,
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
            console.log(err)
            toast.error(err?.data?.message || 'Something went wrong, try again')
        }
    }

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