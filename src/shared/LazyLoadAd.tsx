"use client"
import AccessoriesCard from '@/components/Accessories/AccessoriesCard';
import BikeCard from '@/components/BikeBuySell/BikeCard';
import CarCard from '@/components/CarBuySell/CarCard';
import ExchangeCard from '@/components/Exchange/ExchangeCard';
import JobCard from '@/components/Job/JobCard';
import LawyerCard from '@/components/Lawyers/LawyerCard';
import RentCarCard from '@/components/RentCar/RentCarCard';
import WorkShopCard from '@/components/WorkShop/WorkShopCard';
import { Add, Category } from '@/redux/types';
import React from 'react'
import { toast } from 'react-toastify';

function LazyLoadAd({
    initialPage,
    totalPage,
    query,
    renderCategory,
    handleLoadAdd
}: {
    initialPage: number;
    totalPage: number;
    query: Record<string, any>;
    renderCategory: Category;
    handleLoadAdd: (query: Record<string, any>) => Promise<{ data: { data: Add[]; meta: any } }>;
}) {
    const [ads, setAds] = React.useState<Add[]>([]);
    const [page, setPage] = React.useState(initialPage);
    const [loading, setLoading] = React.useState(false);

    // reset whenever the filter/query changes
    React.useEffect(() => {
        setAds([]);
        setPage(initialPage);
    }, [JSON.stringify(query), initialPage]);

    const hasNextPage = page < totalPage;

    const handleClick = async () => {
        setLoading(true);
        try {
            const nextPage = page + 1;
            const res = await handleLoadAdd({
                query: { ...query, page: nextPage.toString(), limit: "1" },
            }) as { data: { data: Add[]; meta: any } };

            setAds(prev => [...prev, ...res.data.data]);
            setPage(nextPage);
        } catch (err) {
            toast.error("Failed to load Ads. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {ads.map(ad => {
                return renderCategory === "Car" ? <CarCard car={ad} /> :
                    renderCategory === "Bike" ? <BikeCard bike={ad} /> :
                        renderCategory === "Workshop" ? <WorkShopCard workShop={ad} /> :
                            renderCategory === "Accessories" ? <AccessoriesCard accessories={ad} /> :
                                renderCategory === "Job" ? <JobCard job={ad} /> :
                                    renderCategory === "Exchange" ? <ExchangeCard exchange={ad} /> :
                                        renderCategory === "Lawyer" ? <LawyerCard lawyer={ad} /> :
                                            renderCategory === "CarRent" ? <RentCarCard rent={ad} /> :
                                                <></>
            }
            )}

            {hasNextPage && (
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className="bg-primary text-white rounded px-5 py-2 col-span-1 md:col-span-2 xl:col-span-3 mx-auto block"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </>
    );
}


export default LazyLoadAd