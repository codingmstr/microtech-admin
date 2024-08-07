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
                    accessor: 'info', title: 'name', hidden: false, render: ({ info }) => (
                        <div>
                            <Elements element='image' value={info.image} type='md'/>
                            <span>{info.name}</span>
                        </div>
                    )
                },
                {
                    accessor: 'vendor', title: 'vendor', hidden: item_filters, render: ({ vendor }) => (
                        <div className='max-w-[12rem]'>
                            { vendor && <Elements element='image' value={vendor.image}/> }
                            { vendor ? <Link href={`/vendor?edit=${vendor.id}`}>{vendor.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'category', title: 'category', hidden: item_filters, render: ({ category }) => (
                        <div className='max-w-[12rem]'>
                            { category && <Elements element='image' value={category.image} type='md'/> }
                            { category ? <Link href={`/category?edit=${category.id}`}>{category.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'new_price', title: 'price', hidden: false, render: ({ new_price }) => (
                        <span>{fix_number(new_price, true)}&nbsp;{config.text.curr}</span>
                    )
                },
                {
                    accessor: 'orders', title: 'orders', hidden: false, render: ({ orders }) => (
                        <span>{orders}</span>
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
