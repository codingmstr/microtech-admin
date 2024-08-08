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
                    accessor: 'name', title: 'name', hidden: false, render: ({ name }) => (
                        <span>{name}</span>
                    )
                },
                {
                    accessor: 'vendor', title: 'vendor', hidden: item_filters, render: ({ vendor }) => (
                        <div className='max-w-[12rem]'>
                            { vendor && <Elements element='image' value={vendor.image} type='md'/> }
                            { vendor ? <Link href={`/vendor?edit=${vendor.id}`}>{vendor.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'discount', title: 'discount', hidden: false, render: ({ discount }) => (
                        <span>{fix_number(discount, true)}&nbsp;%</span>
                    )
                },
                {
                    accessor: 'orders', title: 'orders', hidden: false, render: ({ orders }) => (
                        <span>{fix_number(orders)}</span>
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
