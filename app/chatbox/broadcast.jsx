"use client";
import { date, scroll_down, sound, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Echo from "@/utils/echo";

export default function Broadcast ({ data, setData, room, setRoom, current_user }) {

    const config = useSelector((state) => state.config);
    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState(null);

    const _add_ = ( e ) => {

        const message = e.message || {};
        const sender = e.user || {};
        const current = current_user;
        const unreaden = message.sender_id === current.id ? 0 : 1;
        const new_item = { id: date(), created_at: date(), messages: [message], user: sender, unreaden: unreaden };
        let item = data.find(_ => _.user.id === sender.id);

        if ( item ) {

            if ( item.messages.find(_ => _.id === message.id) ) return;

            if ( room.id === item.id ) {
                scroll_down('.display-content');
                sound(message.sender_id === current.id ? 'send' : 'receive');
            }
            else {
                item.unreaden = (item.unreaden || 0) + unreaden;
            }

            item.messages.push(message);
            setData([...data]);

        }
        else {

            setData([...data, new_item]);

        }

    }
    const _delete_ = ( e ) => {

        if ( room?.user?.id === e.user?.id ) setRoom({});
        setData(data.filter(_ => _.user.id !== e.user?.id));

    }
    const _active_ = ( e ) => {

        let item = data.find(_ => _.user.id === e.user?.id);
        if ( !item ) return;
        
        if ( e.receiver === current_user.id ) item.messages = item.messages.map(_ => { _.readen = true; return _; });
        else item.unreaden = 0;

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

        setChannel(Echo.private(`chat.${current_user.id}`));

    }, []);

}
