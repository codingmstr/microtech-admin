"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';
import Icons from '@/components/icons';

export default function Payment ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const [cols, setCols] = useState(2);
    const [currencies, setCurrencies] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [modes, setModes] = useState([]);
    const [paypal, setPaypal] = useState(data.paypal || {});
    const [paymob, setPaymob] = useState(data.paymob || {});
    const [hyper, setHyper] = useState(data.hyper || {});
    const [stripe, setStripe] = useState(data.stripe || {});
    const [paddle, setPaddle] = useState(data.paddle || {});
    const [loader1, setLoader1] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [loader3, setLoader3] = useState(false);
    const [loader4, setLoader4] = useState(false);
    const [loader5, setLoader5] = useState(false);

    const save_paypal = async() => {

        setLoader1(true);
        const response = await api(`setting/payment/${paypal.id}/save`, paypal);
        setLoader1(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);
        setData({...data, paypal: paypal});

    }
    const save_paymob = async() => {

        setLoader2(true);
        const response = await api(`setting/payment/${paymob.id}/save`, paymob);
        setLoader2(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);
        setData({...data, paymob: paymob});

    }
    const save_hyper = async() => {

        setLoader3(true);
        const response = await api(`setting/payment/${hyper.id}/save`, hyper);
        setLoader3(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);
        setData({...data, hyper: hyper});

    }
    const save_stripe = async() => {

        setLoader4(true);
        const response = await api(`setting/payment/${stripe.id}/save`, stripe);
        setLoader4(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);
        setData({...data, stripe: stripe});

    }
    const save_paddle = async() => {

        setLoader5(true);
        const response = await api(`setting/payment/${paddle.id}/save`, paddle);
        setLoader5(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');
        alert_msg(config.text.payment_updated);
        setData({...data, paddle: paddle});

    }
    useEffect(() => {

        let _currencies_ = [
            {id: 'EGP', name: 'EGP'},
            {id: 'USD', name: 'USD'},
            {id: 'EUR', name: 'EUR'},
        ];
        let _languages_ = [
            {id: 'AR', name: 'Arabic'},
            {id: 'EN', name: 'English'},
            {id: 'FR', name: 'French'},
        ];
        let _modes_ = [
            {id: 'sandbox', name: 'Sandbox'},
            {id: 'live', name: 'Live'},
        ]

        setCurrencies(_currencies_);
        setLanguages(_languages_);
        setModes(_modes_);

    }, []);

    return (

        <div className="w-full flex xl:flex-row flex-col gap-6 cursor-default">

            <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols} gap-5`}>

                <div className="panel relative w-full">

                    { loader1 && <Loader className="bg"/> }

                    <h6 className="text-lg font-semibold select-none flex justify-between items-center">
                        <span>{config.text.paypal}</span>
                        <Elements element='toggle' name='paypal_active' value={paypal.active} onChange={(e) => setPaypal({...paypal, active: e})}/>
                    </h6>

                    <Elements element='hr' className='mt-5 mb-8'/>

                    <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols === 3 ? '1' : '2'} gap-6`}>

                        <Elements element='select' className='flex gap-4' name='paypal_mode' label='mode' value={paypal.mode} onChange={(e) => setPaypal({...paypal, mode: e})} children={modes}/>
                        <Elements element='input' className='flex gap-4' name='paypal_client_id' label='client_id' value={paypal.client_id} onChange={(e) => setPaypal({...paypal, client_id: e})}/>
                        <Elements element='input' className='flex gap-4' name='paypal_client_secret' label='client_secret' value={paypal.client_secret} onChange={(e) => setPaypal({...paypal, client_secret: e})}/>
                        <Elements element='select' className='flex gap-4' name='paypal_language' label='language' value={paypal.language} onChange={(e) => setPaypal({...paypal, language: e})} children={languages}/>
                        <Elements element='select' className='flex gap-4' name='paypal_currency' label='currency' value={paypal.currency} onChange={(e) => setPaypal({...paypal, currency: e})} children={currencies}/>

                    </div>

                    <Elements element='hr' className='mt-8 mb-5'/>

                    <div className='w-full flex justify-end items-center gap-4 py-1'>
                        <button onClick={save_paypal} className="btn btn-primary shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                        <button onClick={() => setPaypal(data.paypal || {})} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.cancel}</button>
                    </div>

                </div>
                <div className="panel relative w-full">

                    { loader2 && <Loader className="bg"/> }

                    <h6 className="text-lg font-semibold select-none flex justify-between items-center">
                        <span>{config.text.paymob}</span>
                        <Elements element='toggle' name='paymob_active' value={paymob.active} onChange={(e) => setPaymob({...paymob, active: e})}/>
                    </h6>

                    <Elements element='hr' className='mt-5 mb-8'/>

                    <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols === 3 ? '1' : '2'} gap-6`}>

                        <Elements element='select' className='flex gap-4' name='paymob_mode' label='mode' value={paymob.mode} onChange={(e) => setPaymob({...paymob, mode: e})} children={modes}/>
                        <Elements element='input' className='flex gap-4' name='paymob_app_id' label='app_id' value={paymob.app_id} onChange={(e) => setPaymob({...paymob, app_id: e})}/>
                        <Elements element='input' className='flex gap-4' name='paymob_frame_id' label='frame_id' value={paymob.frame_id} onChange={(e) => setPaymob({...paymob, frame_id: e})}/>
                        <Elements element='input' className='flex gap-4' name='paymob_api_key' label='api_key' value={paymob.api_key} onChange={(e) => setPaymob({...paymob, api_key: e})}/>
                        <Elements element='input' className='flex gap-4' name='paymob_hmac_secret' label='hmac_secret' value={paymob.hmac_secret} onChange={(e) => setPaymob({...paymob, hmac_secret: e})}/>

                    </div>

                    <Elements element='hr' className='mt-8 mb-5'/>

                    <div className='w-full flex justify-end items-center gap-4 py-1'>
                        <button onClick={save_paymob} className="btn btn-primary shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                        <button onClick={() => setPaymob(data.paymob || {})} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.cancel}</button>
                    </div>

                </div>
                <div className="panel relative w-full">

                    { loader3 && <Loader className="bg"/> }

                    <h6 className="text-lg font-semibold select-none flex justify-between items-center">
                        <span>{config.text.hyper}</span>
                        <Elements element='toggle' name='hyper_active' value={hyper.active} onChange={(e) => setHyper({...hyper, active: e})}/>
                    </h6>

                    <Elements element='hr' className='mt-5 mb-8'/>

                    <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols === 3 ? '1' : '2'} gap-6`}>

                        <Elements element='select' className='flex gap-4' name='hyper_mode' label='mode' value={hyper.mode} onChange={(e) => setHyper({...hyper, mode: e})} children={modes}/>
                        <Elements element='input' className='flex gap-4' name='hyper_app_id' label='app_id' value={hyper.app_id} onChange={(e) => setHyper({...hyper, app_id: e})}/>
                        <Elements element='input' className='flex gap-4' name='hyper_api_key' label='api_key' value={hyper.api_key} onChange={(e) => setHyper({...hyper, api_key: e})}/>
                        <Elements element='input' className='flex gap-4' name='hyper_access_token' label='access_token' value={hyper.access_token} onChange={(e) => setHyper({...hyper, access_token: e})}/>
                        <Elements element='select' className='flex gap-4' name='hyper_currency' label='currency' value={hyper.currency} onChange={(e) => setHyper({...hyper, currency: e})} children={currencies}/>

                    </div>

                    <Elements element='hr' className='mt-8 mb-5'/>

                    <div className='w-full flex justify-end items-center gap-4 py-1'>
                        <button onClick={save_hyper} className="btn btn-primary shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                        <button onClick={() => setHyper(data.hyper || {})} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.cancel}</button>
                    </div>

                </div>
                <div className="panel relative w-full">

                    { loader4 && <Loader className="bg"/> }

                    <h6 className="text-lg font-semibold select-none flex justify-between items-center">
                        <span>{config.text.stripe}</span>
                        <Elements element='toggle' name='stripe_active' value={stripe.active} onChange={(e) => setStripe({...stripe, active: e})}/>
                    </h6>

                    <Elements element='hr' className='mt-5 mb-8'/>

                    <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols === 3 ? '1' : '2'} gap-6`}>

                        <Elements element='select' className='flex gap-4' name='stripe_mode' label='mode' value={stripe.mode} onChange={(e) => setStripe({...stripe, mode: e})} children={modes}/>
                        <Elements element='input' className='flex gap-4' name='stripe_api_key' label='api_key' value={stripe.api_key} onChange={(e) => setStripe({...stripe, api_key: e})}/>
                        <Elements element='input' className='flex gap-4' name='stripe_secret_key' label='secret_key' value={stripe.secret_key} onChange={(e) => setStripe({...stripe, secret_key: e})}/>
                        <Elements element='select' className='flex gap-4' name='stripe_language' label='language' value={stripe.language} onChange={(e) => setStripe({...stripe, language: e})} children={languages}/>
                        <Elements element='select' className='flex gap-4' name='stripe_currency' label='currency' value={stripe.currency} onChange={(e) => setStripe({...stripe, currency: e})} children={currencies}/>

                    </div>

                    <Elements element='hr' className='mt-8 mb-5'/>

                    <div className='w-full flex justify-end items-center gap-4 py-1'>
                        <button onClick={save_stripe} className="btn btn-primary shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                        <button onClick={() => setStripe(data.stripe || {})} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.cancel}</button>
                    </div>

                </div>
                <div className="panel relative w-full">

                    { loader5 && <Loader className="bg"/> }

                    <h6 className="text-lg font-semibold select-none flex justify-between items-center">
                        <span>{config.text.paddle}</span>
                        <Elements element='toggle' name='paddle_active' value={paddle.active} onChange={(e) => setPaddle({...paddle, active: e})}/>
                    </h6>

                    <Elements element='hr' className='mt-5 mb-8'/>

                    <div className={`w-full grid grid-cols-1 sm:grid-cols-${cols === 3 ? '1' : '2'} gap-6`}>

                        <Elements element='select' className='flex gap-4' name='paddle_mode' label='mode' value={paddle.mode} onChange={(e) => setPaddle({...paddle, mode: e})} children={modes}/>
                        <Elements element='input' className='flex gap-4' name='paddle_api_key' label='api_key' value={paddle.api_key} onChange={(e) => setPaddle({...paddle, api_key: e})}/>
                        <Elements element='input' className='flex gap-4' name='paddle_secret_key' label='secret_key' value={paddle.secret_key} onChange={(e) => setPaddle({...paddle, secret_key: e})}/>
                        <Elements element='select' className='flex gap-4' name='paddle_language' label='language' value={paddle.language} onChange={(e) => setPaddle({...paddle, language: e})} children={languages}/>
                        <Elements element='select' className='flex gap-4' name='paddle_currency' label='currency' value={paddle.currency} onChange={(e) => setPaddle({...paddle, currency: e})} children={currencies}/>

                    </div>

                    <Elements element='hr' className='mt-8 mb-5'/>

                    <div className='w-full flex justify-end items-center gap-4 py-1'>
                        <button onClick={save_paddle} className="btn btn-primary shadow-none hover:opacity-[.8] w-[7rem]">{config.text.save}</button>
                        <button onClick={() => setPaddle(data.paddle || {})} className="btn btn-danger shadow-none hover:opacity-[.8] w-[7rem]">{config.text.cancel}</button>
                    </div>

                </div>
          
            </div>
            
        </div>

    )

}
