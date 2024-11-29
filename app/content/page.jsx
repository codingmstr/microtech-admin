"use client";
import { api, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Info from "./info";
import Pages from "./pages";

export default function Content () {

    const config = useSelector((state) => state.config);
    const [tab, setTab] = useState('info');
    const [data, setData] = useState({});

    const _get_ = async() => {

        const response = await api('content');
        setData(response.content || {});

    }
    useEffect(() => {
        
        _get_();

    }, []);

    return (

        <div className="w-full flex flex-col gap-5">

            <Elements element='page_title' label='content_manager' name='content_manager'/>

            <Elements element='tabs'>
                <li onClick={() => setTab('info')} className={`${tab === 'info' && 'active'}`}>
                    <Icons icon='information'/>
                    <span>{config.text.information}</span>
                </li>
                <li onClick={() => setTab('pages')} className={`${tab === 'pages' && 'active'}`}>
                    <Icons icon='setting'/>
                    <span>{config.text.pages}</span>
                </li>
            </Elements>

            { tab === 'info' && <Info data={data} setData={setData}/> }
            { tab === 'pages' && <Pages data={data} setData={setData}/> }

        </div>

    )

}
