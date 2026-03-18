import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import Image from "next/image";
import SortBar from "../CarBuySell/SortBar";
import BikeCard from "./BikeCard";
import BikeFilter from "./BikeFilter";
import { Add, IMeta } from "@/redux/types";
import SearchParamsPagination from "@/shared/SearchParamsPagination";
import { getTranslations } from "next-intl/server";
import SmFilter from "../ads/SmFilter";
import { gen_JsonLdAd } from "../JSON_LD/AdsLd";


async function Bikes({ adsPromise, page, limit, sort }: { adsPromise: Promise<{ data: { data: Add[], meta: IMeta } }>, page: number, limit?: string, sort?: string }) {

    const data = await adsPromise;
    const t = await getTranslations("category_page");

    const jsonLd = gen_JsonLdAd(data?.data?.data, "Buy & Sell Bike in Bangladesh | Runbd", "bikebuysell");

    return (
        <div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />

            <div className="flex flex-row justify-between items-center py-4">
                <div className='lg:hidden'>
                    <SmFilter filterComponent={<BikeFilter />} />
                </div>
                <p className="text-gray-500 text-sm font-popin font-medium flex flex-row gap-x-1.5 items-center">
                    <PiSlidersHorizontalDuotone className="text-xl" />
                    {t("item_found", { count: data?.data?.meta?.total })}
                </p>
                <SortBar limit={limit} sort={sort} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.data?.data?.map(bike => {
                    return <BikeCard key={bike?.id} bike={bike} />
                })}
            </div>

            {
                data?.data?.meta?.total <= 0 && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={"/empty_data.jpg"} height={1000} width={1000} className='h-28 w-auto mx-auto' alt='empty data' />
                    <h5 className='text-base font-figtree text-center'>{t("not_found")}</h5>
                </section>
            }

            {data?.data?.meta?.total > 0 && <div className="mt-3">
                <SearchParamsPagination totalData={data?.data?.meta?.totalPage || 1} activePage={Number(page) || 1} />
            </div>}
        </div>
    )
}

export default Bikes