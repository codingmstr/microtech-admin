"use client";
import { api, alert_msg, fix_number, print } from '@/public/script/main';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Elements from './elements';
import Model from './model';
import Icons from './icons';
import Loader from './loader';

export default function Wallet ({ system, id }) {

    const config = useSelector((state) => state.config);
    const ref = useRef(null);
    const [max, setMax] = useState(100000);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState('');
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);
    const [mailLoader, setMailLoader] = useState(true);
    const [error, setError] = useState(false);
    const [model, setModel] = useState(false);
    const [model1, setModel1] = useState(false);
    const [model2, setModel2] = useState(false);
    const [type, setType] = useState('withdraw');
    const [from, setFrom] = useState('pending');
    const [to, setTo] = useState('withdraw');

    const _get_ = async() => {

        const response = await api(`${system}/${id}/wallet`);
        setData(response.wallet || {});
        setMailLoader(false);

    }
    const _deposit_ = async() => {

        ref.current?.focus();
        if ( !parseFloat(amount) || error ) return alert_msg(config.text.amount_error, 'error');

        setLoader(true);
        const response = await api(`${system}/${id}/wallet/deposit`, { type: type, amount: parseFloat(amount) });

        if ( response.wallet ) {

            setData(response.wallet);
            alert_msg(config.text.money_added);
            setModel(false);

        }
        else {
            alert_msg(config.text.alert_error, 'error');
            setLoader(false);
        }

    }
    const _withdraw_ = async() => {

        ref.current?.focus();
        if ( !parseFloat(amount) || error ) return alert_msg(config.text.amount_error, 'error');

        setLoader(true);
        const response = await api(`${system}/${id}/wallet/withdraw`, { type: type, amount: parseFloat(amount) });

        if ( response.wallet ) {

            setData(response.wallet);
            alert_msg(config.text.money_withdrawed);
            setModel1(false);

        }
        else {
            alert_msg(config.text.alert_error, 'error');
            setLoader(false);
        }

    }
    const _convert_ = async() => {

        ref.current?.focus();
        if ( !parseFloat(amount) || error ) return alert_msg(config.text.amount_error, 'error');

        setLoader(true);
        const response = await api(`${system}/${id}/wallet/convert`, { from: from, to: to, amount: parseFloat(amount) });

        if ( response.wallet ) {

            setData(response.wallet);
            alert_msg(config.text.money_converted);
            setModel2(false);

        }
        else {
            alert_msg(config.text.alert_error, 'error');
            setLoader(false);
        }

    }
    const max_limit = () => {

        const balance_type = model2 ? from : type;

        if ( balance_type === 'pending' ) setAmount(data.pending_balance);
        else if ( balance_type === 'buy' ) setAmount(data.buy_balance);
        else if ( balance_type === 'withdraw' ) setAmount(data.withdraw_balance);

    }
    const check_limit = () => {
        
        if ( model ) {
            if ( parseFloat(amount) > max ) return setError(true);
            return setError(false);
        }

        const balance_type = model2 ? from : type;
        if ( balance_type === 'pending' && parseFloat(amount) > data.pending_balance ) return setError(true);
        else if ( balance_type === 'buy' && parseFloat(amount) > data.buy_balance ) return setError(true);
        else if ( balance_type === 'withdraw' && parseFloat(amount) > data.withdraw_balance ) return setError(true);
        setError(false);

    }
    useEffect(() => {

        ref.current?.focus();
        check_limit();

    }, [amount, type, from, to]);
    useEffect(() => {

        setAmount('');
        setError(false);
        setLoader(false);
        setType('withdraw');
        setFrom('pending');
        setTo('withdraw');
        setTimeout(_ => ref.current?.focus(), 100);

    }, [model, model1, model2]);
    useEffect(() => {

        setTotal(parseFloat(data.pending_balance) + parseFloat(data.buy_balance) + parseFloat(data.withdraw_balance));

    }, [data]);
    useEffect(() => {

        _get_();

    }, []);

    return (

        <div className='w-full relative'>

            { mailLoader && <Loader className='bg medium'/> }

            <div className='dark:text-white-light/75 mt-2 mb-10 flex items-center gap-3'>
                <span className='material-symbols-outlined text-[1.4rem]'>account_balance_wallet</span>
                <span className='text-[1.15rem] font-bold'>{ config.text[`${system}_wallet`] }</span>
            </div>
            
            <div className='w-full'>

                <div className="w-full grid grid-cols-2 gap-x-[2.5rem] gap-y-7">

                    <Elements element='input' type='text_number' name='all_deposits' value={fix_number(data.deposits, true)} readOnly className='flex free-label'/>
                    <Elements element='input' type='text_number' name='all_withdraws' value={fix_number(data.withdraws, true)} readOnly className='flex free-label'/>
                    <Elements element='input' type='text_number' name='pending_balance' value={fix_number(data.pending_balance, true)} readOnly className='flex free-label'/>
                    <Elements element='input' type='text_number' name='buy_balance' value={fix_number(data.buy_balance, true)} readOnly className='flex free-label'/>
                    <Elements element='input' type='text_number' name='withdraw_balance' value={fix_number(data.withdraw_balance, true)} readOnly className='flex free-label'/>
                    <Elements element='input' type='text_number' name='total_balance' value={fix_number(total, true)} readOnly className='flex free-label'/>

                </div>

                <Elements element="hr"/>

                <div className='w-full flex justify-between items-center gap-3 gap-y-7 select-none'>

                    <div className='flex items-center gap-3'>
                        <button onClick={() => setModel(true)} className='btn btn-success shadow-none hover:opacity-[.8] !py-2.5 !px-6 font-semibold tracking-wide'>{config.text.deposit_money}</button>
                        <button onClick={() => setModel1(true)} className='btn btn-danger shadow-none hover:opacity-[.8] !py-2.5 !px-6 font-semibold tracking-wide'>{config.text.withdraw_money}</button>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button onClick={() => setModel2(true)} className='btn btn-info shadow-none hover:opacity-[.8] !py-2.5 !px-6 font-semibold tracking-wide'>{config.text.convert_balances}</button>
                    </div>

                </div>

            </div>

            <Model model={model} setModel={setModel} className={'max-w-[30rem] rounded-sm relative overflow-hidden'}>

                { loader && <Loader className='bg medium'/> }

                <button type="button" onClick={() => setModel(false)} className="absolute top-[.85rem] text-gray-400 outline-none hover:text-gray-800 ltr:right-5 rtl:left-5 dark:hover:text-gray-600">
                    <Icons icon='close'/>
                </button>

                <div className="bg-gray-100 py-[.9rem] text-[1rem] select-none font-medium ltr:pl-6 ltr:pr-[50px] rtl:pr-6 rtl:pl-[50px] dark:bg-menu-dark/50">
                    {config.text.add_balance}
                </div>

                <div className='pt-8'>

                    <label className='mb-5 px-6'>{config.text.balance_type}</label>

                    <div className="w-full flex items-center flex-wrap gap-3 px-6">

                        <button onClick={() => setType('pending')} className={`btn btn-outline-primary shadow-none hover:bg-primary hover:text-white ${type === 'pending' && 'bg-primary text-white'}`}>
                            {config.text._pending_}
                        </button>
                        <button onClick={() => setType('buy')} className={`btn btn-outline-info shadow-none hover:bg-info hover:text-white ${type === 'buy' && 'bg-info text-white'}`}>
                            {config.text._buy_}
                        </button>
                        <button onClick={() => setType('withdraw')} className={`btn btn-outline-success shadow-none hover:bg-success hover:text-white ${type === 'withdraw' && 'bg-success text-white'}`}>
                            {config.text._withdraw_}
                        </button>

                    </div>

                    <div className='w-full p-6 pb-8 relative'>

                        <div className='w-full ltr:pr-[6rem] rtl:pl-[5.5rem]'>
                            <Elements element='input' type='number' name='amount' value={amount} onChange={setAmount} inputRef={ref}/>
                        </div>

                        <div onClick={() => setAmount(max)} className='absolute top-[50%] ltr:right-6 rtl:left-6 -translate-y-[50%] flex justify-center items-center select-none cursor-pointer'>
                            <span className='text-[1rem] text-[#dc7027] font-semibold duration-300 hover:underline'>{config.text.maximum}</span>
                        </div>

                        <div className="w-full text-[.85rem] pt-3 cursor-default">
                            {
                                error ?
                                <span className='text-danger/75'>
                                    {config.text.maximum_error} : { fix_number(max, true) }
                                </span>:
                                <span>
                                    { config.text.maximum } : { fix_number(max, true) }
                                </span>
                            }
                        </div>

                    </div>
                    
                    <div className='flex items-center gap-3 p-5 border-t border-border dark:border-border-dark select-none'>
                        <button onClick={() => setModel(false)} className='btn btn-danger shadow-none hover:opacity-[.8]'>{config.text.cancel}</button>
                        <button onClick={_deposit_} className='btn btn-success shadow-none hover:opacity-[.8]'>{config.text.add}</button>
                    </div>

                </div>
                
            </Model>

            <Model model={model1} setModel={setModel1} className={'max-w-[30rem] rounded-sm relative overflow-hidden'}>

                { loader && <Loader className='bg medium'/> }

                <button type="button" onClick={() => setModel1(false)} className="absolute top-[.85rem] text-gray-400 outline-none hover:text-gray-800 ltr:right-5 rtl:left-5 dark:hover:text-gray-600">
                    <Icons icon='close'/>
                </button>

                <div className="bg-gray-100 py-[.9rem] text-[1rem] select-none font-medium ltr:pl-6 ltr:pr-[50px] rtl:pr-6 rtl:pl-[50px] dark:bg-menu-dark/50">
                    {config.text.balance_withdraw}
                </div>

                <div className='pt-8'>

                    <label className='mb-5 px-6'>{config.text.balance_type}</label>

                    <div className="w-full flex items-center flex-wrap gap-3 px-6">

                        <button onClick={() => setType('pending')} className={`btn btn-outline-primary shadow-none hover:bg-primary hover:text-white ${type === 'pending' && 'bg-primary text-white'}`}>
                            {config.text._pending_}
                        </button>
                        <button onClick={() => setType('buy')} className={`btn btn-outline-info shadow-none hover:bg-info hover:text-white ${type === 'buy' && 'bg-info text-white'}`}>
                            {config.text._buy_}
                        </button>
                        <button onClick={() => setType('withdraw')} className={`btn btn-outline-success shadow-none hover:bg-success hover:text-white ${type === 'withdraw' && 'bg-success text-white'}`}>
                            {config.text._withdraw_}
                        </button>

                    </div>

                    <div className='w-full p-6 pb-8 relative'>

                        <div className='w-full ltr:pr-[6rem] rtl:pl-[5.5rem]'>
                            <Elements element='input' type='number' name='amount' value={amount} onChange={setAmount} inputRef={ref}/>
                        </div>

                        <div onClick={max_limit} className='absolute top-[50%] ltr:right-6 rtl:left-6 -translate-y-[50%] flex justify-center items-center select-none cursor-pointer'>
                            <span className='text-[1rem] text-[#dc7027] font-semibold duration-300 hover:underline'>{config.text.maximum}</span>
                        </div>

                        <div className="w-full text-[.85rem] pt-3 cursor-default">
                            {
                                error ?
                                <span className='text-danger/75'>
                                    {config.text.no_enouph_money}, {config.text.available} : &nbsp;
                                    {
                                        type === 'pending' ? fix_number(data.pending_balance, true) : 
                                        type === 'buy' ? fix_number(data.buy_balance, true) : 
                                        fix_number(data.withdraw_balance, true)
                                    }
                                </span> :
                                <span>
                                    { config.text.available } : &nbsp;
                                    {
                                        type === 'pending' ? fix_number(data.pending_balance, true) : 
                                        type === 'buy' ? fix_number(data.buy_balance, true) : 
                                        fix_number(data.withdraw_balance, true)
                                    }
                                </span>
                            }
                        </div>

                    </div>
                    
                    <div className='flex items-center gap-3 p-5 border-t border-border dark:border-border-dark select-none'>
                        <button onClick={() => setModel1(false)} className='btn btn-danger shadow-none hover:opacity-[.8]'>{config.text.cancel}</button>
                        <button onClick={_withdraw_} className='btn btn-success shadow-none hover:opacity-[.8]'>{config.text.withdraw}</button>
                    </div>

                </div>
                
            </Model>

            <Model model={model2} setModel={setModel2} className={'max-w-[32rem] rounded-sm relative overflow-hidden'}>

                { loader && <Loader className='bg medium'/> }

                <button type="button" onClick={() => setModel2(false)} className="absolute top-[.85rem] text-gray-400 outline-none hover:text-gray-800 ltr:right-5 rtl:left-5 dark:hover:text-gray-600">
                    <Icons icon='close'/>
                </button>

                <div className="bg-gray-100 py-[.9rem] text-[1rem] select-none font-medium ltr:pl-6 ltr:pr-[50px] rtl:pr-6 rtl:pl-[50px] dark:bg-menu-dark/50">
                    {config.text.convert_balance}
                </div>

                <div className='pt-8'>

                    <div className='px-6 space-y-6'>

                        <div className="w-full flex justify-between items-center gap-3">
                           
                            <p className='w-[4.5rem] text-[.9rem] font-semibold dark:text-white-light/75'>{config.text.from}</p>
                            
                            <div className="w-full flex items-center flex-wrap gap-3">

                                <button onClick={() => setFrom('pending')} className={`btn btn-outline-primary shadow-none hover:bg-primary hover:text-white ${from === 'pending' && 'bg-primary text-white'}`}>
                                    {config.text._pending_}
                                </button>
                                <button onClick={() => setFrom('buy')} className={`btn btn-outline-info shadow-none hover:bg-info hover:text-white ${from === 'buy' && 'bg-info text-white'}`}>
                                    {config.text._buy_}
                                </button>
                                <button onClick={() => setFrom('withdraw')} className={`btn btn-outline-success shadow-none hover:bg-success hover:text-white ${from === 'withdraw' && 'bg-success text-white'}`}>
                                    {config.text._withdraw_}
                                </button>

                            </div>

                        </div>

                        <div className="w-full flex justify-between items-center gap-3">

                            <p className='w-[4.5rem] text-[.9rem] font-semibold dark:text-white-light/75'>{config.text.to}</p>

                            <div className="w-full flex items-center flex-wrap gap-3">
                                
                                <button onClick={() => setTo('pending')} className={`btn btn-outline-primary shadow-none hover:bg-primary hover:text-white ${to === 'pending' && 'bg-primary text-white'}`}>
                                    {config.text._pending_}
                                </button>
                                <button onClick={() => setTo('buy')} className={`btn btn-outline-info shadow-none hover:bg-info hover:text-white ${to === 'buy' && 'bg-info text-white'}`}>
                                    {config.text._buy_}
                                </button>
                                <button onClick={() => setTo('withdraw')} className={`btn btn-outline-success shadow-none hover:bg-success hover:text-white ${to === 'withdraw' && 'bg-success text-white'}`}>
                                    {config.text._withdraw_}
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className='w-full p-6 pb-8 relative'>

                        <div className='w-full ltr:pr-[6rem] rtl:pl-[5.5rem]'>
                            <Elements element='input' type='number' name='amount' value={amount} onChange={setAmount} inputRef={ref}/>
                        </div>

                        <div onClick={max_limit} className='absolute top-[50%] ltr:right-6 rtl:left-6 -translate-y-[50%] flex justify-center items-center select-none cursor-pointer'>
                            <span className='text-[1rem] text-[#dc7027] font-semibold duration-300 hover:underline'>{config.text.maximum}</span>
                        </div>

                        <div className="w-full text-[.85rem] pt-3 cursor-default">
                            {
                                error ?
                                <span className='text-danger/75'>
                                    {config.text.no_enouph_money}, {config.text.available} : &nbsp;
                                    {
                                        from === 'pending' ? fix_number(data.pending_balance, true) : 
                                        from === 'buy' ? fix_number(data.buy_balance, true) : 
                                        fix_number(data.withdraw_balance, true)
                                    }
                                </span> :
                                <span>
                                    { config.text.available } : &nbsp;
                                    {
                                        from === 'pending' ? fix_number(data.pending_balance, true) : 
                                        from === 'buy' ? fix_number(data.buy_balance, true) : 
                                        fix_number(data.withdraw_balance, true)
                                    }
                                </span>
                            }
                        </div>

                    </div>
                    
                    <div className='flex items-center gap-3 p-5 border-t border-border dark:border-border-dark select-none'>
                        <button onClick={() => setModel2(false)} className='btn btn-danger shadow-none hover:opacity-[.8]'>{config.text.cancel}</button>
                        <button onClick={_convert_} className='btn btn-success shadow-none hover:opacity-[.8]'>{config.text.convert}</button>
                    </div>

                </div>
                
            </Model>

        </div>

    )

}
