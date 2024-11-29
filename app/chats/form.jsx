"use client";
import { api, date, fix_time, storage, fix_date, sound, scroll_down, is_down, scroll_to, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loader from "@/components/loader";
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Link from 'next/link';

export default function Form ({ room, data, setData, menu, setMenu, loader, setLoader, current_user, setCurrentUser }) {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const [scroller, setScroller] = useState(false);

    const _start_room_ = ( messages ) => {

        let new_messages = messages.filter(_ => _.sender_id !== 'system');
        let last_date = '';

        messages.forEach((message) => {

            if ( message.created_at?.split(' ')[0] !== last_date ) {

                let new_msg = {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)};
                last_date = message.created_at?.split(' ')[0];
                new_messages.splice(new_messages.indexOf(message), 0, new_msg);

            }

        });
       
        room.messages = new_messages;
        room.opened = true;
        setData([...data]);

        scroll_down('.display-content');
        setTimeout(() => setLoader(false), 200);

    }
    const _get_ = async() => {

        const response = await api(`chats/${room.id}`);
        _start_room_(response.messages || []);

    }
    useEffect(() => {

        if ( !room?.user?.id ) return;
        setCurrentUser(room.client || {});

        if ( room.opened ) {
            if ( room.unreaden ) scroll_to('unread-message');
            else scroll_down('.display-content');
            setTimeout(() => setLoader(false), 200);
        }
        else _get_();

    }, [room]);

    return (

        <div className="panel p-0 flex-1 relative overflow-hidden">

            { loader && <Loader className='bg'/> }

            <div className='w-full h-full'>
                {
                    room.user ?
                    <div className="h-full">

                        <div className="flex items-center px-5 py-3 gap-4 border-b border-[#e0e6ed] dark:border-[#1b2e4b]">

                            <button onClick={() => setMenu(!menu)} type="button" className="xl:hidden hover:text-primary">
                                <Icons icon='menu' className='w-7 h-7'/>
                            </button>

                            <div className='w-full flex justify-center items-center'>

                                <div className='w-full sm:w-[70%] flex justify-between items-center gap-5'>

                                    <div className="flex items-center gap-3">
                                        <Elements element='image' value={room.user?.image} className='w-10 h-10'/>
                                        <div onClick={() => router.push(`/vendor?edit=${room.user?.id}`)} className="font-semibold truncate flex items-center tracking-wide default gap-x-1 duration-300 hover:underline cursor-pointer select-none">
                                            <span className='max-w-[10rem] dark:text-white-light/75 text-[.9rem]'>{room.user?.name}</span>
                                            <Elements element='user_role' value={2}/>
                                        </div>
                                    </div>

                                    <div className='flex items-center'>
                                        <Icons icon='message' className='!w-6 !h-6 dark:text-white-light/75 opacity-[.6]'/>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Elements element='image' value={room.client?.image} className='w-10 h-10'/>
                                        <div onClick={() => router.push(`/client?edit=${room.client?.id}`)} className="font-semibold truncate flex items-center tracking-wide default gap-x-1 duration-300 hover:underline cursor-pointer select-none">
                                            <span className='max-w-[10rem] dark:text-white-light/75 text-[.9rem]'>{room.client?.name}</span>
                                            <Elements element='user_role' value={3}/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div onScroll={(e) => setScroller( is_down(e) )} className='overflow-auto h-[calc(100vh_-_240px)] display-content'>

                            <div className="p-5 chat-conversation-box pb-0 min-h-[300px] cursor-default messages-list">

                                <div className="flex justify-center items-center">
                                    <div className="text-[.75rem] tracking-wide rounded-md py-[.4rem] px-[.8rem] bg-black/5 dark:bg-gray-800">
                                        <span className="warn flex items-start text-[#c9b52f]">
                                            <span className="material-symbols-outlined icon mt-[2px]" style={{ fontSize: '.85rem' }}>lock</span>
                                            <span className='mx-[.4rem] text-[.8rem] tracking-wide'>
                                                {config.text.encrypt_messages}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {
                                    room.messages.map((message, index) => {
                                        
                                        let sender = message.sender_id === current_user.id;
                                        let image = sender ? current_user.image : room.user.image;
                                        let file_url = message.local ? message.file?.url : `${storage}/${message.file?.url}`;

                                        return (

                                            <div key={index} id={message.id} className='pt-3 pb-0'>
                                                {
                                                    message.sender_id === 'system' ?
                                                    <div className="flex justify-center items-center">
                                                        <div className='text-[.75rem] tracking-wide rounded-md py-[.4rem] px-[.8rem] bg-black/5 dark:bg-gray-800'>
                                                            <span className='!font-nunito !font-semibold'>{message.content}</span>
                                                        </div>
                                                    </div> :
                                                    message.sender_id === 'unreaden' ?
                                                    <div className="flex justify-center items-center">
                                                        <div className='text-[.85rem] tracking-wide rounded-md shadow-md py-[.4rem] px-[1rem] bg-black/5 dark:bg-gray-800'>
                                                            <span className='font-semibold'>{message.content}</span>
                                                        </div>
                                                    </div> :
                                                    <div className={`flex items-start ${sender && 'justify-end'}`}>

                                                        <div className={`${sender && 'order-2'} ${room.messages[index-1]?.sender_id === message.sender_id && 'invisible'}`}>

                                                            <Elements element='image' value={image} className='w-8 h-8'/>

                                                        </div>

                                                        <div className="space-y-2 w-[60%] mx-[.6rem] -mt-[1px]">

                                                            <div className={`flex items-center ${sender && 'justify-end'}`}>

                                                                <div className={`bg-primary/10 dark:bg-primary/10 rounded-md border border-primary/50 relative tracking-wide ${sender ? '!bg-white-light/75 dark:!bg-menu-dark !border-gray-200 dark:!border-border-dark dark:!text-white-light' : '!text-primary'}`}>
                                                                    {
                                                                        message.type === 'file' ?
                                                                        <Link href={file_url} target='_blank' download className='select-none hover:opacity-[.8]'>
                                                                            {
                                                                                message.file.type === 'image' ?
                                                                                <div className='rounded-md p-2'>
                                                                                    <img src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-md'/>
                                                                                </div> :
                                                                                message.file.type === 'video' ?
                                                                                <div className='rounded-md p-2'>
                                                                                    <video src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-md'></video>
                                                                                </div> :
                                                                                <div className='p-2 w-full min-w-[15rem] rounded-md'>
                                                                                    <div className={`bg-black/30 p-2 px-4 rounded-md flex justify-between items-center border border-border dark:border-border-dark ${!sender && '!border-primary/50'}`}>
                                                                                        <div className="flex justify-start items-center">
                                                                                            <span className="material-symbols-outlined -mt-[.5px] opacity-[.5] text-[1.7rem]">description</span>
                                                                                            <div className="flex justify-start items-center flex-col mx-[.5rem]">
                                                                                                <span className="w-full flex justify-start items-center truncate tracking-wide max-w-[15rem] text-[.85rem] opacity-[.7]">{message.file.name}</span>
                                                                                                <span className="w-full flex justify-start items-center max-w-[15rem] text-[.7rem] opacity-[.6]">{message.file.size}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <span className="material-symbols-outlined opacity-[.6] text-[1.5rem]">download</span>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </Link> :
                                                                        <div className={`p-4 py-2.5 text-[.87rem] tracking-wide`}>{message.content}</div>
                                                                    }
                                                                </div>

                                                            </div>
                                                            
                                                            {
                                                                room.messages[index+1]?.sender_id !== message.sender_id &&
                                                                <div className={`text-gray-700 dark:text-white-dark !font-semibold text-[.75rem] !font-nunito tracking-wide px-1 ${sender && 'ltr:text-right rtl:text-left'}`}>
                                                                    { fix_time(message.created_at) }
                                                                </div>
                                                            }

                                                        </div>

                                                    </div>
                                                }
                                            </div>

                                        );

                                    })
                                }

                            </div>

                            { scroller && <Elements element='scroll_down' onClick={() => scroll_down('.display-content', true)}/> }

                        </div>

                        <div className="px-5 py-2 sm:py-5 absolute bottom-0 left-0 w-full select-none">

                            <div className="w-full flex justify-center items-center text-warning text-[.9rem] tracking-wide cursor-default">
                                {config.text.cannot_reply}
                            </div>

                        </div>

                    </div> :
                    <div className="flex items-center justify-center h-full relative select-none">

                        <button onClick={() => setMenu(!menu)} type="button" className="xl:hidden absolute top-4 ltr:left-4 rtl:right-4 hover:text-primary show-side-chat">
                            <Icons icon='menu' className='w-7 h-7'/>
                        </button>

                        <div className="text-white dark:text-panel-dark">
                            <Icons icon='chat' className='w-[280px] md:w-[430px] h-[calc(100vh_-_320px)] min-h-[120px]'/>
                        </div>

                    </div>
                }
            </div>

        </div>

    )

}
