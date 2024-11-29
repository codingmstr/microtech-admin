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
                    accessor: 'info', label: 'title', hidden: false, render: ({ info }) => (
                        <div>
                            <Elements element='image' value={info.image} type='qr'/>
                            <span>{info.title}</span>
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
                    accessor: 'details', label: 'details', hidden: false, render: ({ details }) => (
                        <span>{details || '--'}</span>
                    )
                },
                {
                    accessor: 'created_at', label: 'date', hidden: false, render: ({ created_at }) => (
                        <span className='!font-nunito'>{fix_date(created_at)}</span>
                    )
                },
                {
                    accessor: 'expired_at', label: 'expired_at', hidden: false, render: ({ expired_at }) => (
                        <span className='!font-nunito'>{fix_date(expired_at)}</span>
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
