"use client";
import { api, fix_number, date, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Chart from "@/components/chart";
import Elements from "@/components/elements";
import dynamic from 'next/dynamic';

export default function Home () {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState({});

    const _get_ = async() => {

        const response = await api('statistic');
        setData(response);

    }
    const load_system = ( system ) => {

        const Component = dynamic(() => import(`@/app/${system.name}/page.jsx`), {loading: () => '', ssr: false});
        return !system.hidden && <Component item_filters={system.filters} options={system.options}/>

    }
    useEffect(() => {

        document.title = config.text.dashboard;
        _get_();

    }, []);

    return (

        <div className="flex flex-col gap-5">

            <Elements element='page_title' label='dashboard' name='dashboard'/>

            <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-4">

                <div className="w-full h-[10rem] panel !bg-[#fbf2ef] dark:!bg-[#402e32]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-user.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#fa896b]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.vendors}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.vendors?.total)}</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#fef5e5] dark:!bg-[#4d3a2a]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-briefcase.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#ffae1f]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.clients}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.clients?.total)}</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#eff9ff] dark:!bg-[#082e45]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-mailbox.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#0074ba]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.categories}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.categories?.total)}</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#fdede8] dark:!bg-[#4b313d]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-favorites.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#fa896b]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.products}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.products?.total)}</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#e6fffa] dark:!bg-[#1b3c48]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-speech-bubble.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#13deb9]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.orders}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.orders?.total)}</p>
                    </div>

                </div>
                <div className="w-full h-[10rem] panel !bg-[#ebf3fe] dark:!bg-[#223662]/50 cursor-default flex justify-center items-center flex-col gap-4">

                    <div className="w-full h-[3rem] layer-div overflow-hidden flex justify-center items-center">
                        <img src="/media/layout/icon-connect.svg" className="max-w-full h-full"/>
                    </div>
                    
                    <div className="w-full flex justify-center items-center flex-col gap-2 text-[#539bff]">
                        <p className="text-[1rem] font-semibold tracking-wide">{config.text.coupons}</p>
                        <p className="text-[1.1rem] font-bold tracking-wide">{fix_number(data.coupons?.total)}</p>
                    </div>

                </div>

            </div>
            
            <div className="w-full flex justify-start items-start gap-5 flex-col md:flex-row">

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

                <div className="w-full md:w-[65%]">
                    <Chart type='revenue' title='statistics' height='375' data={[{name: 'clients', ...data.clients}, {name: 'products', ...data.products}, {name: 'orders', ...data.orders}, {name: 'coupons', ...data.coupons}]}/>
                </div>

            </div>

            <div className="w-full min-h-[340px]">
                {load_system({name: 'order', filters: {}, options: { label: 'recently_orders', add: false, search: false, deletes: false }})}
            </div>

        </div>

    )

}
