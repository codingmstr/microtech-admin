"use client";
import { api, date, diff_date, fix_date, matching, print } from '@/public/script/main';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Select from '@/components/select';

export default function Friends ({ data, setData, room, setRoom, users, menu, setMenu, setLoader, current_user }) {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const [model, setModel] = useState(false);
    const [search, setSearch] = useState('');
    const [contacts, setContacts] = useState([]);

    const _delete_ = async( id, destroy ) => {

        if ( !confirm(config.text.ask_delete_item) ) return;
        if ( room?.id === id ) setRoom({});
        setData(data.filter(_ => _.id !== id));

        let user_id = data.find(_ => _.id === id).user?.id || 0;
        const response = await api(`chat/friends/${user_id}/delete`, {destroy: destroy});

    }
    const _new_chat_ = ( id ) => {
        
        setMenu(false);
        let item = data.find(_ => _.user.id === id);
        if ( item?.id !== room.id ) setLoader(true);
        if ( item?.id ) return setRoom(item);

        item = { id: date(), created_at: date(), messages: [], user: users.find(_ => _.id === id) }
        setData([item, ...data]);
        setRoom(item);

    }
    useEffect(() => {

        let _data_ = data.filter(_ => 
            matching(`--${_.user?.id}`, search) ||
            matching(_.user?.name, search) ||
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

                    <div onClick={() => router.push('/account')} className="pointer flex items-center overflow-hidden text-[.9rem] dark:text-white-light/75 hover:text-primary">

                        <Elements element='image' value={config.user.image} className='w-8 h-8'/>

                        <span className='px-[.85rem] -mt-[3px] truncate max-w-[9rem] tracking-wide'>{config.user.name}</span>

                    </div>

                    <button onClick={() => setModel(true)} type='button' className="flex justify-center items-center w-9 h-9 mt-[-2px] rounded-full cursor-pointer border border-border dark:border-border-dark hover:text-primary bg-white-light/30 hover:bg-white-light dark:bg-menu-dark/50 dark:hover:bg-menu-dark">
                    
                        <Icons icon='message' className='scale-[.9]'/>
                        
                    </button>

                </div>

                <div className="w-full relative mt-4">

                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input peer search-input" placeholder={config.text.search} autoComplete='off'/>

                    <div className="h-px w-full border-b border-border dark:border-border-dark mt-3"></div>

                </div>

                <div className='w-full select-none'>
                    {
                        contacts.length ?
                        <div className="contacts outline-none border-none perfect-scrollbar relative h-[calc(100vh_-_300px)] space-y-0.5 pr-3.5 -mr-4 overflow-y-auto overflow-x-hidden">
                            {
                                contacts.map((item, index) =>
                                
                                    <div key={index} onClick={() => { setMenu(false); setRoom(item); room.id !== item.id && setLoader(true); }} className={`flex justify-between items-center w-full border-primary/20 m-0 p-[.8rem] group relative cursor-pointer outline-none chat-user hover:bg-[#eee]/50 dark:hover:bg-menu-dark/30 ${index > 0 && 'border-t'} ${room.id === item.id && 'bg-[#eee]/50 dark:bg-menu-dark/30'}`}>
                                                    
                                        <div className="flex flex-1 items-center">
                        
                                            <div className="relative">
                        
                                                <Elements element='image' value={item.user.image} className='w-9 h-9'/>

                                                { item.user.online && <Icons icon='online' /> }
                        
                                            </div>
                        
                                            <div className="mx-3 ltr:text-left rtl:text-right">
                        
                                                <p className="font-semibold max-w-[8rem] truncate dark:text-white-light/75">{item.user.name}</p>
                        
                                                <p className="flex text-xs text-white-dark truncate max-w-[8rem] mt-[.2rem]">
                                                    {
                                                        item.messages.slice(-1)[0]?.sender_id === current_user.id &&
                                                        <span className={`material-symbols-outlined ltr:mr-[2px] rtl:ml-[2px] ${item.messages.slice(-1)[0]?.readen && 'text-primary'}`} style={{ fontSize: '1rem' }}>check</span>
                                                    }
                                                    {
                                                        item.messages.slice(-1)[0]?.file?.type === 'file' ? 'File' :
                                                        item.messages.slice(-1)[0]?.file?.type === 'image' ? 'Image' :
                                                        item.messages.slice(-1)[0]?.file?.type === 'video' ? 'Video' :
                                                        item.messages.slice(-1)[0]?.content || '~~'
                                                    }
                                                </p>
                        
                                            </div>
                        
                                        </div>
                            
                                        <div className="font-semibold whitespace-nowrap text-xs space-y-1">
                            
                                            <p>{ fix_date(item.messages.slice(-1)[0]?.created_at || item.created_at, true) }</p>
                            
                                            <div className='flex justify-end'>
                            
                                                { 
                                                    item.unreaden ?
                                                    <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[green] mt-[2px] text-white text-[.6rem] overflow-hidden">
                                                        {item.unreaden}
                                                    </div>: ''
                                                }

                                                <Elements element='menu' button={<Icons icon='arrow_down' className='hidden group-hover:block'/>} onClick={(e) => e.stopPropagation()} className='ltr:ml-2 rtl:mr-2 h-[1.1rem]'>

                                                    <ul>
                                                        <li onClick={(e) => _delete_(item.id)}>
                                                            <button>
                                                                <Icons icon='delete' className='max-w-4.5 max-h-4.5'/>
                                                                <span className="px-2 mt-[2px] text-[.85rem] tracking-wide">{config.text.delete}</span>
                                                            </button>
                                                        </li>
                                                    </ul>

                                                </Elements>

                                            </div>

                                        </div>
                            
                                    </div>

                                )
                            }
                        </div> :
                        <div className="empty mt-4">

                            <div className="w-full flex justify-center items-center py-10 no-select">

                                <p className="tracking-wide">{config.text.no_data}</p>

                            </div>

                        </div>
                    }
                </div>

            </div>

            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${menu && '!block xl:!hidden'}`} onClick={() => setMenu(!menu)}></div>

            <Select model={model} setModel={setModel} data={users} onChange={_new_chat_}/>

        </Fragment>

    )

}
