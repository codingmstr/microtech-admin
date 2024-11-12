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
            columns={[
                {
                    accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                        <span className='!font-nunito !text-[1rem]'>{id}</span>
                    )
                },
                {
                    accessor: 'info', label: 'name', hidden: false, render: ({ info }) => (
                        <div>
                            <Elements element='image' value={info.image} type='md'/>
                            <span>{info.title}</span>
                        </div>
                    )
                },
                {
                    accessor: 'views', label: 'views', hidden: false, render: ({ views }) => (
                        <span>{fix_number(views)}</span>
                    )
                },
                {
                    accessor: 'likes', label: 'likes', hidden: false, render: ({ likes }) => (
                        <span className='!font-nunito'>{fix_number(likes)}</span>
                    )
                },
                {
                    accessor: 'dislikes', label: 'dislikes', hidden: false, render: ({ dislikes }) => (
                        <span className='!font-nunito'>{fix_number(dislikes)}</span>
                    )
                },
                {
                    accessor: 'comments', label: 'comments', hidden: false, render: ({ comments }) => (
                        <span className='!font-nunito'>{fix_number(comments)}</span>
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
