"use client"
import Pagination from '@/components/ui/Pagination'
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

function SearchParamsPagination({ totalData = 1, activePage = 1 }: { totalData: number, activePage: number }) {

    const searchParams = useSearchParams();
    const router = useRouter();

    const updateParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const url = `?${params.toString()}`;
        router.push(url, { scroll: true }); // Prevent auto-scroll
    }

    console.log(activePage);

    return (
        <Pagination
            totalPages={totalData}
            initialPage={activePage}
            onPageChange={(n) => updateParams("page", n?.toString())}
            maxDisplayedPages={5}
        />
    )
}

export default SearchParamsPagination