"use client";
import { fix_date, fix_number, matching } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Model from "./model";
import Icons from "./icons";
import Elements from "./elements";

export default function Select ({ model, setModel, data, onChange, label, type, roles }) {

    const config = useSelector((state) => state.config);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {

        let result = data?.filter((item) => 
            matching(`--${item.id}`, search) ||
            matching(item.name, search) ||
            matching(item.title, search) ||
            matching(item.email, search) ||
            matching(item.created_at, search) ||
            matching(fix_date(item.created_at), search) ||
            matching(item.new_price, search) ||
            matching(item.price, search) ||
            matching(fix_number(item.new_price, true), search) ||
            matching(fix_number(item.price, true), search) ||
            matching(
                item.role == 1 && item.super ? config.text.super_admin : 
                item.role == 1 && item.supervisor ? config.text.supervisor : 
                item.role == 1 ? config.text.admin : 
                item.role == 2 ? config.text.vendor : 
                item.role == 3 ? config.text.client : '', search
            ) ||
            matching(item.online ? config.text.online : config.text.offline, search)
        );

        setItems(result || []);

    }, [search]);
    useEffect(() => {

        setItems(data || []);

    }, [data]);
    useEffect(() => {

        if ( !model ) setSearch('');

    }, [model]);

    return (

        <Model model={model} setModel={setModel} className={'max-w-[27rem]'}>

            <button type="button" onClick={() => setModel(false)} className="absolute top-[.85rem] text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600">
                <Icons icon='close'/>
            </button>

            <div className="bg-[#f9f9f9] py-[.85rem] text-[1.05rem] no-select font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                { config.text.select } { config.text[label || 'user'] }
            </div>

            <div className="p-5 min-h-[21rem]">

                <div className="relative mb-5">

                    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder={config.text.search} className='form-input peer'/>

                </div>

                <div className="all-data max-h-[calc(100vh_-_250px)] pb-2 overflow-auto select-none">
                    {
                        items.length ? items.map((item, index) => 

                            <div key={index} onClick={() => { setModel(false); onChange(item.id); }} className="flex border-t items-start border-[#e0e6ed] dark:border-[#1b2e4b] hover:bg-[#eee] dark:hover:bg-[#eee]/10 pointer contact-item" style={{ padding: '.6rem .5rem' }}>
                                
                                <Elements element='image' value={item.image} type={type} className="w-10 h-10 ltr:mr-3 rtl:ml-3 mt-[3px] flex justify-center items-center"/>

                                <div className="flex-1 font-semibold max-w[80%]">
                                    
                                    <h6 className="text-base name text-[.9rem]">
                                        
                                        <p className='line-clamp-2 text-ellipsis'>{item.name || item.title || ''}</p>
                                        
                                    </h6>

                                    <div className="flex text-xs tell text-[.7rem] mt-[3px] opacity-[.8]">
                                 
                                        <div className='flex justify-start items-center ltr:mr-2 rtl:ml-2 space-x-1'>
                                                
                                            { item.created_at && <span>{fix_date(item.created_at)}</span> }
                                            { item.new_price && <span>~&nbsp;{fix_number(item.new_price, true)} {config.text.currency}</span> }
                                            {
                                                roles && !type ?
                                                <Elements element='user_role' value={item.role} type={item.super ? 'super' : item.supervisor ? 'supervisor' : ''}/> : ''
                                            }
                                        
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ) :
                        <div className="w-full">

                            <div className="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                            
                            <div className="w-full flex justify-center items-center py-10 no-select">

                                <p className='text-[.8rem]'>{config.text.no_data}</p>

                            </div>

                        </div>
                    }
                </div>

            </div>

        </Model>

    );

};
