"use client";
import { api, alert_msg, capitalize, parse, print } from "@/public/script/main";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';

export default function Card ({ payment }) {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState(payment || {});
    const [loader, setLoader] = useState(false);

    const _update_ = async() => {

        setLoader(true);
        const response = await api(`payment/update`, data);
        setLoader(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);

    }
    const _delete_ = async() => {

        setLoader(true);
        const response = await api(`payment/delete`, data);
        setLoader(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        setData({name: data.name, fields: data.fields});
        alert_msg(config.text.payment_deleted);

    }
    return (

        <div className="panel relative">

            { loader && <Loader className="bg"/> }

            <h6 className="text-lg font-semibold select-none flex justify-between items-center dark:text-white-light/75">
                <span>{config.text[data.name]}</span>
                <Elements element='toggle' name={`${data.name}_active`} value={data.active} onChange={(e) => setData({...data, active: e})}/>
            </h6>

            <Elements element='hr' className='mt-5 mb-8'/>

            <div className={`w-full grid grid-cols-1 sm:grid-cols-1 gap-6`}>
                {
                    parse(data.fields).map((item, index) =>
                        <Elements 
                            key={index} element='password' className='flex free-label' 
                            name={`${data.name}_${item}`} label={capitalize(item.replace('_', ' '))} 
                            no_translate 
                            value={data[item]} 
                            onChange={(e) => {
                                let _data_ = data;
                                _data_[item] = e;
                                setData({..._data_});
                            }}
                        />
                    )
                }
            </div>

            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8`}>
              
                <Elements element='input' type='number' className='flex' name='tax' label='tax_percent' value={data.tax} onChange={(e) => setData({...data, tax: e})}/>
                <Elements element='select' type='currency' className='flex' name='currency' value={data.currency} onChange={(e) => setData({...data, currency: e})}/>
                <Elements element='select' type='baseLanguage' className='flex' name='language' value={data.language} onChange={(e) => setData({...data, language: e})}/>
                <Elements element='select' type='country' className='flex' name='country' value={data.country} onChange={(e) => setData({...data, country: e})}/>

            </div>

            <Elements element='hr' className='mt-8 mb-5'/>

            <div className='w-full flex justify-end items-center gap-3 py-1'>
                <button onClick={_update_} className="btn btn-success shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                <button onClick={_delete_} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.delete}</button>
            </div>

        </div>

    )

}
