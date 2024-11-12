"use client";
import { fix_date, fix_number } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Table from "@/components/table";
import Elements from "@/components/elements";
import Link from 'next/link';

export default function _Table_ ({ system, id, setId, setForm, params, item_filters, options }) {

    const config = useSelector((state) => state.config);

    return (

        <Table
            id={id} system={system} setForm={setForm} setId={setId}
            searchParams={params} item_filters={item_filters} {...options}
            filters={['pending', 'confirmed', 'cancelled', 'request']}
            columns={[
                {
                    accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                        <span className='!font-nunito !text-[1rem]'>{id}</span>
                    )
                },
                {
                    accessor: 'client', label: 'client', hidden: item_filters?.client_id, render: ({ client }) => (
                        <div className='max-w-[12rem]'>
                            { client && <Elements element='image' value={client.image}/> }
                            { client ? <Link href={`/client?edit=${client.id}`}>{client.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'product', label: 'product', hidden: item_filters?.product_id, render: ({ product }) => (
                        <div className='max-w-[12rem]'>
                            { product && <Elements element='image' value={product.image} type='md'/> }
                            { product ? <Link href={`/product?edit=${product.id}`}>{product.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'price', label: 'price', hidden: false, render: ({ price }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(price, true)}</span>
                            <span>{config.text.curr}</span>
                        </span>
                    )
                },
                {
                    accessor: 'paid', label: 'paid', hidden: false, render: ({ paid }) => (
                        <span className={`badge ${paid ? 'badge-success' : 'badge-danger'}`}>
                            { paid ? config.text.paid : config.text.not_paid }
                        </span>
                    )
                },
                {
                    accessor: 'status', label: 'status', hidden: false, render: ({ status }) => (
                        <div>
                            {
                                status === 'confirmed' ?
                                <span className='badge badge-success'>{config.text.confirmed}</span>
                                : status === 'cancelled' ?
                                <span className='badge badge-danger'>{config.text.cancelled}</span>
                                : status === 'request' ?
                                <span className='badge badge-info'>{config.text.request}</span>
                                : 
                                <span className='badge badge-warning'>{config.text.pending}</span>
                            }
                        </div>
                    )
                },
                {
                    accessor: 'created_at', label: 'date', hidden: false, render: ({ created_at }) => (
                        <span className='!font-nunito'>{fix_date(created_at)}</span>
                    )
                },
                {
                    accessor: 'active', label: 'status', hidden: false, render: ({ active }) => (
                        <span className={`badge ${active ? 'badge-success' : 'badge-danger'}`}>
                            { active ? config.text.active : config.text.stopped }
                        </span>
                    )
                },
            ]}
        />

    )

}
