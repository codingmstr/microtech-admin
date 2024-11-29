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
            add={false}
            edit={false}
            columns={[
                {
                    accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                        <span className='!font-nunito !text-[1rem]'>{id}</span>
                    )
                },
                {
                    accessor: 'user', label: 'user', hidden: item_filters, render: ({ user }) => (
                        <div className='max-w-[12rem]'>
                            { user && <Elements element='image' value={user.image}/> }
                            <span>{user.name || '--'}</span>
                        </div>
                    )
                },
                {
                    accessor: 'type', label: 'process', hidden: false, render: ({ type }) => (
                        <span>{config.text[type]}</span>
                    )
                },
                {
                    accessor: 'payment', label: 'payment', hidden: false, render: ({ payment }) => (
                        <span>{config.text[payment]}</span>
                    )
                },
                {
                    accessor: 'amount', label: 'amount', hidden: false, render: ({ amount }) => (
                        <span className='!font-nunito'>{amount ? `${fix_number(amount, true)} ${config.text.curr}` : '--'}</span>
                    )
                },
                {
                    accessor: 'created_at', label: 'date', hidden: false, render: ({ created_at }) => (
                        <span className='!font-nunito'>{fix_date(created_at)}</span>
                    )
                },
                {
                    accessor: 'status', label: 'status', hidden: false, render: ({ status }) => (
                        <div>
                            {
                                status === 'successful' ?
                                <span className='badge badge-success'>{config.text.confirmed}</span>
                                : status === 'failed' ?
                                <span className='badge badge-danger'>{config.text.cancelled}</span>
                                : status === 'pending' ?
                                <span className='badge badge-warning'>{config.text.pending}</span> : config.text[status] || '--'
                            }
                        </div>
                    )
                },
            ]}
        />

    )

}
