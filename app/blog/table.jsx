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
                            <span>{info.title}</span>
                        </div>
                    )
                },
                {
                    accessor: 'views', title: 'views', hidden: false, render: ({ views }) => (
                        <span>{fix_number(views)}</span>
                    )
                },
                {
                    accessor: 'likes', title: 'likes', hidden: false, render: ({ likes }) => (
                        <span>{fix_number(likes)}</span>
                    )
                },
                {
                    accessor: 'dislikes', title: 'dislikes', hidden: false, render: ({ dislikes }) => (
                        <span>{fix_number(dislikes)}</span>
                    )
                },
                {
                    accessor: 'comments', title: 'comments', hidden: false, render: ({ comments }) => (
                        <span>{comments}</span>
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
