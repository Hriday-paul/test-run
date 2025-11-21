"use client"
import { useMyPaymentsQuery } from '@/redux/api/user.api';
import React, { useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import emptyDataImg from '../../../../../public/empty_data.jpg'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/ui/Pagination';
import ErrorComponent from '@/shared/ErrorComponent';

const Payments = () => {

    const [page, setPage] = useState(1);
    const { isLoading, isSuccess, data, isError } = useMyPaymentsQuery({ page });

    return (
        <div>
            {
                isLoading ?
                    <div>
                        <div className='min-h-40 flex items-center justify-center'>
                            <ImSpinner8 className="text-4xl text-primary_red animate-spin" />
                        </div>
                    </div>
                    :
                    isSuccess ?
                        <div className='max-w-5xl mx-auto'>
                            <PaymentTable payments={data?.data} />
                            <div className="mt-3">
                                <Pagination
                                    totalPages={data?.meta?.totalPage || 1}
                                    initialPage={1}
                                    onPageChange={(n) => setPage(n)}
                                    maxDisplayedPages={5}
                                />
                            </div>
                        </div> : isError ? <ErrorComponent /> : <></>
            }
        </div>
    );
};

export const PaymentTable = ({ payments }: { payments: {}[] }) => {
    return <div className="pb-8">
        <Table className="-z-10 font-figtree">
            <TableHeader className="!bg-primary_red !text-white font-figtree !rounded-t-lg">
                <TableRow className="!rounded-t-lg">
                    <TableHead className="p-5 !rounded-tl-lg font-medium font-figtree">Tran. Id</TableHead>
                    <TableHead className="font-medium font-figtree">Package/Service</TableHead>
                    <TableHead className="font-medium font-figtree">Amount</TableHead>
                    <TableHead className="font-medium font-figtree">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="border border-stroke">
                {payments?.map((payment) => (

                    <TableRow key={payment?.id}>

                        <TableCell>{payment?.transactionId}</TableCell>

                        <TableCell>{job?.package}</TableCell>

                        <TableCell>{payment?.amount}</TableCell>

                        <TableCell className="font-medium p-5">{moment(payment?.createdAt).format("MMM Do YYYY, h:mm a")}</TableCell>

                    </TableRow>
                ))}
            </TableBody>

        </Table>
        {
            payments?.length <= 0 && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' />
                <h5 className='text-base font-figtree text-center'>Data is empty</h5>
            </section>
        }

    </div >
}

export default Payments