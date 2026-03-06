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
import BikeSellForm from '../AddPost/BikeSellForm'
import AccessoriesForm from '../AddPost/AccessoriesForm'
import CarrentForm from '../AddPost/CarrentForm'
import WorkshopForm from '../AddPost/WorkshopForm'
import LawyerForm from '../AddPost/LawyerForm'
import JobForm from '../AddPost/JobForm'
import ExchangeForm from '../AddPost/ExchangeForm'

function EditPost({ defaultData, clicker }: { defaultData: Add, clicker: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>


                <DialogTrigger className='w-full text-left py-1 hover:bg-zinc-100 duration-150 rounded-sm'>
                    {clicker}
                </DialogTrigger>


                <DialogContent className='max-h-screen overflow-y-auto lg:min-w-[600px] mx-auto z-50'>
                    <DialogHeader>
                        <DialogTitle className="font-medium">Edit Post</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>


                    {
                        defaultData?.car ? 
                        <CarSellForm defaultData={defaultData} setOpen={setOpen} /> : defaultData?.bike ? 
                        <BikeSellForm defaultData={defaultData} setOpen={setOpen}/> : defaultData?.carRent ? 
                        <CarrentForm defaultData={defaultData} setOpen={setOpen}></CarrentForm> : defaultData?.workshop ? 
                        <WorkshopForm defaultData={defaultData} setOpen={setOpen}/> : defaultData?.lawyer ? 
                        <LawyerForm defaultData={defaultData} setOpen={setOpen}/> : defaultData?.job ?
                        <JobForm defaultData={defaultData} setOpen={setOpen}></JobForm> : defaultData?.exchange ?
                        <ExchangeForm defaultData={defaultData} setOpen={setOpen}></ExchangeForm> :
                        <AccessoriesForm defaultData={defaultData} setOpen={setOpen}></AccessoriesForm>
                    }



                </DialogContent>

            </Dialog>

        </>
    )
}

export default EditPost