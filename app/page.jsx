"use client";
import { api, fix_date, fix_number, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Chart from "@/components/chart";
import Table from "@/components/table";
import Elements from "@/components/elements";
import Link from "next/link";

export default function Home () {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState({});

    const _get_ = async() => {

        const response = await api('statistic');
        setData(response);

    }
    useEffect(() => {

        document.title = config.text.dashboard;
        _get_();

    }, []);

    return (

        <div className="flex flex-col gap-5">

            <div className="w-full grid grid-cols-6 gap-4">

                <div className="w-full h-[10rem] panel !bg-[#fbf2ef] dark:!bg-[#402e32]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-user.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#fa896b]">
                        <p className="text-[1rem] font-semibold tracking-wide">Employees</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">96</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#fef5e5] dark:!bg-[#4d3a2a]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-briefcase.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#ffae1f]">
                        <p className="text-[1rem] font-semibold tracking-wide">Clients</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">3,650</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#eff9ff] dark:!bg-[#082e45]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-mailbox.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#0074ba]">
                        <p className="text-[1rem] font-semibold tracking-wide">Products</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">356</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#fdede8] dark:!bg-[#4b313d]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-favorites.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#fa896b]">
                        <p className="text-[1rem] font-semibold tracking-wide">Events</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">696</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#e6fffa] dark:!bg-[#1b3c48]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-speech-bubble.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#13deb9]">
                        <p className="text-[1rem] font-semibold tracking-wide">Payroll</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">$96k</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#ebf3fe] dark:!bg-[#223662]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-connect.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#539bff]">
                        <p className="text-[1rem] font-semibold tracking-wide">Reports</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">59</p>
                    </div>

                </div>

            </div>
            
            <div className="w-full flex justify-start items-start gap-4 flex-col md:flex-row">

                <div className="w-full h-full flex flex-1 flex-col gap-5">

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                        <Chart type='area' label='clients' icon='users' color='success' data={data.clients}/>
                        <Chart type='area' label='products' icon='product' color='warning' data={data.products}/>
                        <Chart type='area' label='coupons' icon='coupon' color='info' data={data.coupons}/>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                        <Chart type='area' label='orders' icon='order' color='warning' data={data.orders}/>
                        <Chart type='area' label='confirmed' icon='order' color='success' data={data.confirmed_orders}/>
                        <Chart type='area' label='cancelled' icon='order' color='danger' data={data.cancelled_orders}/>
                    </div>

                </div>

                <div className="w-full md:w-[30%]">
                    <Chart type='items' title='reports' height='384' data={[{name: 'clients', ...data.clients}, {name: 'products', ...data.products}, {name: 'orders', ...data.orders}]}/>
                </div>

            </div>

            <div className="w-full flex justify-start items-start gap-4 flex-col md:flex-row">

                <div className="w-full md:w-[35%]">
                    <Chart type='items' title='orders' height='460' data={[{name: 'orders', ...data.orders}, {name: 'confirmed', ...data.confirmed_orders}, {name: 'cancelled', ...data.cancelled_orders}]}/>
                </div>

                <div className="w-[65%]">
                    <Chart type='revenue' title='statistics' height='375' data={[{name: 'clients', ...data.clients}, {name: 'products', ...data.products}, {name: 'orders', ...data.orders}, {name: 'coupons', ...data.coupons}]}/>
                </div>

            </div>

            <div className="w-full">

                <Table
                    system={'order'} label={'recently_orders'} use_filters={false} rows={10} pagination={false} 
                    add={false} settings={true} search={false} deletes={false} checkbox={false} push_url={true}
                    columns={[
                        {
                            accessor: 'id', title: 'id', hidden: false, render: ({ id }) => (
                                <span>{id}</span>
                            )
                        },
                        {
                            accessor: 'client', title: 'client', hidden: false, render: ({ client }) => (
                                <div className='max-w-[12rem]'>
                                    { client && <Elements element='image' value={client.image}/> }
                                    { client ? <Link href={`/client?edit=${client.id}`}>{client.name}</Link> : <span>--</span> }
                                </div>
                            )
                        },
                        {
                            accessor: 'product', title: 'product', hidden: false, render: ({ product }) => (
                                <div className='max-w-[12rem]'>
                                    { product && <Elements element='image' value={product.image} type='md'/> }
                                    { product ? <Link href={`/product?edit=${product.id}`}>{product.name}</Link> : <span>--</span> }
                                </div>
                            )
                        },
                        {
                            accessor: 'price', title: 'price', hidden: false, render: ({ price }) => (
                                <span>{fix_number(price, true)}&nbsp;{config.text.curr}</span>
                            )
                        },
                        {
                            accessor: 'paid', title: 'paid', hidden: false, render: ({ paid }) => (
                                <span className={`badge ${paid ? 'badge-success' : 'badge-danger'}`}>
                                    { paid ? config.text.paid : config.text.not_paid }
                                </span>
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
                                        : 
                                        <span className='badge badge-warning'>{config.text.pending}</span>
                                    }
                                </div>
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

            </div>

            <div className="w-full grid grid-cols-2 gap-4">

                <div className="w-full">

                    <Table
                        system={'client'} label={'recently_clients'} use_filters={false} rows={10} pagination={false} 
                        add={false} settings={true} search={false} deletes={false} checkbox={false} push_url={true} item_filters={{}}
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
                                accessor: 'orders', title: 'orders', hidden: false, render: ({ orders }) => (
                                    <span>{orders}</span>
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

                </div>

                <div className="w-full">

                    <Table
                        system={'product'} label={'recently_products'} use_filters={false} rows={10} pagination={false} 
                        add={false} settings={true} search={false} deletes={false} checkbox={false} push_url={true} item_filters={{}}
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
                                        <span>{info.name}</span>
                                    </div>
                                )
                            },
                            {
                                accessor: 'new_price', title: 'price', hidden: false, render: ({ new_price }) => (
                                    <span>{fix_number(new_price, true)}&nbsp;{config.text.curr}</span>
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

                </div>

            </div>

        </div>

    )

}
