"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from "@/components/elements";
import Loader from '@/components/loader';

export default function Password ({ setTab }) {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);

    const _save_ = async() => {

        if ( data.password !== data.password_confirmation ) return alert_msg(config.text.password_not_match, 'error');
        setLoader(true);
        const response = await api('account/password', data);
        setLoader(false);

        if ( response.status ) {
            alert_msg(config.text.password_successfully);
            setTab('info');
        }
        else if ( response.errors?.password ) alert_msg(config.text.error_password_old, 'error');
        else alert_msg(config.text.alert_error, 'error');

    }
    useEffect(() => {
        document.title = `${config.text.change_password} | ${config.text.account}`;
    }, []);

    return (

        <div className="flex justify-center items-start xl:flex-row flex-col gap-5">

            <div className="panel flex flex-col relative cursor-default w-full xl:w-[40%]">

                { loader && <Loader className='bg'/> }

                <h5 className="flex justify-start gap-4 items-center font-semibold text-lg mb-6 select-none dark:text-white-light/75">
                    {config.text.change_password}
                </h5>

                <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-8 pt-6 pb-2">

                    <Elements element='password' name='old_password' className='flex free-label' visible value={data.old_password} onChange={(e) => setData({...data, old_password: e})}/>
                    <Elements element='password' name='new_password' className='flex free-label' visible value={data.password} onChange={(e) => setData({...data, password: e})}/>
                    <Elements element='password' name='confirm_password' className='flex free-label' visible value={data.password_confirmation} onChange={(e) => setData({...data, password_confirmation: e})}/>
                    <Elements element='hr' className='my-5 mb-0'/>

                    <div className="flex justify-end items-center gap-4">
                        <Elements onClick={_save_} element='save_button' className='min-w-[8rem]'/>
                        <Elements onClick={() => setTab('info')} element='cancel_button' className='min-w-[8rem] bg-danger border-danger'/>
                    </div>

                </div>

            </div>

        </div>

    )

}
