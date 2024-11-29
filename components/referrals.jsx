"use client";
import { fix_date, fix_number } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Table from "@/components/table";
import Elements from "@/components/elements";

export default function Referrals ({ system, id }) {

    const config = useSelector((state) => state.config);

    return (

        <div>

            <Table
                system={'referral'} system_id={id} add={false} edit={false} deletes={false} 
                label={`${system}_referrals`} filters={['clients', 'vendors']} 
                columns={[
                    {
                        accessor: 'id', label: 'id', hidden: false, render: ({ id }) => (
                            <span className='!font-nunito !text-[1rem]'>{id}</span>
                        )
                    },
                    {
                        accessor: 'info', label: 'name', hidden: false, render: ({ info }) => (
                            <div>
                                <Elements element='image' value={info.image}/>
                                <span>{info.name}</span>
                            </div>
                        )
                    },
                    {
                        accessor: 'role', label: 'role', hidden: false, render: ({ role }) => (
                            <span>
                                {
                                    role == 2 ? 
                                    <span className='text-success'>{config.text.a_vendor}</span> : 
                                    <span className='text-primary'>{config.text.a_client}</span>
                                }
                            </span>
                        )
                    },
                    {
                        accessor: 'referral_level', label: 'level', hidden: false, render: ({ referral_level }) => (
                            <span className='!font-nunito'>{referral_level}</span>
                        )
                    },
                    {
                        accessor: 'referral_earnings', label: 'earnings', hidden: false, render: ({ referral_earnings }) => (
                            <span className='!flex items-center gap-1.5'>
                                <span className='!font-nunito'>{fix_number(referral_earnings, true)}</span>
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
                        accessor: 'active', label: 'status', hidden: false , render: ({ active }) => (
                            <span className={`badge ${active ? 'badge-success' : 'badge-danger'}`}>
                                { active ? config.text.active : config.text.stopped }
                            </span>
                        )
                    },
                ]}
            />

        </div>

    )

}
