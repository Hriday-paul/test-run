import DetailsCarousel from '@/shared/DetailsCarousel'
import { IoPricetagOutline } from 'react-icons/io5';
import { Add } from '@/redux/types';
import AdDetailsOwner from '@/shared/AdDetailsOwner';
import { Calendar, Eye, Timer } from 'lucide-react'
import moment from 'moment'
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, RedirectType } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { categoryRouteMap } from '@/shared/FeatureAddCard';


async function CarDetails({ promiseCarDetails }: { promiseCarDetails: Promise<{ data: Add }> }) {

    const data = await promiseCarDetails;

    const t = await getTranslations("car_buy.details")
    const tp = await getTranslations("category_page.details")
    const locale = await getLocale();

    const carRows = [
        { label: t("feature.car_type"), value: (car: any) => car?.car_type },
        { label: t("feature.brand"), value: (car: any) => car?.brand },
        { label: t("feature.model"), value: (car: any) => car?.model },
        { label: t("feature.condition"), value: (car: any) => car?.condition },
        { label: t("feature.year"), value: (car: any) => car?.year },
        { label: t("feature.color"), value: (car: any) => car?.color },
        { label: t("feature.mileage"), value: (car: any) => car?.mileage ? `${car.mileage} ${t("feature.km")}` : null },
        { label: t("feature.fuel_type"), value: (car: any) => car?.fuel_type },
        { label: t("feature.engine"), value: (car: any) => car?.engine },
        { label: t("feature.body_type"), value: (car: any) => car?.body_type },
        { label: t("feature.gear_box"), value: (car: any) => car?.gear_box },
        { label: t("feature.transmission"), value: (car: any) => car?.transmission },
        { label: t("feature.air_condition"), value: (car: any) => car?.air_condition ? t("feature.yes") : t("feature.no") },
        { label: t("feature.drive_type"), value: (car: any) => car?.drive_type },
        { label: t("feature.seat"), value: (car: any) => car?.seat },
    ];

    if (!data?.data) {
        return notFound()
    }

    if (data?.data?.category !== "Car") {
        redirect({
            href: `/${categoryRouteMap[data?.data?.category]}/${data?.data?.id}`,
            locale: locale,
        }, RedirectType.replace)
    }

    return (
        <div>
            <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        {/* ------------left side----------- */}
                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <pre className='text-sm font-medium font-figtree'>{data?.data?.description}</pre>
                            </div>

                            {!!data?.data?.price && <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-xl font-popin font-semibold mb-2 flex flex-row gap-x-1.5 items-center'>
                                    <IoPricetagOutline />
                                    {t("price.title")}</h3>
                                <p className='text-lg font-semibold font-figtree'>{data?.data?.price ? `${(data?.data?.price).toLocaleString(locale === "bn" ? "bn-BD" : "en-US")} ${t("price.currency")} ` : "N/A"}</p>
                            </div>}

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-xl font-popin font-semibold mb-3'>{t("feature.title")} : </h3>

                                <section className="border rounded-xl overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {carRows.map((row, index) => (
                                                <tr
                                                    key={index}
                                                    className="divide-x border-b last:border-b-0 border-b-gray-300"
                                                >
                                                    <td className="text-base font-medium text-gray-700 w-40 md:w-64 h-10 px-3 md:px-4 py-3 border-r border-gray-300 font-figtree">
                                                        {row.label}
                                                    </td>

                                                    <td className="text-base font-semibold text-gray-900 px-3 md:px-4 py-3 font-figtree">
                                                        {row.value(data?.data?.car) ?? "N/A"}
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
                                    <h3 className='text-xl font-popin font-medium'>{tp("post_overview.title")}</h3>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Calendar size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                {tp("post_overview.calander")}
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("MMM Do YY") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Timer size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                {tp("post_overview.time")}
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{moment(data?.data?.createdAt).format("h:mm a") || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Eye size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                {tp("post_overview.view")}
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>{data?.data?.view_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails