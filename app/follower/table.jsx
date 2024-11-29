"use client";
import { fix_date, fix_number } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Table from "@/components/table";
import Elements from "@/components/elements";

export default function _Table_ ({ system, id, setId, setForm, params, item_filters, options }) {

    const config = useSelector((state) => state.config);

    return (

        <Table
            id={id} system={system} setForm={setForm} setId={setId}
            searchParams={params} item_filters={item_filters} {...options}
            add={false} edit={false} deletes={false} follower={true}
            columns={[
                {
                    accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                        <span className='!font-nunito !text-[1rem]'>{id}</span>
                    )
                },
                {
                    accessor: 'vendor', label: 'vendor', hidden: item_filters, render: ({ vendor }) => (
                        <div className='max-w-[12rem]'>
                            { vendor && <Elements element='image' value={vendor.image}/> }
                            <span>{vendor.name || '--'}</span>
                        </div>
                    )
                },
                {
                    accessor: 'client', label: 'client', hidden: false, render: ({ client }) => (
                        <div className='max-w-[12rem]'>
                            { client && <Elements element='image' value={client.image}/> }
                            <span>{client.name || '--'}</span>
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
                        <span className={`badge ${active ? 'badge-success' : 'badge-warning'}`}>
                            { active ? config.text.active : config.text.baned }
                        </span>
                    )
                },
            ]}
        />

    )

}
