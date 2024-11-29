"use client";
import { api, date, scroll_down, sound, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Echo from "@/utils/echo";

export default function Broadcast ({ data, setData, room, setRoom }) {

    const config = useSelector((state) => state.config);
    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState(null);

    const _add_ = ( e ) => {

        const message = e.message || {};
        const sender = e.user || {};
        const new_item = { id: date(), created_at: date(), messages: [message], user: sender, unreaden: 0 };
        let item = data.find(_ => _.user.id === sender.id);

        if ( item ) { item.messages.push(message); setData([...data]); }
        else setData([...data, new_item]);

    }
    const _delete_ = ( e ) => {

        if ( room?.user?.id === e.user?.id ) setRoom({});
        setData(data.filter(_ => _.user.id !== e.user?.id));

    }
    const _active_ = ( e ) => {

        let item = data.find(_ => _.user.id === e.user?.id);
        if ( !item ) return;
        
        item.messages = item.messages.map(_ => { _.readen = true; return _; });
        setData([...data]);

    }
    useEffect(() => {
        
        if ( !message || message.sender === config.user.id ) return;
        if ( message.action === 'message' )  _add_(message);
        if ( message.action === 'delete' )  _delete_(message);
        if ( message.action === 'active' )  _active_(message);

    }, [message]);
    useEffect(() => {

        if ( !channel ) return;
        channel.listen('.chat.box', setMessage);

    }, [channel]);
    useEffect(() => {

        setChannel(Echo.private(`chats`));

    }, []);

}
