"use client"
import Pagination from '@/components/ui/Pagination'
import { UseUpdatePaginationSearchParams } from '@/hooks/UseUpdatePaginationSerchparams';

function SearchParamsPagination({ totalData = 1, activePage = 1 }: { totalData: number, activePage : number }) {

    const updateParams = UseUpdatePaginationSearchParams();

    return (
        <Pagination
            totalPages={totalData}
            initialPage={activePage}
            onPageChange={(n) => updateParams("page" , n?.toString())}
            maxDisplayedPages={5}
        />
    )
}

export default SearchParamsPagination