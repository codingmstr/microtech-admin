"use client";
import { api, alert_msg, fix_files, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';
import Icons from '@/components/icons';

export default function Content ({ data, setData, setTab }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const _save_ = async() => {

        setLoader(true);
        const response = await api('setting/content', {...data, ...fix_files(data)});
        setLoader(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.content_updated);
        setData({...data, new_files: null, deleted_files: null, slider: {files: data.slider?.files || []}});
        setTab('info');
        
    }
    useEffect(() => {
        document.title = `${config.text.content_manager} | ${config.text.settings}`;
    }, []);

    return (

        <div className="w-full flex xl:flex-row flex-col gap-6 cursor-default min-h-[calc(100vh_-_150px)]">

            <div className="flex flex-1">
                {
                    loader ? <div className="w-full h-[40rem] relative"><Loader className='bg'/></div> :
                    <div className="w-full grid grid-cols-1 gap-5">

                        <div className='panel relative pb-6'>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2 pb-2">
                                <Elements element='slider' name='hero_section' value={data.hero || []} slider={data.slider} onChange={(e) => setData({...data, slider: e, ...e})}/>
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
                                <Elements element='editor' name='cancellation_policy' className='medium' value={data.policy} onChange={(e) => setData({...data, policy: e})}/>
                            </div>
                        </div>
                        <div className='panel relative pb-6'>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2">
                                <Elements element='editor' name='services' className='medium' value={data.services} onChange={(e) => setData({...data, services: e})}/>
                            </div>
                        </div>
                        <div className='panel relative pb-6'>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-y-6 gap-x-10 px-2">
                                <Elements element='editor' name='help_page' className='medium' value={data.help} onChange={(e) => setData({...data, help: e})}/>
                            </div>
                        </div>

                    </div>
                }
            </div>

            <div className='flex flex-col gap-5 xl:w-[28%]'>

                <div className='panel'>
                        
                    <h6 className="text-[1rem] -mt-[3px] font-semibold mb-4 select-none dark:text-white-light/75">{config.text.logo}</h6>

                    <div className="w-full grid grid-cols-1">
                        <Elements element='image_edit' name='logo' className='h-[11rem]' type='md' value={data.logo} onChange={(e) => setData({...data, logo_file: e.file})}/>
                    </div>
                
                </div>

                <div className="panel">

                    <h1 className='flex items-center opacity-[.8] select-none'>

                        <Icons icon='setting' className='dark:!text-white-light'/>

                        <span className='font-semibold text-[.95rem] px-2 dark:text-white-light'>{config.text.invoice}</span>

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
