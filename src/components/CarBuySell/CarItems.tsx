"use client"
import { useAllCarsMutation } from '@/redux/api/ads.api';
import { Add, IMeta } from '@/redux/types'
import useLazyLoad from '@/shared/LazyLoadAd';
import { useRef } from 'react'
import CarCard from './CarCard';
import Image from 'next/image';

function CarItems({ query, initialData, initialMeta, notFoundMsg }: { query: { [key: string]: string | undefined }, initialData: Add[], initialMeta: IMeta, notFoundMsg?: string }) {

    const [loadCars, { isLoading }] = useAllCarsMutation();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            query.page = page.toString();

            const res = await loadCars({ params: query }).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<Add>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        initialData: initialData,
        initialPage: initialMeta?.page ? initialMeta.page + 1 : 2,
        initialHasMore: initialMeta ? initialMeta?.page < initialMeta?.totalPage : true
    });

    return (
        <div>
            {
                (data?.length === 0 && !isLoading) && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={"/empty_data.jpg"} height={1000} width={1000} className='h-28 w-auto mx-auto' alt='empty data' />
                    <p className='text-sm text-gray-500 text-center'>{notFoundMsg || "No data found"}</p>
                </section>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.map(car => {
                    return <CarCard key={car?.id} car={car} />
                })}
                {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
            </div>
            {
                isLoading && hasMore && <div className="flex-center h-12 lg:h-16">
                    <span className="loader !w-10"> </span>
                </div>
            }
        </div>
    )
}

export default CarItems