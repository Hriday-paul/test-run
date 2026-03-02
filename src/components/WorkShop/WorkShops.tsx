import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import Image from "next/image";
import SortBar from "../CarBuySell/SortBar";
import WorkShopCard from "./WorkShopCard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AiOutlineFilter } from "react-icons/ai";
import WorkShopFilter from "./WorkShopFilter";
import { Add, IMeta } from "@/redux/types";
import SearchParamsPagination from "@/shared/SearchParamsPagination";
import { getTranslations } from "next-intl/server";


async function WorkShops({ adsPromise, page, limit, sort }: { adsPromise: Promise<{ data: { data: Add[], meta: IMeta } }>, page: number, limit?: string, sort?: string }) {

    const data = await adsPromise;

    const t = await getTranslations("category_page");

    return (
        <div>

            <div className="flex flex-row justify-between items-center py-2.5">
                <div className='lg:hidden'>
                    <Popover >
                        <PopoverTrigger asChild>
                            <button className='bg-primary/10 rounded text-primary px-3 py-2 text-sm font-figtree font-medium cursor-default flex flex-row gap-x-3 items-center justify-between'>
                                <p>Filter</p>
                                <AiOutlineFilter className=' text-base' />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent side='bottom' align='start'>
                            <WorkShopFilter />
                        </PopoverContent>
                    </Popover>
                </div>
                <p className="text-gray-500 text-sm font-popin font-medium flex flex-row gap-x-1.5 items-center">
                    <PiSlidersHorizontalDuotone className="text-xl" />
                    {t("item_found", { count: data?.data?.meta?.total })}
                </p>
                <SortBar limit={limit} sort={sort} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.data?.data?.map(WorkShop => {
                    return <WorkShopCard key={WorkShop?.id} workShop={WorkShop} />
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

export default WorkShops