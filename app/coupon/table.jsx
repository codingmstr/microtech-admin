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
                    accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                        <span className='!font-nunito !text-[1rem]'>{id}</span>
                    )
                },
                {
                    accessor: 'name', label: 'name', hidden: false, render: ({ name }) => (
                        <span>{name}</span>
                    )
                },
                {
                    accessor: 'vendor', label: 'vendor', hidden: item_filters?.vendor_id, render: ({ vendor }) => (
                        <div className='max-w-[12rem]'>
                            { vendor && <Elements element='image' value={vendor.image} type='md'/> }
                            { vendor ? <Link href={`/vendor?edit=${vendor.id}`}>{vendor.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'discount', label: 'discount', hidden: false, render: ({ discount }) => (
                        <span className='!font-nunito'>{fix_number(discount, true)}&nbsp;%</span>
                    )
                },
                {
                    accessor: 'orders', label: 'orders', hidden: false, render: ({ orders }) => (
                        <span className='!font-nunito'>{fix_number(orders)}</span>
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
