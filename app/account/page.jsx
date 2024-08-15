"use client";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from "@/components/elements";
import Icons from '@/components/icons';
import Info from "./info";
import Password from "./password";
import Activity from "./activity";

export default function Account () {

    const config = useSelector((state) => state.config);
    const [tab, setTab] = useState('info');
    const [data, setData] = useState(config.user);

    return (

        <div className="w-full flex flex-col gap-5">

            <Elements element='tabs'>
                <li onClick={() => setTab('info')} className={`${tab === 'info' && 'active'}`}>
                    <Icons icon='information'/>
                    <span>{config.text.information}</span>
                </li>
                <li onClick={() => setTab('password')} className={`${tab === 'password' && 'active'}`}>
                    <Icons icon='lock'/>
                    <span>{config.text.passwords}</span>
                </li>
                <li onClick={() => setTab('activity')} className={`${tab === 'activity' && 'active'}`}>
                    <Icons icon='setting'/>
                    <span>{config.text.activity_logs}</span>
                </li>
            </Elements>

            { tab === 'info' && <Info data={data} setData={setData}/> }
            { tab === 'password' && <Password data={data} setData={setData} setTab={setTab}/> }
            { tab === 'activity' && <Activity data={data} setData={setData}/> }

        </div>

    )

}
