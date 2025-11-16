import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UseUpdateSearchParams } from "@/hooks/UseUpdateSearchPrams";


function SortBar({ limit, sort = "createdAt" }: { limit: string, sort ?: string }) {

    const updateSearchParam = UseUpdateSearchParams();

    return (

        <div className="flex items-center gap-2">

            <div className="flex items-center  border md:px-4 px-1 rounded-md">
                <span className="text-sm font-popin">Show:</span>
                <Select
                    // value={limit?.toString()}
                    defaultValue="10"
                    onValueChange={(value) => updateSearchParam("limit", value)}
                >
                    <SelectTrigger className="h-8 border-none shadow-none focus-visible:ring-0 px-2 truncate font-popin cursor-pointer">
                        <SelectValue placeholder={limit?.toString()} />
                    </SelectTrigger>
                    <SelectContent className="font-popin">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="md:flex items-center  border md:px-4 px-1 rounded-md hidden">
                <span className="text-sm truncate font-popin">Sort by:</span>
                <Select
                    defaultValue={sort}
                    onValueChange={(value) => updateSearchParam("sort", value)}
                >
                    <SelectTrigger className="h-8 border-none shadow-none focus-visible:ring-0 px-2 font-popin cursor-pointer">
                        <SelectValue placeholder={sort?.toString()}/>
                    </SelectTrigger>
                    <SelectContent className="font-popin">
                        <SelectItem value="-createdAt">New post</SelectItem>
                        <SelectItem value="createdAt">Old post</SelectItem>
                        <SelectItem value="price">Price: Low to High</SelectItem>
                        <SelectItem value="-price">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>


        </div>
    )
}

export default SortBar