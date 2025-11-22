"use client"
import { SubmitHandler, useForm } from 'react-hook-form'

type FieldType = {
    title: string,
    "price": number,
    "description": string,
    "division": string,
    "district": string,
    "car_type": string,
    "condition": string,
    "brand": string,
    "model": string,
    "body_type": string,
    "mileage": number,
    "year": number,
    "engine": string,
    "color": string,
    "fuel_type": string,
    "transmission": string,
    "gear_box": string,
    "drive_type": string,
    "air_condition": boolean,
    "seat": number
}

function CarSellForm() {

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<FieldType>({
        defaultValues: {}
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {

    }

    return (
        <div>
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
                        className={`w-full rounded bg-white border border-stroke py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.title ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
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
                        {...register("title", {
                            required: true,
                            pattern: {
                                value: /^\d+(\.\d{1,2})?$/,
                                message: "Invalid price format",
                            },
                        })}
                        placeholder="Write price"
                        className={`w-full rounded bg-white border border-stroke py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-popin placeholder:font-popin ${errors?.title ? 'border-danger' : 'dark:text-white border-strokeinput focus:border-black active:border-black'}`}
                    />
                    {errors?.title && <p className="text-red-500 text-sm col-span-2">{errors?.title?.message}</p>}
                </div>
            </form>
        </div>
    )
}

export default CarSellForm