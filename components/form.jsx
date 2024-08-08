"use client";
import { alert_msg, api, date, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Loader from './loader';
import Elements from './elements';
import Icons from './icons';
import Panel from "./panel";

export default function Form ( props ) {

    const config = useSelector((state) => state.config);
    const { system='', id=0, general=[], sidebar=[], settings=[], statistics=[], bring=[], related=[], setForm } = props
    const [loader, setLoader] = useState(true);
    const [items, setItems] = useState([...general, ...settings, ...sidebar]);
    const [data, setData] = useState({});
    const [tab, setTab] = useState('info');

    const value = ( item ) => {

        let value = '';
        if ( item.value !== undefined ) return item.value;
        if ( item.type === 'number' ) value = 0;
        if ( item.name === 'created_at' ) value = date();
        if ( item.name === 'updated_at' ) value = date();
        if ( item.element === 'toggle' ) value = true;
        return value;

    }
    const charts = ( data ) => {

        let revenue, items;

        statistics.forEach(_ => 
            _.inputs.forEach(_ => {
                if ( _.type === 'revenue' ) revenue = _;
                if ( _.type === 'items' ) items = _;
            }
        ))
        if ( revenue ) {
            revenue = revenue.charts.map(_ => { return {...data[_], name: _}; });
            data = {...data, revenue_chart: revenue};
        }
        if ( items ) {
            items = items.charts.map(_ => { return {...data[_], name: _}; });
            data = {...data, category_chart: items};
        }

        return data;

    }
    const _default_ = async() => {

        let _data_ = {};
        items.forEach(_ => _.inputs.forEach(_ => _data_[_.name] = _.value || value(_)));

        if ( bring.length ) {
            const response = await api(`${system}/default`);
            bring.forEach(_ => _data_[_] = response[_] || []);
            setLoader(false)
        }
        else {
            setTimeout(() => setLoader(false), 500);
        }

        setData(_data_);

    }
    const _get_ = async() => {

        const response = await api(`${system}/${id}`);
        if ( !response.item ) return setForm(false);

        let _data_ = {...response.item, 'statistics': charts(response.statistics)};
        bring.forEach(_ => _data_[_] = response[_] || []);
        setData(_data_);
        setLoader(false);

    }
    const _save_ = async() => {

        let required = [];
        items.forEach(_ => _.inputs.forEach(_ => (_.required && !data[_.name]) ? required.push(_.label || _.name) : ''));
        if ( required.length ) return alert_msg(`${required[0]} is required to save item !`, 'error');

        setLoader(true);
        data.new_files?.forEach((f, index) => data[`file_${index}`] = f.file);
        const request = {...data, deleted_files: JSON.stringify(data.deleted_files || [])}
        const response = await api(id ? `${system}/${id}/update` : `${system}/store`, request);
        
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

        if ( id ) _get_();
        else _default_();

    }, []);

    return (

        <div>
            {
                loader ? <Loader className='container'/>:
                <div className="flex xl:flex-row flex-col gap-y-5 cursor-default">

                    <div className="flex flex-col flex-1 xl:w-[72%]">

                        <div className="flex-1 ltr:xl:mr-6 rtl:xl:ml-6 space-y-4">

                            <Elements element='tabs'>
                                <li onClick={() => setTab('info')} className={`${tab === 'info' && 'active'}`}>
                                    <Icons icon='information'/>
                                    <span>{config.text.information}</span>
                                </li>
                                {
                                    settings.length ?
                                    <li onClick={() => setTab('settings')} className={`${tab === 'settings' && 'active'}`}>
                                        <Icons icon='setting'/>
                                        <span>{config.text.configrations}</span>
                                    </li> : ''
                                }
                                {
                                    id && statistics.length ?
                                    <li onClick={() => setTab('statistics')} className={`${tab === 'statistics' && 'active'}`}>
                                        <Icons icon='chart'/>
                                        <span>{config.text.statistics}</span>
                                    </li> : ''
                                }
                                {
                                    id && related.length ?
                                    related.map((system, index) => 
                                        <li key={index} onClick={() => setTab(system.name)} className={`${tab === system.name && 'active'}`}>
                                            <Icons icon={system.icon}/>
                                            <span>{config.text[system.label || system.name]}</span>
                                        </li>
                                    ) : ''
                                }
                            </Elements>

                            <div className='xl:min-h-[calc(100vh_-_170px)]'>

                                { tab === 'info' && <div className='panel p-6'><Panel items={general} data={data} setData={setData}/></div> }
                                { tab === 'settings' && <div className='panel p-6'><Panel items={settings} data={data} setData={setData}/></div> }
                                { tab === 'statistics' && <Panel items={statistics} data={data.statistics || {}} setData={setData}/> }

                                {
                                    id && related.length ?
                                    related.map((system, index) => 
                                        tab === system.name && Object.keys(system.filters || {}).length ?
                                        <div key={index} className="relative xl:min-h-[30rem]">
                                            {load_system(system)}
                                        </div> : ''
                                    ) : ''
                                }

                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col xl:w-[28%]'>

                        <div className={`space-y-5 select-none sticky top-[1.3rem]`}>

                            <div className='panel'>
                            
                                <Panel items={sidebar} data={data} setData={setData}/>

                            </div>
                            
                            <div className="panel">

                                <h1 className='flex items-center opacity-[.8] select-none'>

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
