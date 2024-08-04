"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Info from "./info";
import Content from "./content";
import Config from "./config";
import Payment from "./payment";
import Danger from "./danger";

export default function Settings () {

    const config = useSelector((state) => state.config);
    const [tab, setTab] = useState('info');
    const [data, setData] = useState({});
    const [payments, setPayments] = useState({});
    const [content, setContent] = useState({});

    const _get_ = async() => {

        // const reponse = await api('setting');

        const response = {
            status: true,
            payments: {
                paypal: {},
                paymob: {},
                hyper: {},
                stripe: {},
                paddle: {},
            },
            settings: {}
        }

        setData(response.settings || {});
        setPayments(response.payments || {});
        setContent(response.content || {});

    }
    useEffect(() => {
        
        _get_();

    }, []);

    return (

        <div className="w-full flex flex-col gap-5">

            <Elements element='tabs'>
                <li onClick={() => setTab('info')} className={`${tab === 'info' && 'active'}`}>
                    <Icons icon='information'/>
                    <span>{config.text.information}</span>
                </li>
                <li onClick={() => setTab('content')} className={`${tab === 'content' && 'active'}`}>
                    <Icons icon='content'/>
                    <span>{config.text.content_manager}</span>
                </li>
                <li onClick={() => setTab('payment')} className={`${tab === 'payment' && 'active'}`}>
                    <Icons icon='payment'/>
                    <span>{config.text.payment_details}</span>
                </li>
                <li onClick={() => setTab('config')} className={`${tab === 'config' && 'active'}`}>
                    <Icons icon='privacy'/>
                    <span>{config.text.configrations}</span>
                </li>
                <li onClick={() => setTab('danger')} className={`${tab === 'danger' && 'active'}`}>
                    <Icons icon='delete'/>
                    <span>{config.text.danger_zone}</span>
                </li>
            </Elements>

            { tab === 'info' && <Info data={data} setData={setData}/> }
            { tab === 'config' && <Config data={data} setData={setData}/> }
            { tab === 'danger' && <Danger data={data} setData={setData}/> }
            { tab === 'payment' && <Payment data={payments} setData={setPayments}/> }
            { tab === 'content' && <Content data={content} setData={setContent} setTab={setTab}/> }

        </div>

    )

}
