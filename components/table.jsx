"use client";
import { alert_msg, api, lower, print } from '@/public/script/main';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { DataTable } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import Loader from './loader';
import Dropdown from './menu';

export default function Table ( props ) {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const [sort, set_sort] = useState({columnAccessor: '', direction: 'asc'});
    const [current_page, set_current_page] = useState(1);
    const [total_pages, set_total_pages] = useState(1);
    const [total_items, set_total_items] = useState(0);
    const [query, set_query] = useState('');
    const [filter, setFilter] = useState('');
    const [my_data, set_my_data] = useState([]);
    const [selected, set_selected] = useState([]);
    const [my_loader, set_my_loader] = useState(true);
    
    const {
        system='', columns=[], add=true, edit=true, deletes=true, search=true, searchParams={},
        filters=[], use_filters=true, settings=true, rows=5, checkbox=true,
        pagination=true, start_loader=true,
        item_filters, setForm, setId,
    } = props;
    const options = {
        selectedRecords: checkbox ? selected : false,
        page: pagination ? current_page : false,
    };
    const [limits, setlimits] = useState([5, 10, 20, 30, 50, 100]);
    const [limit, set_limit] = useState(pagination ? rows : 0);
    const [loader, setLoader] = useState(start_loader);

    const _read_ = async() => {

        set_my_loader(true);
        // const response = await api(`${system}`, {page: current_page, limit: limit, query: query, filter: filter, ...item_filters || {}});
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${current_page}&_limit=${limit}&_q=${query}`);
        response = await response.text();
        response = JSON.parse(response);
        let total = 100;

        set_selected([]);
        set_my_data(response);
        set_total_items(total);
        set_total_pages( Math.ceil(total / limit) );
        setTimeout(() => set_my_loader(false), 500);

    };
    const _delete_group_ = async() => {

        if ( !selected.length ) return;
        if ( !confirm(`${config.text.delete_selected_rows} ( ${selected.length} ) ${config.text.question_mark}`) ) return;

        let data = my_data.filter(_ => !selected.includes(_));
        if ( !data.length ) _read_();
        else set_my_data(data);
        set_selected([]);

        alert_msg(`${selected.length} ${config.text.items} ${config.text.deleted_successfully}`);
        const response = await api(`${system}/delete`, {ids: JSON.stringify(selected.map(_ => _.id))});

    }
    const _delete_one_ = async( id ) => {

        if ( !id ) return;
        if ( !confirm(`${config.text.ask_delete_item}`) ) return;

        let data = my_data.filter(_ => _.id !== id);
        if ( !data.length ) _read_();
        else set_my_data(data);
        set_selected(selected.filter(_ => _.id !== id));

        alert_msg(`${config.text.item} ${id} ${config.text.deleted_successfully}`);
        const response = await api(`${system}/${id}/delete`);

    }
    const _search_ = async() => {

        if ( current_page === 1 ) _read_();
        else set_current_page(1);

    }
    const _add_ = async() => {

        if ( item_filters ) return router.replace(`/${system}?add=true${Object.keys(item_filters).map(_ => `&${_}=${item_filters[_]}`)}`);
        setId(0);
        setForm(true);

    }
    const _edit_ = async( id ) => {

        if ( item_filters ) return router.replace(`/${system}?edit=${id}${Object.keys(item_filters).map(_ => `&${_}=${item_filters[_]}`)}`);
        setId(id);
        setForm(true);

    }
    const _download_ = async() => {

        // const response = await api(`${system}/download`, {query: query, filter: filter});
        print("Downloading CSV Table");

    }
    useEffect(() => {

        _read_();

    }, [current_page]);
    useEffect(() => {

        _search_();

    }, [limit, filter]);
    useEffect(() => {

        let data = sortBy(my_data, sort.columnAccessor);
        set_my_data(sort.direction === 'desc' ? data.reverse() : data);

    }, [sort]);
    useEffect(() => {

        setTimeout(() => setLoader(false), 500);

        if ( Object.keys(searchParams).length ) {
            
            router.replace(`/${system}`);

        }
        if ( searchParams.edit ) {

            setId(searchParams.edit);
            setForm(true);

        }
        else if ( searchParams.add ) {

            setForm(true);
            
        }

    }, []);

    return (

        <div>
            {
                loader ? <Loader className='container'/> :
                <div className="panel p-0 overflow-hidden">

                    <div className='invoice-table'>

                        {
                            add || deletes || search || use_filters || settings ?
                            <div className="py-4 flex justify-between flex-col px-5 space-y-3 lg:space-y-0 lg:flex-row lg:items-center select-none border-b border-gray-100 dark:border-[#15243b]">

                                <div className="flex items-center gap-2">
                                    {
                                        deletes &&
                                        <button onClick={_delete_group_} type="button" className="btn btn-danger gap-2 shadow-none hover:opacity-[.8] border-danger">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -mt-[2px]">
                                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"></path>
                                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path opacity="0.5" stroke="currentColor" strokeWidth="1.5" d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"></path>
                                            </svg>
                                            <span className='font-thin tracking-wide'>{config.text.delete}</span>
                                        </button>
                                    }
                                    {
                                        add &&
                                        <button onClick={_add_} type="button" className="btn btn-primary gap-1 shadow-none hover:opacity-[.8] border-primary">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            <span className='font-thin tracking-wide'>{config.text.add_new}</span>
                                        </button>
                                    }
                                </div>

                                <div className="flex items-center gap-1">
                                    {
                                        search &&
                                        <input 
                                            type="text" 
                                            className="form-input w-[22rem]" 
                                            placeholder={config.text.search} 
                                            value={query}
                                            onChange={(e) => set_query(e.target.value)} 
                                            onKeyUp={(e) => { e.key === 'Enter' && _search_() }}
                                        />
                                    }
                                </div>

                                <div className='flex items-center gap-6'>
                                    {
                                        use_filters &&
                                        <div className='flex items-center gap-1'>
                                            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='form-select cursor-pointer min-w-[10rem]'>
                                                {
                                                    ['newest', 'oldest', ...filters || []].map((item, index) => 
                                                        <option key={index} value={item}>{config.text[lower(item)]}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    }
                                    {
                                        settings &&
                                        <div className='flex justify-center items-center'>

                                            <div className="dropdown shrink-0">

                                                <Dropdown offset={[0, 8]} btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                                    button={
                                                        <svg className="hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
                                                            <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                        </svg>
                                                    }>
                                                    
                                                    <ul className="w-[150px] py-4 font-semibold border border-gray-200 dark:border-[#1a2c48] shadow-md text-dark dark:text-white-dark dark:text-white-light/90">

                                                        <li>
                                                            <button onClick={_search_} type="button" className="flex w-full hover:text-primary opacity-[.8] hover:opacity-[1]">
                                                                <svg width="17" height="17" className='-mt-[1px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                                <span className="ltr:ml-2.5 rtl:mr-2.5">{config.text.refresh}</span>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={_download_} type="button" className="flex w-full hover:text-primary opacity-[.8] hover:opacity-[1]">
                                                                <svg width="17" height="17" className='-mt-[1px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M16 17H12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                    <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                </svg>
                                                                <span className="ltr:ml-2.5 rtl:mr-2.5">{config.text.download}</span>
                                                            </button>
                                                        </li>

                                                    </ul>

                                                </Dropdown>

                                            </div>

                                        </div>
                                    }
                                </div>

                            </div> : ''
                        }

                        {
                            my_loader ?
                            <div className='relative w-full h-[25.2rem]'>
                                <Loader className='bg medium'/>
                            </div>:
                            <div>
                                
                                <div className={`datatables select-none ${pagination ? 'pb-5 pagination-padding' : 'pb-1'}`}>

                                    <DataTable
                                        {... Object.fromEntries( Object.entries(options).filter(([key, value]) => value) ) }
                                        records={my_data}
                                        highlightOnHover
                                        totalRecords={total_items}
                                        recordsPerPage={limit}
                                        onPageChange={_ => set_current_page(_)}
                                        recordsPerPageOptions={limits}
                                        onRecordsPerPageChange={set_limit}
                                        onSelectedRecordsChange={set_selected}
                                        sortStatus={sort}
                                        onSortStatusChange={set_sort}
                                        columns={
                                            edit || deletes ? [
                                                ...columns.map(_ => {
                                                    _.sortable = true,
                                                    _.textAlignment = config.dir === 'rtl' ? 'right' : 'left',
                                                    _.title = config.text[lower(_.title)] || ''
                                                    return _;
                                                }),
                                                {
                                                    accessor: 'action', sortable: false,
                                                    title: config.text.invoice,
                                                    textAlignment: config.dir === 'rtl' ? 'right' : 'left',
                                                    render: ({ id }) => (
                                                        <div className="buttons mx-auto flex w-full items-center gap-2 opacity-[.8]">
                                                            {
                                                                edit &&
                                                                <button type="button" onClick={() => _edit_(id)} className="btn rounded-md text-primary border-primary shadow-none hover:bg-primary hover:text-white px-3 py-[5px] text-[.8rem] tracking-wide">
                                                                    {config.text.open}
                                                                </button>
                                                            }
                                                            {
                                                                deletes &&
                                                                <button type="button" onClick={() => _delete_one_(id)} className="btn rounded-md text-danger border-danger shadow-none hover:bg-danger hover:text-white px-3 py-[5px] text-[.8rem] tracking-wide">
                                                                    {config.text.delete}
                                                                </button>
                                                            }
                                                        </div>
                                                    ),
                                                },
                                            ] : [
                                                ...columns.map(_ => {
                                                    _.sortable = true,
                                                    _.textAlignment = config.dir === 'rtl' ? 'right' : 'left',
                                                    _.title = config.text[lower(_.title)] || ''
                                                    return _;
                                                }), 
                                            ]
                                        }
                                    />

                                </div>

                            </div>
                        }

                    </div>

                </div>
            }
        </div>

    );

}
