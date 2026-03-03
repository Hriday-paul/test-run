
import { Add } from "@/redux/types"
import SimilarAdCarousel from "./SimilarAdCarousel";
import { getTranslations } from "next-intl/server";

const SimilarAd = async ({ AddPromise }: { AddPromise: Promise<{ data: Add[] }> }) => {

    const data = await AddPromise;
    const t = await getTranslations("category_page.details.similar")

    return (
        <div className="bg-[#F2F4F8]">
            <div className="container pb-8">
                <div className="bg-white p-5 rounded-lg">
                    <h4 className='text-xl lg:text-2xl font-popin font-semibold mb-3 border-b border-stroke pb-2'>{t("title")}</h4>
                    <SimilarAdCarousel data={data?.data} />
                </div>
            </div>

        </div>
    )

}
export default SimilarAd