"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';
import Icons from '@/components/icons';

export default function Content ({ data, setData, setTab }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const _save_ = async() => {

        setLoader(true);
        const response = await api('setting/content', data);
        setLoader(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.content_updated);
        setTab('info');

    }
    return (

        <div className="w-full flex xl:flex-row flex-col gap-6 cursor-default">

            <div className="flex flex-col flex-1 gap-5 relative">

                { loader && <Loader className='bg'/> }

                <div className='panel relative pb-6'>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2 pb-2">

                        <Elements element='slider' name='header' label='header' value={data.header?.files || []} onChange={(e) => setData({...data, header: {...data.header || [], ...e}})}/>

                    </div>

                </div>
                <div className='panel relative pb-6'>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2">

                        <Elements element='editor' name='about_us' className='medium' value={data.about} onChange={(e) => setData({...data, about: e})}/>

                    </div>

                </div>
                <div className='panel relative pb-6'>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2">

                        <Elements element='editor' name='terms_policy' className='medium' value={data.terms} onChange={(e) => setData({...data, terms: e})}/>

                    </div>

                </div>
                <div className='panel relative pb-6'>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2">

                        <Elements element='editor' name='terms_policy' className='medium' value={data.terms} onChange={(e) => setData({...data, terms: e})}/>

                    </div>

                </div>

            </div>

            <div className='flex flex-col gap-5 xl:w-[28%]'>

                <div className='panel'>
                        
                    <h6 className="text-lg -mt-[3px] font-semibold mb-4 select-none">{config.text.logo}</h6>

                    <div className="w-full grid grid-cols-1">

                        <Elements element='image_edit' name='logo' className='h-[11rem]' type='md' value={data.logo} onChange={(e) => setData({...data, logo_file: e})}/>

                    </div>
                
                </div>

                <div className="panel">

                    <h1 className='flex items-center opacity-[.8] select-none'>

                        <Icons icon='setting'/>

                        <span className='font-semibold text-[.95rem] px-2'>{config.text.invoice}</span>

                    </h1>

                    <Elements element='hr' className='my-7 mt-5'/>

                    <div className='grid grid-cols-2 gap-4 pb-2'>

                        <Elements element='save_button' onClick={_save_}/>
                        <Elements element='cancel_button' onClick={() => setTab('info')}/>

                    </div>

                </div>

            </div>

        </div>

    )

}
