"use client";
import { alert_msg, api, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Loader from './loader';
import Elements from './elements';
import Icons from './icons';
import Panel from "./panel";

export default function Form ({ system='', id=0, general=[], sidebar=[], settings=[], statistics=[], bring=[], related=[], setForm }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(true);
    const [items, setItems] = useState([...general, ...settings, ...sidebar]);
    const [data, setData] = useState({});
    const [tab, setTab] = useState('info');

    const _default_ = async() => {

        let _data_ = {};
        items.forEach(_ => _.inputs.forEach(_ => _data_[_.name] = _.value));

        if ( bring.length ) {

            // const response = await api(`${system}/default`);

            const response = {
                status: true,
                categories: [
                    {id: 1, name: 'Category 1', image: 'user/1.png', created_at: '2024-06-12'},
                    {id: 2, name: 'Category 2', image: 'user/1.png', created_at: '2024-06-12'},
                    {id: 3, name: 'Category 3', image: 'user/1.png', created_at: '2024-06-12'},
                ],
                clients: [
                    {id: 1, name: 'Client 1', image: 'user/1.png', created_at: '2024-06-12'},
                    {id: 2, name: 'Client 2', image: 'user/2.png', created_at: '2024-06-12'},
                    {id: 3, name: 'Client 3', image: 'user/3.png', created_at: '2024-06-12'},
                ],
            }

            bring.forEach(_ => _data_[_] = response[_]);

        }

        setData(_data_);
        setTimeout(() => setLoader(false), 500);

    }
    const _get_ = async() => {

        const response = await api(`${system}/${id}`);
        if ( !response.data ) return setForm(false);
        setData(response.data);
        setLoader(false);

    }
    const _save_ = async() => {

        let required = [];
        items.forEach(_ => _.inputs.forEach(_ => (_.required && !data[_.name]) ? required.push(_.label || _.name) : ''));
        if ( required.length ) return alert_msg(`${required[0]} is required to save item !`, 'error');
        
        setLoader(true);
        const response = await api(id ? `${system}/${id}/update` : `${system}/store`, data);
        
        if ( response.status ) {
            if ( id ) alert_msg(`${config.text.item} ( ${id} ) - ${config.text.updated_successfully}`);
            else alert_msg(config.text.new_item_added);
            setForm(false);
        }
        else {
            alert_msg(config.text.alert_error, 'error');
            setLoader(false);
        }

    }
    const _delete_ = async() => {
        
        if ( !confirm(`${config.text.ask_delete_item}`) ) return;
        
        setLoader(true);
        const response = await api(`${system}/${id}/delete`);

        if ( response.status ) {
            alert_msg(`${config.text.item} ( ${id} ) ${config.text.deleted_successfully}`);
            setForm(false);
        }
        else {
            alert_msg(config.text.alert_error, 'error');
            setLoader(false);
        }

    }
    const _cancel_ = async() => {

        setForm(false);

    }
    const load_system = ( system ) => {

        const Component = dynamic(() => import(`@/app/${system.name}/page.jsx`), {loading: () => <Loader className="medium"/>, ssr: false});

        return !system.hidden && <Component item_filters={system.filters} options={{...system.options, start_loader: false}}/>

    }
    useEffect(() => {

        if ( id ) _default_();
        else _default_();

    }, []);

    return (

        <div>
            {
                loader ? <Loader className='container'/>:
                <div className="flex xl:flex-row flex-col gap-y-5 cursor-default">

                    <div className="flex flex-col flex-1 xl:w-[72%]">

                        <div className="flex-1 ltr:xl:mr-6 rtl:xl:ml-6 space-y-4">

                            <div className="panel p-0 rounded-md overflow-hidden flex justify-start items-center gap-x-3">

                                <ul className="w-full sm:flex font-semibold whitespace-nowrap tracking-wide overflow-x-auto select-none">

                                    <li className="inline-block">
                                        <a onClick={() => setTab('info')} className={`set-text pointer flex gap-2 p-4.5 border-b border-transparent hover:border-primary hover:text-primary ${tab === 'info' && '!border-primary text-primary'}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M22 12C22 12 21.0071 12.8907 19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M22 16C22 16 21.0071 16.8907 19.0212 17.6851L16.2127 18.8085C14.2268 19.6028 13.2339 20 12 20C10.7661 20 9.77318 19.6028 7.7873 18.8085L4.97883 17.6851C2.99294 16.8907 2 16 2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            </svg>
                                            <span>{config.text.information}</span>
                                        </a>
                                    </li>

                                    {
                                        settings.length ?
                                        <li className="inline-block">
                                            <a onClick={() => setTab('settings')} className={`set-text pointer flex gap-2 p-4.5 border-b border-transparent hover:border-primary hover:text-primary ${tab === 'settings' && '!border-primary text-primary'}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                    <path d="M22 12C22 12 21.0071 12.8907 19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                    <path d="M22 16C22 16 21.0071 16.8907 19.0212 17.6851L16.2127 18.8085C14.2268 19.6028 13.2339 20 12 20C10.7661 20 9.77318 19.6028 7.7873 18.8085L4.97883 17.6851C2.99294 16.8907 2 16 2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                </svg>
                                                <span>{config.text.settings}</span>
                                            </a>
                                        </li> : ''
                                    }
                                    {
                                        id && statistics.length ?
                                        <li className="inline-block">
                                            <a onClick={() => setTab('statistics')} className={`set-text pointer flex gap-2 p-4.5 border-b border-transparent hover:border-primary hover:text-primary ${tab === 'statistics' && '!border-primary text-primary'}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                    <path d="M22 12C22 12 21.0071 12.8907 19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                    <path d="M22 16C22 16 21.0071 16.8907 19.0212 17.6851L16.2127 18.8085C14.2268 19.6028 13.2339 20 12 20C10.7661 20 9.77318 19.6028 7.7873 18.8085L4.97883 17.6851C2.99294 16.8907 2 16 2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                </svg>
                                                <span>{config.text.statistics}</span>
                                            </a>
                                        </li> : ''
                                    }
                                    {
                                        id && related.length ?
                                        related.map((system, index) => 
                                            <li key={index} className="inline-block">
                                                <a onClick={() => setTab(system.name)} className={`set-text pointer flex gap-2 p-4.5 border-b border-transparent hover:border-primary hover:text-primary ${tab === system.name && '!border-primary text-primary'}`}>
                                                    <Icons icon={system.icon} />
                                                    <span>{config.text[system.label || system.name]}</span>
                                                </a>
                                            </li>
                                        ) : ''
                                    }
                                    
                                </ul>

                            </div>

                            <div className='sm:min-h-[calc(100vh_-_250px)]'>

                                { tab === 'info' && <div className='panel p-6'><Panel items={general} data={data} setData={setData}/></div> }
                                { tab === 'settings' && <div className='panel p-6'><Panel items={settings} data={data} setData={setData}/></div> }
                                { tab === 'statistics' && <Panel items={statistics} data={data} setData={setData}/> }

                                {
                                    id && related.length ?
                                    related.map((system, index) => 
                                        tab === system.name && Object.keys(system.filters || {}).length ?
                                        <div key={index} className="relative min-h-[30rem]">
                                            {load_system(system)}
                                        </div> : ''
                                    ) : ''
                                }

                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col xl:w-[28%]'>

                        <div className={`space-y-5 select-none sticky ${config.menu === 'horizontal' ? 'top-[8.3rem]' : 'top-[5rem]'}`}>

                            <div className='panel'>
                            
                                <Panel items={sidebar} data={data} setData={setData}/>

                            </div>
                            
                            <div className="panel">

                                <h1 className='flex items-center opacity-[.8]'>

                                    <Icons icon='setting'/>

                                    <span className='font-semibold text-[.95rem] px-2'>{config.text.invoice}</span>

                                </h1>

                                <Elements element='hr' className='mt-5'/>

                                <div className='grid grid-cols-2 gap-4 pb-2'>

                                    <Elements element='save_button' onClick={_save_}/>
                                    <Elements element='cancel_button' onClick={_cancel_}/>
                                    { id ? <Elements element='delete_button' onClick={_delete_}/> : '' }

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            }
        </div>

    )

}
