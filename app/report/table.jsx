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
                    accessor: 'info', label: 'process', hidden: false, render: ({ info }) => (
                        <span>{config.text[info.process]} {config.text[info.table]}</span>
                    )
                },
                {
                    accessor: 'item', label: 'item', hidden: item_filters?.vendor_id || item_filters?.client_id, render: ({ item }) => (
                        <div className='max-w-[12rem]'>
                            { item?.image && <Elements element='image' value={item.image} type={item.role ? '' : 'md'}/> }
                            { item ? <span>{item.name || item.title || item.content || '--'}</span> : '--' }
                        </div>
                    )
                },
                {
                    accessor: 'price', label: 'price', hidden: false, render: ({ price }) => (
                        <span className='!font-nunito'>{price ? `${fix_number(price, true)} ${config.text.curr}` : '--'}</span>
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
