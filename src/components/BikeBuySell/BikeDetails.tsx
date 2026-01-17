import ErrorComponent from '@/shared/ErrorComponent';
import { Calendar, Eye, Timer } from 'lucide-react';
import moment from "moment";
import { IoPricetagOutline } from 'react-icons/io5';
import { Add, IBike } from '@/redux/types';
import DetailsCarousel from '@/shared/DetailsCarousel';
import AdDetailsOwner from '@/shared/AdDetailsOwner';

async function BikeDetails({ promiseAdDetails }: { promiseAdDetails: Promise<{ data: Add }> }) {

    const data = await promiseAdDetails;

    const bikeRows = [
        { label: "Bike Type", value: (bike: IBike) => bike?.bike_type },
        { label: "Brand", value: (bike: IBike) => bike?.brand },
        { label: "Model", value: (bike: IBike) => bike?.model },
        { label: "Mileage", value: (bike: IBike) => bike?.mileage ? `${bike.mileage} Km` : null },
        { label: "Year", value: (bike: IBike) => bike?.year },
        { label: "Color", value: (bike: IBike) => bike?.color },

        { label: "Fuel Type", value: (bike: IBike) => bike?.fuel_type },
        { label: "Engine", value: (bike: IBike) => bike?.engine },
        { label: "Edition", value: (bike: IBike) => bike?.edition },
        { label: "Condition", value: (bike: IBike) => bike?.condition },
    ];

    return (
        <div >

            { data?.data?.category !== "Bike" ? <ErrorComponent /> : <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <pre className='text-sm font-medium font-figtree'>{data?.data?.description}</pre>
                            </div>

                            {data?.data?.price && <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-xl font-popin font-semibold mb-2 flex flex-row gap-x-1.5 items-center'>
                                    <IoPricetagOutline />
                                    Price</h3>
                                <p className='text-lg font-semibold font-figtree'>{data?.data?.price}</p>
                            </div>}

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>Bike Features : </h3>
                                <section className="border rounded-xl overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {bikeRows.map((row, index) => (
                                                <tr
                                                    key={index}
                                                    className="divide-x border-b last:border-b-0 border-b-gray-300"
                                                >
                                                    <td className="text-base font-medium text-gray-700 w-40 md:w-64 h-10 px-3 md:px-4 py-3 border-r border-gray-300 font-figtree">
                                                        {row.label}
                                                    </td>

                                                    <td className="text-base font-semibold text-gray-900 px-3 md:px-4 py-3 font-figtree">
                                                        {row.value(data?.data?.bike) ?? "N/A"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>
                            </div>

                        </div>

                        {/* ------------Right side----------- */}
                        <div className='col-span-5 lg:col-span-2 space-y-5'>
                            {/* ------------owner----------- */}
                            <AdDetailsOwner data={data} />

                            {/* ------------Post Overview----------- */}
                            <div className='bg-white p-5 rounded-lg'>
                                <div className='pb-4 border-b border-stroke'>
                                    <h3 className='text-xl font-popin font-medium'>Post Overview</h3>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Calendar size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Calander
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("MMM Do YY") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Timer size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                Time
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("h:mm a") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Eye size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                View
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.view_count}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>}

        </div>
    )
}

export default BikeDetails