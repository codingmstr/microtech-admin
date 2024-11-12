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
                    accessor: 'client', label: 'client', hidden: item_filters?.client_id, render: ({ client }) => (
                        <div className='max-w-[12rem]'>
                            { client && <Elements element='image' value={client.image}/> }
                            { client ? <Link href={`/client?edit=${client.id}`}>{client.name}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'blog', label: 'blog', hidden: item_filters?.blog_id, render: ({ blog }) => (
                        <div className='max-w-[12rem]'>
                            { blog && <Elements element='image' value={blog.image} type='md'/> }
                            { blog ? <Link href={`/blog?edit=${blog.id}`}>{blog.title}</Link> : <span>--</span> }
                        </div>
                    )
                },
                {
                    accessor: 'content', label: 'content', hidden: false, render: ({ content }) => (
                        <span>{content || '--'}</span>
                    )
                },
                {
                    accessor: 'replies', label: 'replies', hidden: false, render: ({ replies }) => (
                        <span className='!font-nunito'>{fix_number(replies)}</span>
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
