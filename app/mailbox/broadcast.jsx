"use client";
import { sound, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import Echo from "@/utils/echo";

export default function Broadcast ({ data, setData, current_user }) {

    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState(null);

    const _add_ = ( e ) => {

        let _data_ = data;
        _data_.unshift(e.mail);
        setData([..._data_]);

    }
    useEffect(() => {
        
        if ( !message ) return;
        _add_(message);

    }, [message]);
    useEffect(() => {

        if ( !channel ) return;
        channel.listen('.mail.box', setMessage);

    }, [channel]);
    useEffect(() => {

        setChannel(Echo.private(`mail.${current_user.id}`));

    }, []);

}
