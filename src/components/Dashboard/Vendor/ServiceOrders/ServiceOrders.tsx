"use client"
import { useAllOrdersQuery } from '@/redux/api/order.api'
import { IOrder } from '@/redux/types';
import ErrorComponent from '@/shared/ErrorComponent';
import emptyDataImg from "../../../../../public/empty_data.jpg"
import { ImSpinner8 } from 'react-icons/im';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from 'moment';
import Image from 'next/image';
import OrderResultView from './OrderResultView';
import { Badge } from '@/components/ui/badge';

function ServiceOrders() {
    const { isLoading, isSuccess, data, isError } = useAllOrdersQuery();
    return (
        <div className=''>
            <h3 className='text-base lg:text-lg font-popin text-black py-3'>Document Service Orders</h3>
            {
                isLoading ?
                    <div>
                        <div className='min-h-40 flex items-center justify-center'>
                            <ImSpinner8 className="text-4xl text-primary animate-spin" />
                        </div>
                    </div>
                    :
                    isSuccess ?
                        <div className='max-w-5xl mx-auto'>
                            <OrderTable orders={data?.data} />
                        </div> : isError ? <ErrorComponent /> : <></>
            }
        </div>
    )
}

export default ServiceOrders;


export const OrderTable = ({ orders }: { orders: IOrder[] }) => {
    return <div className="pb-8">
        <Table className="font-figtree">
            <TableHeader className="!bg-primary/10 font-figtree ">
                <TableRow className="">
                    <TableHead className="p-5 font-medium font-figtree">Service</TableHead>
                    <TableHead className="font-medium font-figtree">Price</TableHead>
                    <TableHead className="font-medium font-figtree">Status</TableHead>
                    <TableHead className="font-medium font-figtree">Date</TableHead>
                    <TableHead className="font-medium font-figtree">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="border border-stroke">
                {orders?.map((order) => (

                    <TableRow key={order?.id}>

                        <TableCell>{order?.service?.name}</TableCell>

                        <TableCell>{order?.service?.price}</TableCell>

                        <TableCell>
                            <Badge variant={order?.status == "PENDING" ? "outline" : "secondary"} className={order?.status == "COMPLETED" ? "bg-green-500/20" : ""}>
                                {order?.status}
                            </Badge>
                        </TableCell>


                        <TableCell className="font-medium p-5">{moment(order?.createdAt).format("MMM Do YYYY, h:mm a")}</TableCell>

                        <TableCell>
                            {order?.status == "COMPLETED" && <OrderResultView order={order} />}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>

        </Table>
        {
            orders?.length <= 0 && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' />
                <h5 className='text-base font-figtree text-center'>Data is empty</h5>
            </section>
        }

    </div >
}