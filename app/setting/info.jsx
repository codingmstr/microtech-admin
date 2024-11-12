"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';
import Icons from '@/components/icons';

export default function Info ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const _save_ = async() => {

        setLoader(true);
        const response = await api('setting/update', data);
        setLoader(false);

        if ( !response.status ) alert_msg(config.text.alert_error, 'error');
        else alert_msg(config.text.system_updated);

    }
    useEffect(() => {
        document.title = `${config.text.information} | ${config.text.settings}`;
    }, []);

    return (

        <div className={`w-full flex xl:flex-row flex-col gap-6 cursor-default ${config.animation} animate__animated`}>

            <div className="flex flex-col flex-1 gap-5">

                <div className='panel relative pb-6'>

                    { loader && <Loader className="bg"/> }
                
                    <h6 className="text-lg font-semibold mb-5 select-none dark:!text-white-light/75">{config.text.information}</h6>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 px-2">

                        <Elements element='input' type='text' name='name' className='flex' value={data.name} onChange={(e) => setData({...data, name: e})}/>
                        <Elements element='select' type='language' className='flex' name='language' value={data.language} onChange={(e) => setData({...data, language: e})}/>
                        <Elements element='input' type='text' name='email' className='flex' value={data.email} onChange={(e) => setData({...data, email: e})}/>
                        <Elements element='select' type='currency' className='flex' name='currency' value={data.currency} onChange={(e) => setData({...data, currency: e})}/>
                        <Elements element='input' type='text' name='phone' className='flex' value={data.phone} onChange={(e) => setData({...data, phone: e})}/>

                    </div>

                    <Elements element='hr' className='my-7'/>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 px-2">

                        <Elements element='select' type='country' name='country' className='flex' value={data.country} onChange={(e) => setData({...data, country: e})}/>
                        <Elements element='input' type='text' name='city' className='flex' value={data.city} onChange={(e) => setData({...data, city: e})}/>
                        <Elements element='input' type='text' name='street' className='flex' value={data.street} onChange={(e) => setData({...data, street: e})}/>
                        <Elements element='input' type='text' name='location' className='flex' value={data.location} onChange={(e) => setData({...data, location: e})}/>
                        <Elements element='input' type='text' name='code' className='flex' value={data.code} onChange={(e) => setData({...data, code: e})}/>

                    </div>

                    <Elements element='hr' className='my-7'/>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 px-2">

                        <Elements element='input' type='text' name='whatsapp' className='flex' value={data.whatsapp} onChange={(e) => setData({...data, whatsapp: e})}/>
                        <Elements element='input' type='text' name='telegram' className='flex' value={data.telegram} onChange={(e) => setData({...data, telegram: e})}/>
                        <Elements element='input' type='text' name='twitter' className='flex' value={data.twitter} onChange={(e) => setData({...data, twitter: e})}/>
                        <Elements element='input' type='text' name='facebook' className='flex' value={data.facebook} onChange={(e) => setData({...data, facebook: e})}/>
                        <Elements element='input' type='text' name='instagram' className='flex' value={data.instagram} onChange={(e) => setData({...data, instagram: e})}/>
                        <Elements element='input' type='text' name='linkedin' className='flex' value={data.linkedin} onChange={(e) => setData({...data, linkedin: e})}/>
                        <Elements element='input' type='text' name='youtube' className='flex' value={data.youtube} onChange={(e) => setData({...data, youtube: e})}/>
                    
                    </div>

                </div>

            </div>

            <div className='flex flex-col xl:w-[28%]'>

                <div className='space-y-5 select-none sticky top-[1.5rem]'>

                    <div className="panel">

                        <h1 className='flex items-center opacity-[.8] select-none'>

                            <Icons icon='setting' className='dark:!text-white-light'/>

                            <span className='font-semibold text-[1.05rem] px-2 dark:text-white-light'>{config.text.invoice}</span>

                        </h1>

                        <Elements element='hr' className='my-7 mt-5'/>

                        <div className='grid grid-cols-2 gap-4 pb-2'>

                            <Elements element='save_button' onClick={_save_}/>
                            <Elements element='cancel_button'/>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
