"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { useAddstatsQuery } from "@/redux/api/user.api"
import ErrorComponent from "@/shared/ErrorComponent";
import moment from "moment";

function AddStats() {

    const { isLoading, isSuccess, isError, data } = useAddstatsQuery();

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
                {isLoading ? <>
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </> : isSuccess ? <>
                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-2 py-3">
                            <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-none text-primary font-popin">{data?.data?.add_count}</div>
                            <div className="text-lg font-medium text-primary font-popin">Post Limit</div>
                        </div>
                    </div>
                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-2 py-3">
                            <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-none text-primary font-popin">{data?.data?.postedAd}</div>
                            <div className="text-lg font-medium text-primary font-popin">Posted Add</div>
                        </div>
                    </div>
                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-2 py-3">
                            <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-none text-primary font-popin">{data?.data?.add_count - data?.data?.postedAd}</div>
                            <div className="text-lg font-medium text-primary font-popin">Remain Add</div>
                        </div>
                    </div>

                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-2 py-3">
                            <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-none text-primary font-popin">{data?.data?.feature_count} / {data?.data?.featured}</div>
                            <div className="text-lg font-medium text-primary font-popin">Feature Ad</div>
                        </div>
                    </div>

                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-2 py-3">
                            <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-none text-primary font-popin">{data?.data?.bump_count} / {data?.data?.bumped}</div>
                            <div className="text-lg font-medium text-primary font-popin">Bump Ad</div>
                        </div>
                    </div>

                    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                        <div className="flex flex-col items-center space-y-5 py-3">
                            <div className="text-base md:text-xl font-semibold tracking-tight leading-none text-primary font-popin">{moment(data?.data?.expiredAt).format("DD-MM-YYYY h:mm a")}</div>
                            <div className="text-lg font-medium text-primary font-popin">Expire Date</div>
                        </div>
                    </div>

                </> : <></>}
            </div>
        </div>
    )
}

export default AddStats