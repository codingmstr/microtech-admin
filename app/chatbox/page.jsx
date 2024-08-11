"use client";
import { api } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Friends from "./friends";
import Form from "./form";
import Broadcast from "./broadcast";

export default function Chatbox () {

    const config = useSelector((state) => state.config);
    const [user, setUser] = useState({id: 1, name: 'Admin Panel', image: 'user/6.png'});
    const [menu, setMenu] = useState(false);
    const [room, setRoom] = useState({});
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);

    const _get_ = async() => {

        const response = await api('chat/friends');
        setData(response.relations || []);
        setUsers(response.users || []);

    }
    useEffect(() => {

        _get_();

    }, []);

    return (
    
        <div className={`chat-div flex gap-5 relative h-[calc(100vh_-_100px)] ${config.menu === 'horizontal' && 'lg:h-[calc(100vh_-_152px)]'}`}>
           
            <Friends 
                data={data} setData={setData} room={room} setRoom={setRoom} users={users} setUsers={setUsers} 
                menu={menu} setMenu={setMenu} setLoader={setLoader} current_user={user}
            />

            <Form 
                room={room} setRoom={setRoom} data={data} setData={setData} menu={menu} setMenu={setMenu} 
                loader={loader} setLoader={setLoader} current_user={user}
            />

            <Broadcast data={data} setData={setData} room={room} setRoom={setRoom} current_user={user}/>

        </div>

    )

}
