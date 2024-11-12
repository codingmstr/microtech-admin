"use client";
import { alert_msg, api, fix_files, scroll_down, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Elements from "@/components/elements";
import Icons from "@/components/icons";
import Loader from "@/components/loader";

export default function Form ({ data, setData, users, setTab, setType }) {

    const config = useSelector((state) => state.config);
    const [mail, setMail] = useState({});
    const [files, setFiles] = useState([]);
    const [loader, setLoader] = useState(false);

    const _response_ = ( res ) => {

        if ( !res.mail ) { alert_msg(config.text.alert_error, 'error'); return setLoader(false); }
        alert_msg(config.text.mail_successfully);
        setData([...data, res.mail]);
        setTab('table');
        setType('sent');

    }
    const _send_ = async() => {

        if ( !mail.user_id ) return alert_msg(config.text.invalid_user, 'error');
        if ( !mail.title ) return alert_msg(config.text.invalid_title, 'error');

        setLoader(true);
        const request = {...mail, description: `${mail.description || ''} ${mail.text || ''}`, ...fix_files({new_files: files})};
        const response = await api('mail/send', request);
        _response_(response);

    }
    useEffect(() => {

        if ( !files.length ) return;
        scroll_down('.mail-content', true);

    }, [files]);
    return (

        <div className="relative w-full h-full overflow-hidden">
            
            <div className="w-full flex items-center p-4 gap-4 border-b border-[#e0e6ed] dark:border-[#1b2e4b] select-none">

                <button type="button" onClick={() => setTab('table')} className="hover:text-primary">
                    <Icons icon='arrow_left'/>
                </button>

                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">{config.text.new_message}</h4>

            </div>

            <div className="w-full p-6 relative overflow-y-auto h-[calc(100%_-_70px)] mail-content">
                {
                    loader ? <Loader className='bg'/> :
                    <div className="w-full space-y-6">

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pb-1">

                            <Elements element='select_menu' name='user' value={mail.user_id} roles={true} children={users} onChange={(id) => setMail({...mail, user_id: id})}/>
                            
                            <Elements element='input' name='title' value={mail.title} onChange={(e) => setMail({...mail, title: e})}/>

                            <Elements element='input' name='description' value={mail.description} onChange={(e) => setMail({...mail, description: e})}/>

                        </div>

                        <div className="w-full">
                            <Elements element='editor' name='content' value={mail.content} onChange={(e, t) => setMail({...mail, content: e, text: t})} className='medium'/>
                        </div>
                        
                        <div className="w-full">
                            <Elements element='upload' multiple onChange={(f) => setFiles((prev) => [...prev, f])} className='w-[10rem]'/>
                        </div>

                        <div className="w-full">
                            <Elements element='file_type' label='attachements' children={files}/>
                        </div>
                            
                        <div className="w-full flex justify-end items-center gap-3">

                            <button onClick={() => _send_()} className="btn btn-success shadow-none hover:opacity-[.8] !py-2.5 text-[1rem] w-full sm:w-[9rem] tracking-wide">{config.text.submit}</button>
                            <button onClick={() => setTab('table')} className="btn btn-danger shadow-none hover:opacity-[.8] !py-2.5 text-[1rem] w-full sm:w-[9rem] tracking-wide">{config.text.cancel}</button>

                        </div>

                    </div>
                }   
            </div>

        </div>

    )

}
