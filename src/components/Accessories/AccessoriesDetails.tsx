import DetailsCarousel from '@/shared/DetailsCarousel'
import { Eye, Tag } from 'lucide-react';
import { Add } from '@/redux/types';
import AdDetailsOwner from '@/shared/AdDetailsOwner';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, RedirectType } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { categoryRouteMap } from '@/utils/config';

async function AccessoriesDetails({ promiseAdDetails }: { promiseAdDetails: Promise<{ data: Add }> }) {

    const data = await promiseAdDetails;
    const t = await getTranslations("accessories.details");
    const locale = await getLocale();

    if (!data?.data) {
        return notFound()
    }

    if (data?.data?.category !== "Accessories") {
        redirect({
            href: `/${categoryRouteMap[data?.data?.category]}/${data?.data?.id}`,
            locale: locale,
        }, RedirectType.replace)
    }

    return (
        <>
            <div className='bg-[#F2F4F8] py-8'>
                <div className='container'>
                    <div className='grid grid-cols-5 gap-8'>

                        <div className='col-span-5 lg:col-span-3 space-y-5'>
                            <DetailsCarousel images={data?.data?.images} />

                            <div className='bg-white p-5 rounded-lg'>
                                <h3 className='text-2xl font-popin font-semibold mb-3'>{data?.data?.title}</h3>
                                <pre className='text-sm font-medium font-figtree'>{data?.data?.description}</pre>
                            </div>

                        </div>

                        {/* ------------Right side----------- */}
                        <div className='col-span-5 lg:col-span-2 space-y-5'>
                            {/* ------------owner----------- */}
                            <AdDetailsOwner data={data} />

                            {/* ------------Post Overview----------- */}

                            <div className='bg-white p-5 rounded-lg'>
                                <div className='pb-4 border-b border-stroke'>
                                    <h3 className='text-xl font-popin font-medium'>{t("title")}</h3>
                                </div>
                                <div className='flex flex-row gap-x-1 justify-between items-center pt-4'>
                                    <div className='flex flex-row gap-x-1 items-center'>
                                        <Eye size={20} />
                                        <p className='font-popin text-sm font-medium'>
                                            {t("view")}
                                        </p>
                                    </div>
                                    <p className='font-popin text-base'>{data?.data?.view_count}</p>
                                </div>
                                <div className='pt-4 space-y-4'>
                                    <div className='flex flex-row gap-x-1 justify-between items-center'>
                                        <div className='flex flex-row gap-x-1 items-center'>
                                            <Tag size={20} />
                                            <p className='font-popin text-sm font-medium'>
                                                {t("price.title")}
                                            </p>
                                        </div>
                                        <p className='font-popin text-base'>
                                            {data?.data?.price ? `${(data?.data?.price).toLocaleString(locale === "bn" ? "bn-BD" : "en-US")} ${t("price.currency")} ` : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default AccessoriesDetails;