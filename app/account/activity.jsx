"use client";
import { useSelector } from 'react-redux';
import Report from "@/app/report/page.jsx";

export default function Activity () {

    const config = useSelector((state) => state.config);

    return (

        <div className="relative">
            
            <Report item_filters={{'admin_id': config.user.id}}/>

        </div>

    )

}
