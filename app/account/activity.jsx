"use client";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Report from "@/app/report/page.jsx";

export default function Activity () {

    const config = useSelector((state) => state.config);

    useEffect(() => {
        document.title = `${config.text.activity_logs} | ${config.text.account}`;
    }, []);

    return (

        <div className="relative">
            
            <Report item_filters={{'admin_id': config.user.id}}/>

        </div>

    )

}
