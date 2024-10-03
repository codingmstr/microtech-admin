"use client";
import { api, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Info from "./info";
import Config from "./config";
import Danger from "./danger";

export default function Settings () {

    const config = useSelector((state) => state.config);
    const [tab, setTab] = useState('info');
    const [data, setData] = useState({});

    const _get_ = async() => {

        const response = await api('setting');
        setData(response.settings || {});

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

        </div>

    )

}
