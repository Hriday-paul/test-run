"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AiOutlineFilter } from "react-icons/ai";


const SmFilter = ({ filterComponent }: { filterComponent: React.ReactNode }) => {

    return (
        <div>
            <Sheet>
                <SheetTrigger className='border border-zinc-200 p-1 md:p-1.5 rounded cursor-pointer hover:bg-zinc-100 duration-150' asChild>
                    <button className='hover:bg-primary/10 rounded text-primary px-3 py-2 text-sm font-figtree font-medium cursor-default flex flex-row gap-x-3 items-center justify-between'>
                        <p>Filter</p>
                        <AiOutlineFilter className=' text-base' />
                    </button>
                </SheetTrigger>
                <SheetContent side={'left'} className="overflow-y-auto [&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar-track]:bg-white
[&::-webkit-scrollbar-thumb]:bg-gray-300
[&::-webkit-scrollbar-thumb]:rounded-full">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription />

                        <div className=''>


                            <h6 className="text-xl font-popin font-medium">
                                Filter
                            </h6>

                            <div className="mt-5">
                                {filterComponent}
                            </div>

                        </div>

                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </div>
    );
};


export default SmFilter;