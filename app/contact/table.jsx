"use client";
import { fix_date } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Table from "@/components/table";

export default function _Table_ ({ system, id, setId, setForm, params, item_filters, options }) {

    const config = useSelector((state) => state.config);

    return (

        <Table
            id={id} system={system} setForm={setForm} setId={setId}
            searchParams={params} item_filters={item_filters} {...options}
            add={false}
            columns={[
                {
                    accessor: 'id', title: 'id', hidden: false, render: ({ id }) => (
                        <span>{id}</span>
                    )
                },
                {
                    accessor: 'name', title: 'name', hidden: false, render: ({ name }) => (
                        <span>{name || '--'}</span>
                    )
                },
                {
                    accessor: 'email', title: 'email', hidden: false, render: ({ email }) => (
                        <span>{email || '--'}</span>
                    )
                },
                {
                    accessor: 'phone', title: 'phone', hidden: false, render: ({ phone }) => (
                        <span>{phone || '--'}</span>
                    )
                },
                {
                    accessor: 'content', title: 'content', hidden: false, render: ({ content }) => (
                        <span>{content || '--'}</span>
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
