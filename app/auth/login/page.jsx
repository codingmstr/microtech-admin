"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@/public/script/store';
import { api, date, alert_msg } from "@/public/script/main";
import Loader from "@/components/loader";
import Link from "next/link";

export default function Login () {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);

    const submit = async() => {

        setLoader(true);
        const response = await api('auth/login', data);

        if ( response.user && response.token ) {
            dispatch( actions.toggle_user({ ...response.user, token: response.token, logged: true, update: date() }) );
            dispatch( actions.toggle_loader(true) );
            router.replace('/');
        }
        else if ( response.errors ) {

            if ( response.errors.email ) {
                setLoader(false);
                alert_msg(config.text.error_email, 'error');
            }
            else if ( response.errors.password ) {
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
        document.title = config.text.login;

    }, []);

    return (

        <div className="flex items-center justify-center w-full h-[100vh] bg-[url('/media/layout/map.svg')] bg-full bg-center bg-no-repeat dark:bg-[url('/media/layout/map-dark.svg')]">
            
            <div className="panel relative w-full max-w-[400px] sm:w-[480px] select-none overflow-hidden">

                { loader && <Loader className='bg max-h-full'/> }

                <h2 className="mb-2 text-2xl font-bold">{config.text.login}</h2>

                <p className="mb-7">{config.text.enter_to_login}</p>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submit(); }}>

                    <div>
                        <label htmlFor="email" className='mb-3'>{config.text.email}</label>
                        <input id="email" type="email" value={data.email || ''} onChange={(e) => setData({...data, email: e.target.value})} required className="form-input" autoComplete='off'/>
                    </div>
                        
                    <div>
                        <label htmlFor="password" className='mb-3'>{config.text.password}</label>
                        <input id="password" type="password" value={data.password || ''} onChange={(e) => setData({...data, password: e.target.value})} required className="form-input" autoComplete='off'/>
                    </div>

                    <div className='py-1'>
                        <label className="cursor-pointer flex">
                            <input type="checkbox" className="form-checkbox" required checked={data.agree || false} onChange={(e) => setData({...data, agree: !data.agree})}/>
                            <span className="text-white-dark px-2 pt-[.5px]">
                                {config.text.agree_terms}
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-full h-[2.8rem] text-[.95rem]">{config.text.login}</button>

                </form>

                <div className="relative my-7 mb-4 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                    
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
