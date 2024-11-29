"use client";
import { fix_date, fix_number } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Table from "@/components/table";

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
                    accessor: 'amount', label: 'a_amount', hidden: false, render: ({ amount }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(amount, true)}</span>
                            <span>{config.text.curr}</span>
                        </span>
                    )
                },
                {
                    accessor: 'percentage', label: 'percentage', hidden: false, render: ({ percentage }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(percentage, true)} %</span>
                        </span>
                    )
                },
                {
                    accessor: 'orders', label: 'orders', hidden: false, render: ({ orders }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(orders)}</span>
                        </span>
                    )
                },
                {
                    accessor: 'earnings', label: 'earnings', hidden: false, render: ({ earnings }) => (
                        <span className='!flex items-center gap-1.5'>
                            <span className='!font-nunito'>{fix_number(earnings, true)}</span>
                            <span>{config.text.curr}</span>
                        </span>
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
