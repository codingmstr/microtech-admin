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

                        <Elements element='input' type='number' name='commission_amount' className='flex free-label' value={data.commission_amount} onChange={(e) => setData({...data, commission_amount: e})}/>
                        <Elements element='input' type='number' name='commission_percentage' className='flex free-label' value={data.commission_percentage} onChange={(e) => setData({...data, commission_percentage: e})}/>
                        <Elements element='input' type='number' name='referral_amount' className='flex free-label' value={data.referral_amount} onChange={(e) => setData({...data, referral_amount: e})}/>
                        <Elements element='input' type='number' name='referral_percentage' className='flex free-label' value={data.referral_percentage} onChange={(e) => setData({...data, referral_percentage: e})}/>

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
