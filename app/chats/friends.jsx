"use client";
import { api, date, diff_date, fix_date, matching, print } from '@/public/script/main';
import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Elements from '@/components/elements';
import Icons from '@/components/icons';

export default function Friends ({ data, setData, room, setRoom, users, menu, setMenu, setLoader, current_user }) {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const [model, setModel] = useState(false);
    const [search, setSearch] = useState('');
    const [contacts, setContacts] = useState([]);
    const searchParams = useSearchParams();
    const [opened, setOpened] = useState(false);
    const [tab, setTab] = useState('vendors');

    const _delete_ = async( id, for_all ) => {

        if ( !confirm(config.text.ask_delete_item) ) return;
        if ( room?.id === id ) setRoom({});
        setData(data.filter(_ => _.id !== id));
        const response = await api(`chats/${id}/delete`, { for_all: for_all || false });
        
    }
    useEffect(() => {

        let _data_ = data.filter(_ => 
            matching(`--${_.user?.id}`, search) ||
            matching(`--${_.client?.id}`, search) ||
            matching(_.user?.name, search) ||
            matching(_.user?.email, search) ||
            matching(_.user?.phone, search) ||
            matching(_.client?.name, search) ||
            matching(_.client?.email, search) ||
            matching(_.client?.phone, search) ||
            matching(_.messages.slice(-1)[0]?.created_at, search) ||
            matching(_.messages.slice(-1)[0]?.content, search) ||
            matching(_.user?.id, search) ||
            matching(_.id, search) ||
            matching(`-${_.user?.id}`, search)
        );

        _data_ = _data_.sort((a, b) => diff_date(a.messages.slice(-1)[0]?.created_at, b.messages.slice(-1)[0]?.created_at));
        setContacts(_data_);

    }, [data, search]);

    return (

        <Fragment>

            <div className={`panel select-none absolute z-10 w-full h-full max-w-full sm:max-w-xs overflow-hidden p-4 xl:relative hidden xl:block sm:border-r border-border dark:border-border-dark xl:border ${menu ? '!block' : ''}`}>

                <div className="w-full flex justify-between items-center">

                    <div className="flex items-center gap-4 py-2 px-2 overflow-hidden text-[1rem] dark:text-white-light/75">
                        <Icons icon='message'/>
                        <span className='truncate tracking-wide'>{config.text.users_chats}</span>
                    </div>

                </div>

                <div className="w-full relative mt-3">

                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input peer search-input" placeholder={config.text.search} autoComplete='off'/>

                    <div className="h-px w-full border-b border-border dark:border-border-dark mt-3"></div>

                </div>

                <div className='w-full select-none pt-1.5'>
                    {
                        contacts.length ?
                        <div className="contacts outline-none border-none relative h-[calc(100vh_-_250px)] space-y-2.5 overflow-y-auto overflow-x-hidden">
                            {
                                contacts.map((item, index) =>
                                
                                    <div key={index} onClick={() => { setMenu(false); setRoom(item); room.id !== item.id && setLoader(true); }} className={`flex mt-2 justify-between items-center w-full border border-border dark:border-border-dark m-0 p-[.8rem] bg-[#eee]/25 dark:bg-menu-dark/20 group rounded-sm relative cursor-pointer outline-none chat-user hover:bg-[#eee]/40 dark:hover:bg-menu-dark/40 ${index > 0 && ''} ${room.id === item.id && '!bg-[#eee]/40 dark:!bg-menu-dark/50'}`}>
                                                    
                                        <div className="w-full flex flex-col gap-2 relative">

                                            <div className="w-full flex flex-col gap-2">

                                                <div className='w-full flex items-center gap-2.5'>
                                                    <Elements element='image' value={item.user?.image} className='w-7 h-7'/>
                                                    <p className="font-semibold max-w-[10rem] truncate dark:text-white-light/75">{item.user?.name}</p>
                                                    <Elements element='user_role' value={2}/>
                                                </div>

                                                <div className='w-full flex items-center gap-2.5'>
                                                    <Elements element='image' value={item.client?.image} className='w-7 h-7'/>
                                                    <p className="font-semibold max-w-[10rem] truncate dark:text-white-light/75">{item.client?.name}</p>
                                                    <Elements element='user_role' value={3}/>
                                                </div>

                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full">
                                
                                                <div className='w-full flex justify-end'>
                                
                                                    <Elements element='menu' button={<Icons icon='arrow_down' className='hidden group-hover:block'/>} onClick={(e) => e.stopPropagation()} className='ltr:ml-2 rtl:mr-2 h-[1.1rem]'>

                                                        <ul className='w-[10rem]'>
                                                            <li onClick={(e) => _delete_(item.id)}>
                                                                <button>
                                                                    <Icons icon='delete' className='max-w-4.5 max-h-4.5'/>
                                                                    <span className="px-2 mt-[2px] text-[.85rem] tracking-wide">{config.text.delete}</span>
                                                                </button>
                                                            </li>
                                                            <li onClick={(e) => _delete_(item.id, true)}>
                                                                <button>
                                                                    <Icons icon='delete' className='max-w-4.5 max-h-4.5'/>
                                                                    <span className="px-2 mt-[2px] text-[.85rem] tracking-wide">{config.text.delete_for_all}</span>
                                                                </button>
                                                            </li>
                                                        </ul>

                                                    </Elements>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            }
                        </div> :
                        <div className="empty mt-4">

                            <div className="w-full h-[calc(100vh_-_350px)] flex justify-center items-center flex-col gap-4 py-10 no-select layer-div">
                                <img src="/media/layout/empty-chat.png" className='w-[5rem] opacity-[.8]' style={{ filter: 'sepia(1) saturate(2) hue-rotate(-25deg) brightness(1.1)' }}/>
                                <p className='text-[.95rem]'>{config.text.no_data}</p>
                            </div>

                        </div>
                    }
                </div>

            </div>

            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${menu && '!block xl:!hidden'}`} onClick={() => setMenu(!menu)}></div>

        </Fragment>

    )

}
