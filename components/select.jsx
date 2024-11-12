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
            matching(item.country, search) ||
            matching(item.location, search) ||
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

        <Model model={model} setModel={setModel} className={'max-w-[27rem] rounded-sm'}>

            <button type="button" onClick={() => setModel(false)} className="absolute top-[.85rem] text-gray-400 outline-none hover:text-gray-800 ltr:right-5 rtl:left-5 dark:hover:text-gray-600">
                <Icons icon='close'/>
            </button>

            <div className="bg-[#f9f9f9] py-[.9rem] text-[1rem] select-none font-medium ltr:pl-6 ltr:pr-[50px] rtl:pr-6 rtl:pl-[50px] dark:bg-menu-dark/50">
                { config.text.select } { config.text[label || 'user'] }
            </div>

            <div className="p-5">

                <div className="relative mb-5">

                    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder={config.text.search} className='form-input peer'/>

                </div>

                <div className="all-data min-h-[20rem] max-h-[calc(100vh_-_250px)] pb-2 overflow-auto select-none">
                    {
                        items.length ? items.map((item, index) => 

                            <div key={index} onClick={() => { setModel(false); onChange(item.id); }} className="flex border-t items-start border-border dark:border-border-dark hover:bg-[#eee] dark:hover:bg-[#eee]/5 pointer contact-item" style={{ padding: '.6rem .5rem' }}>
                                
                                <Elements element='image' value={item.image} type={type} className="w-10 h-10 ltr:mr-4 rtl:ml-4 mt-[3px] flex justify-center items-center"/>

                                <div className="flex-1 font-semibold max-w[80%]">
                                    
                                    <h6 className="text-base name text-[1rem]">
                                        
                                        <p className='line-clamp-2 text-ellipsis'>{item.name || item.title || item.content || ''}</p>
                                        
                                    </h6>

                                    <div className="flex text-xs tell !text-[.9rem] mt-[5px] opacity-[.8]">
                                 
                                        <div className='flex justify-start items-center ltr:mr-2 rtl:ml-2 space-x-1 !font-nunito !font-semibold'>
                                                
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
                        <div className="w-full h-[17rem]">

                            {/* <div className="h-px w-full border-b border-border dark:border-border-dark"></div> */}
                            
                            <div className="w-full h-full flex justify-center items-center flex-col gap-4 py-10 no-select layer-div">
                                <img src="/media/layout/empty-data.png" className='w-[5rem] opacity-[.8]'/>
                                <p className='text-[.95rem]'>{config.text.no_data}</p>
                            </div>

                        </div>
                    }
                </div>

            </div>

        </Model>

    )

}
