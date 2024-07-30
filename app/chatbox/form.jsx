"use client";
import { api, date, fix_time, storage, fix_date, sound, scroll_down, is_down, scroll_to, print } from '@/public/script/main';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from "@/components/loader";
import Elements from '@/components/elements';
import Icons from '@/components/icons';
import Link from 'next/link';

export default function Form ({ room, data, setData, menu, setMenu, loader, setLoader, current_user }) {

    const config = useSelector((state) => state.config);
    const [last, setLast] = useState('');
    const [content, setContent] = useState('');
    const [scroller, setScroller] = useState(false);
    const ref = useRef(null);

    const _start_room_ = ( messages ) => {

        let new_messages = messages.filter(_ => _.sender_id !== 'system');
        let last_date = '', unread = 0, unreadIndex = 0;

        messages.forEach((message) => {

            if ( message.created_at?.split(' ')[0] !== last_date ) {

                let new_msg = {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)};
                last_date = message.created_at?.split(' ')[0];
                new_messages.splice(new_messages.indexOf(message), 0, new_msg);
                setLast(last_date);

            }
            if ( !message.readen && message.sender_id !== current_user.id ){

                unread++;
                unreadIndex = unreadIndex || new_messages.indexOf(message);

            }

        });
       
        let unread_msg = {id: 'unread-message', sender_id: 'system', created_at: date(), content: `${unread} Unread Messages`};
        if ( unread ) new_messages.splice(unreadIndex, 0, unread_msg);
        
        room.messages = new_messages;
        room.opened = true;
        room.unreaden = 0;
        setData([...data]);
        
        if ( unread ) scroll_to('unread-message');
        else scroll_down('.display-content');
        setTimeout(() => setLoader(false), 200);

    }
    const _update_room_ = ( message ) => {

        if ( date('date') !== last ) {
            room.messages.push({sender_id: 'system', created_at: date(), content: fix_date(message.created_at)});
            setLast(date('date'));
        }
        room.messages = room.messages.filter(_ => !_.unread);
        room.messages.push(message);
        setData([...data]);
        scroll_down('.display-content');
        sound('send');

    }
    const _get_ = async() => {

        const response = await api(`chat/friends/${room.user.id}`);
        _start_room_(response.messages || []);

    }
    const _send_ = async( file ) => {

        let id = date();
        let message = {
            id: id,
            created_at: date(),
            sender_id: current_user.id,
            receiver_id: room.user.id,
            type: file ? 'file' : 'text',
            content: ref.current?.value || '',
            file: file,
            local: true,
        }
        _update_room_(message);
        setContent('');

        let request = { content: message.content, type: message.type, file: message.file?.file }
        const response = await api(`chat/friends/${room.user.id}/send`, request);

        if ( response.message ) {
            room.messages = room.messages.map(_ => _.id === id ? response.message : _);
            setData([...data]);
        }

    }
    useEffect(() => {

        if ( !room?.user?.id ) return;
        ref.current?.focus();
        setContent('');

        if ( room.opened ) {
            if ( room.unreaden ) scroll_to('unread-message');
            else scroll_down('.display-content');
            setTimeout(() => setLoader(false), 200);
        }
        else _get_();

    }, [room]);

    return (

        <Fragment>

            <div className="panel p-0 flex-1 relative overflow-hidden">

                { loader && <Loader className='bg'/> }

                <div className='w-full h-full'>
                    {
                        room.user ?
                        <div className="h-full">

                            <div className="flex items-center px-5 py-3 gap-3 border-b border-[#e0e6ed] dark:border-[#1b2e4b]">

                                <button onClick={() => setMenu(!menu)} type="button" className="xl:hidden hover:text-primary">
                                    <Icons icon='menu' className='w-7 h-7'/>
                                </button>

                                <div className="relative">
                                    
                                    <Elements element='image' value={room.user.image} className='w-10 h-10'/>

                                    { room.user.online && <Icons icon='online' /> }

                                </div>

                                <div>

                                    <p className="font-semibold truncate flex items-center tracking-wide default gap-x-1">

                                        <span className='max-w-[10rem]'>{room.user.name}</span>

                                        {/* <Elements element='user_role' value={room.user.role}/> */}

                                    </p>

                                    <p className="text-white-dark text-xs mt-[.15rem] flex items-center select-none tracking-wide">

                                        { room.user.online ? config.text.online : config.text.offline }

                                    </p>

                                </div>

                            </div>

                            <div onScroll={(e) => setScroller( is_down(e) )} className='overflow-auto h-[calc(100vh_-_240px)] display-content'>

                                <div className="p-5 chat-conversation-box pb-0 min-h-[300px] cursor-default messages-list">

                                    <div className="flex justify-center items-center">
                                        <div className="text-[.75rem] tracking-wide rounded-lg py-[.4rem] px-[.8rem] bg-black/10 dark:bg-gray-800">
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
                                                            <div className='text-[.75rem] tracking-wide rounded-lg py-[.4rem] px-[.8rem] bg-black/10 dark:bg-gray-800'>
                                                                <span>{message.content}</span>
                                                            </div>
                                                        </div> :
                                                        <div className={`flex items-start ${sender && 'justify-end'}`}>

                                                            <div className={`${sender && 'order-2'}`}>

                                                                <Elements element='image' value={image} className='w-8 h-8'/>

                                                            </div>

                                                            <div className="space-y-2 w-[60%] mx-[.6rem] -mt-[1px]">

                                                                <div className={`flex items-center ${sender && 'justify-end'}`}>

                                                                    <div className={`dark:bg-gray-800 rounded-lg bg-black/10 relative tracking-wide ${sender && 'bg-black/10 !bg-primary text-white'}`}>
                                                                        {
                                                                            message.type === 'file' ?
                                                                            <Link href={file_url} target='_blank' download className='select-none hover:opacity-[.8]'>
                                                                                {
                                                                                    message.file.type === 'image' ?
                                                                                    <div className='rounded-lg p-2'>
                                                                                        <img src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-lg'/>
                                                                                    </div> :
                                                                                    message.file.type === 'video' ?
                                                                                    <div className='rounded-lg p-2'>
                                                                                        <video src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-lg'></video>
                                                                                    </div> :
                                                                                    <div className='p-2 w-full min-w-[15rem] rounded-lg'>
                                                                                        <div className='bg-black/30 p-2 rounded-lg flex justify-between items-center'>
                                                                                            <div className="flex justify-start items-center">
                                                                                                <span className="material-symbols-outlined -mt-[.5px] opacity-[.5]">description</span>
                                                                                                <div className="flex justify-start items-center flex-col mx-[.5rem]">
                                                                                                    <span className="w-full flex justify-start items-center truncate tracking-wide max-w-[15rem] text-[.85rem] opacity-[.7]">{message.file.name}</span>
                                                                                                    <span className="w-full flex justify-start items-center max-w-[15rem] text-[.7rem] opacity-[.6]">{message.file.size}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <span className="material-symbols-outlined opacity-[.6]">download</span>
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                            </Link> :
                                                                            <div className='p-4 py-2 text-[.87rem] tracking-wide'>{message.content}</div>
                                                                        }
                                                                    </div>

                                                                </div>

                                                                <div className={`text-white-dark text-[.65rem] tracking-wide px-1 ${sender && 'ltr:text-right rtl:text-left'}`}>
                                                                    { fix_time(message.created_at) }
                                                                </div>

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

                                <div className="flex w-full gap-x-3 rtl:space-x-reverse items-center">

                                    <form className="relative flex-1 input" onSubmit={(e) => { e.preventDefault(); _send_(); }}>

                                        <input ref={ref} value={content} onChange={(e) => setContent(e.target.value)} className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2.5 text-[.9rem]" placeholder={config.text.type_msg} autoComplete='off' required/>

                                        <button type="button" className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 hover:text-primary no-outline">
                                            <Icons icon='face'/>
                                        </button>

                                        <button type="submit" className="absolute ltr:right-4 rtl:left-4 -translate-y-1/2 hover:text-primary top-[1.25rem] rtl:rotate-[-90deg] outline-none">
                                            <Icons icon='send'/>
                                        </button>

                                    </form>

                                    <div className="flex items-center gap-x-3 rtl:space-x-reverse sm:py-0 py-3">

                                        <button className="record-voice bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary outline-none hidden sm:block">
                                            <Icons icon='voice'/>
                                        </button>

                                        <Elements element='upload' multiple={true} onChange={_send_}>
                                            <button className="attach-file bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary outline-none">
                                                <Icons icon='folder'/>
                                            </button>
                                        </Elements>

                                    </div>

                                </div>

                            </div>

                        </div> :
                        <div className="flex items-center justify-center h-full relative select-none">

                            <button onClick={() => setMenu(!menu)} type="button" className="xl:hidden absolute top-4 ltr:left-4 rtl:right-4 hover:text-primary show-side-chat">
                                <Icons icon='menu' className='w-7 h-7'/>
                            </button>

                            <div className="text-white dark:text-[#0e1726]">
                                <Icons icon='chat' className='w-[280px] md:w-[430px] h-[calc(100vh_-_320px)] min-h-[120px]'/>
                            </div>

                        </div>
                    }
                </div>

            </div>

        </Fragment>

    )

}
