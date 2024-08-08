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
                    accessor: 'content', title: 'content', hidden: false, render: ({ content }) => (
                        <span>{content || '--'}</span>
                    )
                },
                {
                    accessor: 'rate', title: 'rate', hidden: false, render: ({ rate }) => (
                        <span>{rate}</span>
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
