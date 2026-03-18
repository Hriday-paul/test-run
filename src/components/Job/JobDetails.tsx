import { Building, Calendar } from 'lucide-react';
import moment from "moment";
import { Add } from '@/redux/types';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, RedirectType } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { categoryRouteMap } from '@/utils/config';
import { gen_JsonLdJobDetails } from '../JSON_LD/JobDetailsJsonLd';

async function JobDetails({ promiseAdDetails }: { promiseAdDetails: Promise<{ data: Add }> }) {

    const data = await promiseAdDetails;
    const locale = await getLocale();

    const t = await getTranslations("job.details")

    if (!data?.data) {
        return notFound()
    }

    if (data?.data?.category !== "Job") {
        redirect({
            href: `/${categoryRouteMap[data?.data?.category]}/${data?.data?.id}`,
            locale: locale,
        }, RedirectType.replace)
    }

    const jsonLd = gen_JsonLdJobDetails(data?.data, "jobs");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />

            <div className='bg-[#F2F4F8] py-8'>
                <div className='container space-y-5 lg:space-y-6'>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-xl font-popin font-semibold flex flex-row gap-x-1 items-center'> <Building size={20} /> {data?.data?.job?.company_name}</h3>
                        <h4 className='text-xl font-popin font-medium text-primary'>{data?.data?.title}</h4>
                        <div className='space-y-1'>
                            <p className='text-lg font-medium font-popin'>{t("company_section.about_company")}</p>
                            <p className='text-sm font-popin'>{data?.data?.job?.about_company}</p>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <p className='text-primary text-base font-medium flex flex-row gap-x-1 items-center'> <Calendar size={16} /> {t("company_section.deadline")} : </p>
                            <p className='font-popin'>{data?.data?.job?.dedline || "N/A"}</p>
                        </div>
                    </div>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-lg font-popin font-semibold flex flex-row gap-x-1 items-center mb-5'> {t("summary.title")} : </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                            <p className='text-base font-popin'>
                                {t("summary.vacancy")} :
                                <span className='font-medium'> {data?.data?.job?.vacancy || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                {t("summary.age")} :
                                <span className='font-medium'> {data?.data?.job?.age || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                {t("summary.location")} :
                                <span className='font-medium'> {data?.data?.job?.job_location || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                {t("summary.salary")} :
                                <span className='font-medium'> {data?.data?.job?.salary || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                {t("summary.experience")} :
                                <span className='font-medium'> {data?.data?.job?.experience || "N/A"}</span>
                            </p>
                            <p className='text-base font-popin'>
                                {t("summary.published")} :
                                <span className='font-medium'> {moment(data?.data?.createdAt).format("MMM Do YY") || "N/A"}</span>
                            </p>
                        </div>
                    </div>

                    <div className='p-5 lg:p-8 bg-white space-y-2 rounded-lg'>
                        <h3 className='text-lg font-popin font-semibold flex flex-row gap-x-1 items-center mb-5'> {t("overview.title")} </h3>
                        <pre className='text-sm font-popin'>{data?.data?.description}</pre>
                    </div>

                </div>
            </div>

        </>
    )
}

export default JobDetails