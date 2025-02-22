"use client";
import { api, alert_msg, date, print, fix_date, fix_number } from "@/public/script/main";
import { actions } from "@/public/script/store";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Elements from "@/components/elements";
import Icons from '@/components/icons';
import Loader from '@/components/loader';

export default function Info ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const _save_ = async() => {

        if ( !data.name ) return alert_msg(config.text.name_required, 'error');
        if ( !data.email ) return alert_msg(config.text.email_required, 'error');

        setLoader(true);
        const response = await api('account/save', data);
        setLoader(false);

        if ( response.user ) {
            const user = { ...response.user, token: config.user.token, logged: true, update: date() };
            setData({...data, ...user});
            dispatch(actions.toggle_user(user));
            alert_msg(config.text.account_successfully);
        }
        else if ( response.errors?.email ) alert_msg(config.text.email_exists, 'error');
        else alert_msg(config.text.alert_error, 'error');

    }
    useEffect(() => {
        document.title = `${config.text.information} | ${config.text.account}`;
    }, []);

    return (

        <div className={`flex justify-between xl:flex-row flex-col gap-5 ${config.animation} animate__animated`}>

            <div className="flex flex-col space-y-5 flex-1 cursor-default xl:w-[72%]">

                <div className="panel w-full relative">

                    { loader && <Loader className='bg'/> }

                    <h5 className="font-semibold text-lg mb-5 select-none dark:text-white-light/75">{config.text.general_information}</h5>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-y-7 pb-8">

                        <Elements element='input' type='text' name='name' value={data.name} onChange={(e) => setData({...data, name: e})}/>
                        <Elements element='input' type='email' name='email' value={data.email} onChange={(e) => setData({...data, email: e})}/>
                        <Elements element='input' type='phone' name='phone' value={data.phone} onChange={(e) => setData({...data, phone: e})}/>
                        <Elements element='input' type='number' name='age' value={data.age} onChange={(e) => setData({...data, age: e})}/>

                        <Elements element='select' type='language' name='language' value={data.language || 'ar'} onChange={(e) => setData({...data, language: e})}/>
                        <Elements element='select' type='currency' name='currency' value={data.currency || 'usd'} onChange={(e) => setData({...data, currency: e})}/>
                        <Elements element='select' type='country' name='country' value={data.country || 'EG'} onChange={(e) => setData({...data, country: e})}/>
                        <Elements element='input' type='text' name='city' value={data.city} onChange={(e) => setData({...data, city: e})}/>

                        <Elements element='input' type='d' name='device' value={data.ip} readOnly/>
                        <Elements element='input' type='d' name='last_login' value={fix_date(data.login_at)} readOnly/>

                    </div>

                </div>

            </div>

            <div className='flex flex-col space-y-5 select-none xl:w-[28%]'>

                <div className='panel'>

                    <div className="w-full flex justify-center items-center">
                        <Elements element='image_edit' value={data.image} onChange={(e) => setData({...data, image_file: e.file})} className='w-[10rem] h-[10rem]' type={'user'}/>
                    </div>

                </div>
                
                <div className="panel">

                    <h1 className='flex items-center opacity-[.8] select-none'>

                        <Icons icon='setting' className='dark:!text-white-light'/>

                        <span className='font-semibold text-[1.05rem] px-2 dark:text-white-light'>{config.text.invoice}</span>

                    </h1>

                    <Elements element='hr' className='my-7 mt-5'/>

                    <div className='grid grid-cols-2 gap-3 pb-2'>

                        <Elements element='save_button' onClick={_save_}/>
                        <Elements element='cancel_button'/>

                    </div>

                </div>

            </div>

        </div>

    )

}
