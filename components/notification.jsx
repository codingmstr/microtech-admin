"use client";
import { date, scroll_down, sound, print } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Echo from "@/utils/echo";

export default function Notification () {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        
        // if ( !message || message.sender === config.user.id ) return;
        if ( !message ) return;
        dispatch(actions.toggle_notification({type: 'report', ...message}));

    }, [message]);
    useEffect(() => {

        if ( !channel ) return;
        channel.listen('.notify.box', setMessage);

    }, [channel]);
    useEffect(() => {

        setChannel(Echo.private('notification'));

    }, []);

}
