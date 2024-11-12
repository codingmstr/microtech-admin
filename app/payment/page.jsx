"use client";
import { api, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Loader from "@/components/loader";
import Card from "./card";

export default function Payment () {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState([]);
    const [tab, setTab] = useState('stripe');
    const [loader, setLoader] = useState(true);
    const [selected, setSelected] = useState({});

    const _get_ = async() => {

        const response = await api('payment');
        setData(response.payments || []);
        setLoader(false);

    }
    useEffect(() => {

        setLoader(true);
        setSelected(data.find(_ => _.name === tab) || {});
        setTimeout(() => setLoader(false), 500);

    }, [tab, data]);
    useEffect(() => {

        _get_();
        document.title = config.text.payments;

    }, []);

    return (

        <div className="w-full space-y-5">

            <Elements element='page_title' label='payment_details' name='payment_details'/>

            {
                data.length ?
                <div className="w-full space-y-5">

                    <Elements element='tabs'>
                        {
                            data.map((item, index) => 
                                <li key={index} onClick={() => setTab(item.name)} className={`${tab === item.name && 'active'}`}>
                                    <Icons icon='payment'/>
                                    <span>{config.text[item.name]}</span>
                                </li>
                            )
                        }
                    </Elements> 

                    <div className='w-full cursor-default min-h-[60vh] relative'>
                        {
                            loader ? <Loader /> :
                            <div className={`w-full h-full flex justify-center items-center ${config.animation} animate__animated`}>
                                <Card payment={selected}/>
                            </div>
                        }
                    </div>

                </div>
                : ''
            }

            {/* <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6 cursor-default min-h-[60vh] relative'>
                { loader && <Loader /> }
                { data.map((item, index) => <Card key={index} payment={item}/>) }
            </div> */}

        </div>

    )

}
