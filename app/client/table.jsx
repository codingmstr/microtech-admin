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
            columns={[
                {
                    accessor: 'id', title: 'id', hidden: false, render: ({ id }) => (
                        <span>{id}</span>
                    )
                },
                {
                    accessor: 'info', title: 'name', hidden: false, render: ({ info }) => (
                        <div>
                            <Elements element='image' value={info.image}/>
                            <span>{info.name}</span>
                        </div>
                    )
                },
                {
                    accessor: 'email', title: 'email', hidden: false, render: ({ email }) => (
                        <span>{email}</span>
                    )
                },
                {
                    accessor: 'phone', title: 'phone', hidden: false, render: ({ phone }) => (
                        <span>{phone}</span>
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
                    accessor: 'active', title: 'status', hidden: false , render: ({ active }) => (
                        <span className={`badge ${active ? 'badge-success' : 'badge-danger'}`}>
                            { active ? config.text.active : config.text.stopped }
                        </span>
                    )
                },
            ]}
        />

    )

}
