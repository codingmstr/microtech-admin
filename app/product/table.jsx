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
                    accessor: 'info', label: 'name', hidden: false, render: ({ info }) => (
                        <div>
                            <Elements element='image' value={info.image} type='md'/>
                            <span>{info.name}</span>
                        </div>
                    )
                },
                {
                    accessor: 'vendor', label: 'vendor', hidden: item_filters?.vendor_id, render: ({ vendor }) => (
                        <div className='max-w-[12rem]'>
                            { vendor && <Elements element='image' value={vendor.image}/> }
                            { vendor ? <Link href={`/vendor?edit=${vendor.id}`}>{vendor.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'category', label: 'category', hidden: item_filters?.category_id, render: ({ category }) => (
                        <div className='max-w-[12rem]'>
                            { category && <Elements element='image' value={category.image} type='md'/> }
                            { category ? <Link href={`/category?edit=${category.id}`}>{category.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'new_price', label: 'price', hidden: false, render: ({ new_price }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(new_price, true)}</span>
                            <span>{config.text.curr}</span>
                        </span>
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
