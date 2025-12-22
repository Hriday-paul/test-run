import { Add } from '@/redux/types'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CarSellForm from '../AddPost/CarSellForm'
import { FaArrowDownLong } from 'react-icons/fa6'

function EditPost({ defaultData }: { defaultData: Add }) {
    const [open, setOpen] = useState(false);
    return (
        <div>

            <Dialog open={open} onOpenChange={setOpen}>


                <DialogTrigger>

                    <button className='w-full font-popin flex flex-row gap-x-2 items-center cursor-pointer'>
                        <FaArrowDownLong className='text-black rotate-180' />
                        Edit Post
                    </button>

                </DialogTrigger>


                <DialogContent className='max-h-screen overflow-y-auto min-w-[600px] mx-auto z-50'>
                    <DialogHeader>
                        <DialogTitle className="font-medium">Edit Post</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>


                    {
                        defaultData?.car ? <CarSellForm defaultData={defaultData} setOpen={setOpen}/> : <></>
                    }



                </DialogContent>

            </Dialog>

        </div>
    )
}

export default EditPost