"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@/public/script/store';
import { api, date, alert_msg, storage } from "@/public/script/main";
import Loader from "@/components/loader";
import Link from "next/link";

export default function Unlock () {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const router = useRouter();
    const input = useRef(null);
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);

    const submit = async() => {

        setLoader(true);
        const response = await api('auth/unlock', data);

        if ( response.user && response.token ) {
            dispatch( actions.toggle_user({ ...response.user, token: response.token, logged: true, update: date() }) );
            dispatch( actions.toggle_loader(true) );
            router.replace('/');
        }
        else if ( response.errors ) {

            if ( response.errors.password ) {
                setLoader(false);
                alert_msg(config.text.error_password, 'error');
            }

        }
        else {
            setLoader(false);
            alert_msg(config.text.alert_error, 'error');
        }

    }
    useEffect(() => {

        dispatch( actions.toggle_loader(false) );
        setTimeout(_ => input.current?.focus(), 100);
        document.title = `${config.text.lockscreen} | ${config.user.name || ''}`;

    }, []);

    return (

        <div className="flex items-center justify-center w-full h-[100vh] bg-[url('/media/layout/map.svg')] bg-full bg-center bg-no-repeat dark:bg-[url('/media/layout/map-dark.svg')]">
        
            <div className="panel relative w-full max-w-[400px] sm:w-[480px] select-none overflow-hidden">

                { loader && <Loader className='bg max-h-full'/> }

                <div className="mb-7 flex items-start">

                    <div className="ltr:mr-4 rtl:ml-4 layer-div mt-[3px]">

                        <img src={`${storage}/${config.user.image}`} className="h-12 w-12 rounded-full object-cover"/>

                    </div>

                    <div className="flex-1">

                        <h4 className="text-xl mb-1">{config.user.name || ''}</h4>

                        <p>{config.text.unlock_screen}</p>

                    </div>

                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); submit(); }}>

                    <div>
                        <label htmlFor="password" className='mb-3'>{config.text.password}</label>
                        <input id="password" type="password" ref={input} value={data.password || ''} onChange={(e) => setData({...data, password: e.target.value})} className="form-input" required autoComplete='off'/>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">{config.text.unlock}</button>

                </form>

                <div className="relative my-6 mb-4 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                    
                    <div className="relative z-[1] inline-block bg-panel px-2 font-bold text-white-dark dark:bg-panel-dark">
                        <span>{config.text.or}</span>
                    </div>

                </div>

                <p className="text-left my-2 rtl:text-right">
                    {config.text.forgot_password}
                    <Link href="tel:+201099188572" className="text-primary hover:underline ltr:ml-2 rtl:mr-2">{config.text.call_us}</Link>
                </p>

            </div>

        </div>

    )

}
