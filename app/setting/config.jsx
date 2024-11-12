"use client";
import { api, alert_msg } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import Elements from '@/components/elements';

export default function Configrations ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const [items, setItems] = useState([
        {name: 'allow_mails', label: 'mails'},
        {name: 'allow_messages', label: 'messages'},
        {name: 'allow_notifications', label: 'notifications'},
        {name: 'allow_categories', label: 'categories'},
        {name: 'allow_products', label: 'products'},
        {name: 'allow_coupons', label: 'coupons'},
        {name: 'allow_orders', label: 'orders'},
        {name: 'allow_reviews', label: 'reviews'},
        {name: 'allow_blogs', label: 'blogs'},
        {name: 'allow_comments', label: 'comments'},
        {name: 'allow_replies', label: 'replies'},
        {name: 'allow_contacts', label: 'contacts'},
        {name: 'allow_reports', label: 'reports'},
        {name: 'allow_emails', label: 'emails'},
        {name: 'allow_vendors', label: 'vendors'},
        {name: 'allow_clients', label: 'clients'},
        {name: 'allow_logins', label: 'logins'},
        {name: 'allow_payments', label: 'payments'},
        {name: 'allow_pay_later', label: 'pay_later'},
        {name: 'allow_deposits', label: 'deposits'},
        {name: 'allow_withdraws', label: 'withdraws'},
        {name: 'running', label: 'running'},
    ]);
    const update = async(name, value) => {

        let _data_ = data;
        _data_[name] = value;
        setData({..._data_});
        alert_msg(config.text.settings_updated);
        const response = await api('setting/option', _data_);

    }
    useEffect(() => {
        document.title = `${config.text.configrations} | ${config.text.settings}`;
    }, []);

    return (

        <div className={`w-full flex flex-col cursor-default ${config.animation} animate__animated`}>

            <div className="relative w-full min-h-[80vh]">

                {
                    loader ? <Loader /> :
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 cursor-default">
                        {
                            items.map((item, index) => 
                                <Elements 
                                    key={index} element='toggle_panel' name={item.label} type={`options_${item.label}`} 
                                    value={data[item.name]} onChange={(e) => update(item.name, e)}
                                />
                            )
                        }
                    </div>
                }

            </div>
            
        </div>

    )

}
