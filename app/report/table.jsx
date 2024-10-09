"use client";
import { fix_date } from '@/public/script/main';
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
                    accessor: 'id', title: 'id', hidden: false, render: ({ id }) => (
                        <span>{id}</span>
                    )
                },
                {
                    accessor: 'user', title: 'user', hidden: item_filters, render: ({ user }) => (
                        <div className='max-w-[12rem]'>
                            { user && <Elements element='image' value={user.image}/> }
                            <span>{user.name || '--'}</span>
                        </div>
                    )
                },
                {
                    accessor: 'info', title: 'process', hidden: false, render: ({ info }) => (
                        <span>{config.text[info.process]} {config.text[info.table]}</span>
                    )
                },
                {
                    accessor: 'item', title: 'item', hidden: item_filters, render: ({ item }) => (
                        <div className='max-w-[12rem]'>
                            { item?.image && <Elements element='image' value={item.image} type={item.role ? '' : 'md'}/> }
                            { item ? <span>{item.name || item.title || item.content || '--'}</span> : '--' }
                        </div>
                    )
                },
                {
                    accessor: 'price', title: 'price', hidden: false, render: ({ price }) => (
                        <span>{price ? `${price} ${config.text.curr}` : '--'}</span>
                    )
                },
                {
                    accessor: 'amount', title: 'amount', hidden: false, render: ({ amount }) => (
                        <span>{amount ? `${amount} ${config.text.curr}` : '--'}</span>
                    )
                },
                {
                    accessor: 'created_at', title: 'date', hidden: false, render: ({ created_at }) => (
                        <span>{fix_date(created_at)}</span>
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
