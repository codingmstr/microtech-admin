"use client";
import { api, alert_msg } from "@/public/script/main";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';

export default function Configrations ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const [items, setItems] = useState([
        'mailbox', 'chatbox', 'notifications', 'categories', 'products',
        'coupons', 'orders', 'reviews', 'blogs', 'comments', 'replies',
        'contacts', 'reports', 'logins', 'running',
    ]);
    const update = async(item, value) => {

        setLoader(true);
        const response = await api('setting/option', data);
        setLoader(false);

        if ( !response.status ) return alert_msg(config.text.alert_error, 'error');

        let _data_ = data;
        _data_[item] = value;
        setData({..._data_});
        alert_msg(config.text.settings_updated);

    }
    return (

        <div className="w-full flex flex-col cursor-default">

            <div className="relative w-full min-h-[80vh]">

                {
                    loader ? <Loader /> :
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 cursor-default">
                        {
                            items.map((item, index) => 
                                <Elements 
                                    key={index} element='toggle_panel' name={item} type={`options_${item}`} 
                                    value={data[item]} onChange={(e) => update(item, e)}
                                />
                            )
                        }
                    </div>
                }

            </div>
            
        </div>

    )

}
