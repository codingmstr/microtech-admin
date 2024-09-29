"use client";
import { api, alert_msg } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';

export default function Danger ({ data, setData }) {

    const config = useSelector((state) => state.config);
    const [loader, setLoader] = useState(false);

    const [items, setItems] = useState([
        'mails', 'messages', 'notifications', 'products',
        'coupons', 'orders', 'reviews', 'blogs', 'comments', 'replies',
        'contacts', 'reports', 'admins', 'vendors', 'clients',
    ]);
    const _delete_ = async( item ) => {

        if ( !confirm(`${config.text.ask_delete} ${config.text.all} ${config.text[item]} ⚡ ?`) ) return;
        setLoader(true);
        const response = await api('setting/delete', {item: item});
        setLoader(false);

        if ( !response.status ) alert_msg(config.text.alert_error, 'error');
        else alert_msg(`${config.text.all} ${config.text[item]} ${config.text.item_deleted_successfully}`);

    }
    useEffect(() => {
        document.title = `${config.text.danger_zone} | ${config.text.settings}`;
    }, []);

    return (

        <div className="w-full flex flex-col cursor-default">

            <div className="relative w-full min-h-[80vh]">
                {
                    loader ? <Loader /> :
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 cursor-default">
                        {
                            items.map((item, index) => 
                                <div key={index} className="panel w-full h-full space-y-3 cursor-default">
                                    <h5 className="font-semibold text-[1.05rem] dark:text-white-light rtl:text-[1rem]">{config.text.delete} {config.text[item]}</h5>
                                    <p className='pb-1 leading-6 dark:text-white-light/75 text-[.8rem]'>
                                        <span className="text-danger">{config.text.note} :</span>
                                        <span className='px-2'>{config.text.delete_settings_data}</span>
                                    </p>
                                    <button onClick={() => _delete_(item)} className="btn btn-danger py-1.5 shadow-none select-none hover:opacity-[.8] tracking-wide">
                                        {config.text.delete}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
            
        </div>

    )

}
