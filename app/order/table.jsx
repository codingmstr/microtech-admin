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
                    accessor: 'id', title: 'id', hidden: false, render: ({ id }) => (
                        <span>{id}</span>
                    )
                },
                {
                    accessor: 'client', title: 'client', hidden: item_filters, render: ({ client }) => (
                        <div className='max-w-[12rem]'>
                            { client && <Elements element='image' value={client.image}/> }
                            { client ? <Link href={`/client?edit=${client.id}`}>{client.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'product', title: 'product', hidden: item_filters, render: ({ product }) => (
                        <div className='max-w-[12rem]'>
                            { product && <Elements element='image' value={product.image} type='md'/> }
                            { product ? <Link href={`/product?edit=${product.id}`}>{product.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'price', title: 'price', hidden: false, render: ({ price }) => (
                        <span>{fix_number(price, true)}&nbsp;{config.text.curr}</span>
                    )
                },
                {
                    accessor: 'paid', title: 'paid', hidden: false, render: ({ paid }) => (
                        <span className={`badge ${paid ? 'badge-success' : 'badge-danger'}`}>
                            { paid ? config.text.paid : config.text.not_paid }
                        </span>
                    )
                },
                {
                    accessor: 'status', title: 'status', hidden: false, render: ({ status }) => (
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
                    accessor: 'created_at', title: 'date', hidden: false, render: ({ created_at }) => (
                        <span>{fix_date(created_at)}</span>
                    )
                },
                {
                    accessor: 'active', title: 'status', hidden: false, render: ({ active }) => (
                        <span className={`badge ${active ? 'badge-success' : 'badge-danger'}`}>
                            { active ? config.text.active : config.text.stopped }
                        </span>
                    )
                },
            ]}
        />

    )

}
