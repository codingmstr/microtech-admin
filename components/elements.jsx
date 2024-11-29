"use client";
import { lower, storage, alert_msg, read_file, fix_date, fix_number, print, copy } from "@/public/script/main";
import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import { Countries } from "@/utils/countries";
import { Languages } from "@/utils/languages";
import { Currencies } from "@/utils/currencies";
import { Keys } from "@/utils/keys";
import Link from "next/link";
import Dropdown from './menu';
import Quill from './quill';
import Select from './select';
import Slider from './slider';
import Icons from './icons';
import Chart from "./chart";
import Includes_List from "./includes_list";
import Times_List from "./times_list";

export default function Elements ( props ) {

    const {
        element, value, name, label, type, rows, visible, readOnly, className='',
        onChange, onClick, children, button, multiple, focus, roles, slider,
        color, icon, height, copyable, onKeyUp, inputRef, no_translate, items,
    } = props
    const config = useSelector((state) => state.config);
    const ref = useRef(null);
    const [visibility, setVisibility] = useState(visible || false);
    const [model, setModel] = useState(false);
    const [src, setSrc] = useState(`${storage}/${value}`);
    const [langs, setLangs] = useState([]);
    const [lang, setLang] = useState('ar');

    const change_file = async( f, type ) => {

        let file = await read_file(f, type);
        if ( !file ) return alert_msg(config.text.error_format, 'error');
        setSrc(file.url);
        onChange(file);

    }
    const on_file = async( files, type ) => {

        if ( multiple ) Array.from(files).forEach((f) => change_file(f, type));
        else change_file(files[0], type);
        ref.current.value = '';

    }
    useEffect(() => {

        setLangs(['ar', 'en', 'fr', 'ru', 'it']);
        setLang(localStorage.getItem('lang') || 'ar');
        setSrc(`${storage}/${value}`);
        if ( focus ) setTimeout(_ => ref.current?.focus(), 100);

    }, []);

    return (

        <div>
            {
                element === 'image' &&
                <div className={`image overflow-hidden bg-white-dark dark:bg-menu-dark object-cover layer-div select-none flex justify-center items-center p-[1.5px] ${type !== 'md' && type !== 'qr' ? 'rounded-full' : type === 'md' ? 'rounded-[.3rem] md' : '!p-0'} ${className || 'w-full h-full'}`}>
                    <img 
                        src={`${storage}/${value}`} 
                        className={`w-full h-full object-cover ${type !== 'md' && type !== 'qr' ? 'rounded-full' : type === 'md' ? 'rounded-[.3rem] md' : ''}`} 
                        onError={(e) => e.target.src = `/media/layout/${type !== 'md' && type !== 'qr' ? 'user' : 'error'}_icon.png`} 
                        onLoad={(e) => e.target.src.includes('_icon') ? e.target.classList.add('empty-image') : e.target.classList.remove('empty-image')}
                    />
                </div>
            }
            {
                element === 'image_edit' &&
                <div className={`relative group flex justify-center items-center select-none overflow-hidden bg-[#fafafa] dark:bg-black/20 m-auto border border-border dark:border-border-dark ${type !== 'md' && type !== 'qr' ? 'rounded-full' : 'rounded-md md'} ${className || 'w-[8rem] h-[8rem]'} ${readOnly && 'layer-div'}`}>
                    <img 
                        src={src} 
                        className={`object-cover ${type === 'md' ? 'w-full h-full md' : type === 'qr' ? 'object-fill max-w-auto h-[80%]' : 'w-full h-full'}`} 
                        onError={(e) => e.target.src = `/media/layout/${type !== 'md' && type !== 'qr' ? 'user' : 'error'}_icon.png`} 
                        onLoad={(e) => e.target.src.includes('_icon') ? e.target.classList.add('empty-image') : e.target.classList.remove('empty-image')}
                    />
                    {
                        !readOnly &&
                        <div onClick={() => ref.current?.click()} className='absolute top-0 left-0 w-full h-full cursor-pointer flex justify-center items-center flex-col bg-black/25 dark:bg-black/75 text-white duration-300 opacity-0 group-hover:opacity-[1] space-y-2'>
                            <Icons icon='edit'/>
                            <span>{config.text.edit}</span>
                            <input type="file" ref={ref} onChange={(e) => on_file(e.target.files || [], 'image')} className="hidden"/>
                        </div>
                    }
                </div>
            }
            {
                element === 'upload' &&
                <div onClick={() => ref.current?.click()} className={`${className}`}>
                    {
                        children ||
                        <button type="button" className='btn btn-primary w-full cursor-pointer gap-2 shadow-none hover:opacity-[.8]'>
                            <Icons icon='upload'/>
                            <span>{config.text.upload_file}</span>
                        </button>
                    }
                    <input type="file" ref={ref} onChange={(e) => on_file(e.target.files || [], type)} multiple={multiple || false} className="hidden"/>
                </div>
            }
            {
                element === 'input' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-center'} ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[6rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'} ${no_translate && '!font-nunito'}`}>{no_translate ? label || name : config.text[lower(label || name)]}</label>
                    <input id={name} type={type || 'text'} onKeyUp={onKeyUp} onFocus={(e) => copyable ? copy(value, e.target) : ''} value={name?.includes('_at') && !type.includes('date') ? fix_date(value) : value || (value === 0 ? 0 : '')} onChange={(e) => onChange(e.target.value)} readOnly={readOnly} ref={focus ? ref : inputRef} min='0' className={`form-input flex-1 ${readOnly ? 'cursor-default': ''}`} autoComplete="off"/>
                </div>
            }
            {
                element === 'password' &&
                <div className={`w-full relative ${className.includes('flex') && 'flex justify-center items-center'} ${className}`}>
                    {
                        visibility ?
                        <div className="toggle-password flex pointer ltr:right-[.5rem] rtl:left-[.5rem]" onClick={() => setVisibility(false)}>
                            <span className="material-symbols-outlined icon">visibility</span>
                        </div> :
                        <div className="toggle-password flex pointer ltr:right-[.5rem] rtl:left-[.5rem]" onClick={() => setVisibility(true)}>
                            <span className="material-symbols-outlined icon">visibility_off</span>
                        </div>
                    }
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[6rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'} ${no_translate && '!font-nunito'}`}>{no_translate ? label || name : config.text[lower(label || name)]}</label>
                    <input id={name} type={visibility ? 'text1' : 'password'} value={value || ''} onChange={(e) => onChange(e.target.value)} ref={ref} className={`form-input flex-1 ${readOnly ? 'cursor-default': ''} !font-nunito`} autoComplete="off"/>
                </div>
            }
            {
                element === 'textarea' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-start'} ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[6rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'} ${no_translate && '!font-nunito'}`}>{no_translate ? label || name : config.text[lower(label || name)]}</label>
                    <textarea id={name} value={value || ''} readOnly={readOnly} onChange={(e) => onChange(e.target.value)} rows={rows || 5} ref={ref} className={`form-textarea min-h-[80px] resize-none ${readOnly && 'cursor-default'}`}></textarea>
                </div>
            }
            {
                element === 'editor' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-start'} small ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[6rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'} ${no_translate && '!font-nunito'}`}>{no_translate ? label || name : config.text[lower(label || name)]}</label>
                    <Quill value={value || ''} onChange={onChange}/>
                </div>
            }
            {
                element === 'select' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-center'} ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[6rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'} ${no_translate && '!font-nunito'}`}>{no_translate ? label || name : config.text[lower(label || name)]}</label>
                    <select id={name} value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={readOnly} ref={ref} className={`flex-1 ${readOnly ? 'form-input cursor-default': 'form-select cursor-pointer'}`} autoComplete="off">
                        <option value="">--</option>
                        {
                            type === 'country' ? Countries?.map((item, index) => <option key={index} value={item.code}>{config.lang === 'ar' ? item.ar_name : item.en_name}</option>) :
                            type === 'phone' ? Keys?.map((item, index) => <option key={index} value={item.code}>({item.code}) {config.lang === 'ar' ? item.ar_name : item.en_name}</option>) :
                            type === 'language' ? Languages?.map((item, index) => <option key={index} value={item.code}>{config.lang === 'ar' ? item.ar_name : item.en_name}</option>) :
                            type === 'baseLanguage' ? Languages?.slice(0, 6)?.map((item, index) => <option key={index} value={item.code}>{config.lang === 'ar' ? item.ar_name : item.en_name}</option>) :
                            type === 'currency' ? Currencies?.map((item, index) => <option key={index} value={item.code}>{item.name}</option>) :
                            type === 'rate' ? [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((item, index) => <option key={index} value={item}>{fix_number(item, true).replace('00', '0')}</option>) :
                            type === 'status' ? ['pending', 'request', 'confirmed', 'cancelled'].map((item, index) => <option key={index} value={item}>{config.text[item]}</option>) :
                            type === 'service' ? [{id: 'online', name: 'online_service'}, {id: 'offline', name: 'offline_service'}].map((item, index) => <option key={index} value={item.id}>{config.text[item.name]}</option>) :
                            type === 'gender' ? ['male', 'female'].map((item, index) => <option key={index} value={item}>{config.text[item]}</option>) :
                            type === 'genders' ? ['male', 'female', 'all'].map((item, index) => <option key={index} value={item}>{config.text[item]}</option>) :
                            children?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                        }
                    </select>
                </div>
            }
            {
                element === 'toggle' &&
                <div className={`w-full flex justify-start items-center select-none ${className}`}>
                    <label className="w-12 h-6 relative">
                        <input id={name} checked={value || false} onChange={() => onChange(!value)} ref={ref} type="checkbox" className="absolute w-full h-full opacity-0 z-10 cursor-pointer peer"/>
                        <span className="bg-[#ebedf2] dark:bg-menu-dark block h-full rounded-full before:absolute before:left-1 
                            before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 
                            before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary 
                            before:transition-all before:duration-300">
                        </span>
                    </label>
                    <label htmlFor={name} className="ltr:pl-3 rtl:pr-3 cursor-pointer max-w-[60%] overflow-hidden !text-[1rem]">{config.text[lower(label || name)]}</label>
                </div>
            }
            {
                element === 'button' &&
                <button type="button" onClick={onClick} className={`btn btn-primary w-full gap-2 shadow-none select-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <span>{config.text[lower(name || 'button')]}</span>
                </button>
            }
            {
                element === 'add_button' &&
                <button type="button" onClick={onClick} className={`btn btn-primary w-full gap-1 shadow-none select-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <Icons icon='add'/>
                    <span>{config.text[lower(name || 'add_new')]}</span>
                </button>
            }
            {
                element === 'save_button' &&
                <button type="button" onClick={onClick} className={`btn btn-success w-full select-none gap-2 shadow-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <Icons icon='save'/>
                    <span>{config.text[lower(name || 'save')]}</span>
                </button>
            }
            {
                element === 'cancel_button' &&
                <button type="button" onClick={onClick} className={`btn btn-warning w-full select-none gap-2 shadow-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <Icons icon='cancel'/>
                    <span>{config.text[lower(name || 'cancel')]}</span>
                </button>
            }
            {
                element === 'delete_button' &&
                <button type="button" onClick={onClick} className={`btn btn-danger w-full select-none gap-2 shadow-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <Icons icon='delete'/>
                    <span>{config.text[lower(name || 'delete')]}</span>
                </button>
            }
            {
                element === 'upload_button' &&
                <button type="button" onClick={onClick} className={`btn btn-primary w-full select-none gap-2 shadow-none hover:opacity-[.8] text-[1rem] !py-2.5 ${className}`}>
                    <Icons icon='upload'/>
                    <span>{config.text.upload_file}</span>
                </button>
            }
            {
                element === 'select_menu' &&
                <div className={`w-full relative ${className.includes('flex') && 'flex justify-center items-center'} ${className}`}>
                    {
                        (children.find(_ => _.id == value)?.id && !readOnly) ?
                        <div className="reset-icon flex ltr:right-[.5rem] rtl:left-[.5rem]" onClick={() => onChange(0)}>
                            <span className="material-symbols-outlined icon">close</span>
                        </div> : ''
                    }
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[5.5rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-4'}`}>{config.text[lower(label || name)]}</label>
                    <input id={name} type={'text'} value={children.find(_ => _.id == value)?.name || children.find(_ => _.id == value)?.title || children.find(_ => _.id == value)?.content || '--'} readOnly={true} onClick={() => !readOnly && setModel(true)} className={`form-input flex-1 for-select-menu ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}/>
                    { !readOnly && <Select model={model} setModel={setModel} data={children} label={lower(label || name)} onChange={onChange} roles={roles} type={(name.includes('client') || name.includes('vendor') || name.includes('admin') || name.includes('user')) ? '' : 'md'}/> }
                </div>
            }
            {
                element === 'slider' &&
                <div className={`w-full ${className}`}>
                    { label && <label className='cursor-default line-clamp-1 mb-4'>{config.text[lower(label)]}</label> }
                    <Slider data={value || []} slider={slider} onChange={onChange} readOnly={readOnly}/>
                </div>
            }
            {
                element === 'menu' &&
                <div className="dropdown select-none" onClick={onClick}>
                    <Dropdown placement={type} btnClassName={className} button={button}>
                        {children}
                    </Dropdown>
                </div>
            }
            {
                element === 'user_role' &&
                <span className={`select-none ${className}`}>
                    - &nbsp; 
                    {
                        value == 1 && type == 'super' ?
                        <span className='text-[.75rem] text-danger'>{config.text.super_admin}</span>
                        : value == 1 && type == 'supervisor' ?
                        <span className='text-[.75rem] text-orange-600'>{config.text.supervisor}</span>
                        : value == 1 ?
                        <span className='text-[.75rem] text-warning'>{config.text.a_admin}</span>
                        : value == 2 ?
                        <span className='text-[.75rem] text-primary'>{config.text.a_vendor}</span>
                        :
                        <span className='text-[.75rem] text-success'>{config.text.a_client}</span>
                    }
                </span>
            }
            {
                element === 'scroll_down' &&
                <div onClick={onClick} className={`absolute right-[1.3rem] bottom-[5rem] rtl:left-[1.3rem] rtl:right-auto w-[2.2rem] h-[2.2rem] text-white bg-primary rounded-full flex justify-center items-center cursor-pointer border border-primary hover:opacity-[.8] ${className}`}>
                    <span className="material-symbols-outlined icon mt-[2px] !text-[1.6rem]">expand_more</span>
                </div>
            }
            {
                element === 'file_type' &&
                <div className={`w-full select-none ${className}`}>
                    {
                        children.length ?
                        <div className="w-full pt-6 border-t border-border dark:border-border-dark">
                            
                            <div className="tracking-wide text-[1rem]">{config.text[label || 'attachements']}</div>

                            <div className="flex items-center flex-wrap mt-6">
                                {
                                    children.map((file, index) => 
                                        <a key={index} href={`${storage}/${file.url}`} download target='_blank' className="cursor-pointer flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-border dark:border-border-dark rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group">
                                            {
                                                file.type === 'image' ?
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                    <path opacity="0.5" d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                : file.type === 'video' ?
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                    <path opacity="0.5" d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>:
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z" fill="currentColor" />
                                                    <path opacity="0.5" d="M6 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path opacity="0.5" d="M6 18H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path opacity="0.5" d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                            }
                                            <div className="ltr:ml-3 rtl:mr-3">
                                                <p className="text-xs text-primary font-semibold">{file.name || ''}</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-600 text-left">{file.size || ''}</p>
                                            </div>
                                            <div className="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"></div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    )
                                }
                            </div>

                        </div> : ''
                    }
                </div>
            }
            {
                element === 'tabs' &&
                <div className={`panel panel-tabs w-full p-0 rounded-md overflow-hidden flex justify-start items-center gap-x-3 ${className}`}>
                    <ul className="w-full flex font-semibold whitespace-nowrap lg:flex-wrap tracking-wide overflow-x-auto select-none">
                        {children}
                    </ul>
                </div>
            }
            {
                element === 'toggle_panel' &&
                <div className={`panel w-full h-full space-y-3 ${className}`}>
                    <h5 className="font-semibold text-[1.05rem] tracking-wide dark:text-white-light rtl:text-[1rem]">{config.text[label || name]}</h5>
                    <p className='pb-1 leading-6 line-clamp-2 dark:text-white-light/75 text-[.8rem]' title={config.text[type]}>{config.text[type]}</p>
                    <label className="w-12 h-6 relative">
                        <input type="checkbox" checked={value || false} onChange={() => onChange(!value)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"/>
                        <span htmlFor="custom_switch_checkbox1" className="bg-[#ebedf2] dark:bg-menu-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                </div>
            }
            {
                element === 'page_title' &&
                <div className="panel !p-6 flex justify-between items-center gap-4 cursor-default !bg-white dark:!bg-[#1b3c48]/50">

                    <div className='flex flex-col gap-5 px-2'>

                        <p className='text-[1.2rem] font-semibold dark:text-white tracking-wide'>
                            {config.text[label]}
                        </p>
                        
                        <div className='flex items-center gap-2 text-[.95rem]'>
                            <Link href='/' className='dark:text-white-light/75 hover:underline select-none'>{config.text.home}</Link>
                            <span className="select-none">•</span>
                            <p className='dark:text-white-light'>
                                {config.text[name]}
                            </p>
                        </div>

                    </div>

                    <div className='w-[6rem] h-[6rem] sm:w-[9rem] sm:h-[8rem] absolute -bottom-4 ltr:right-5 rtl:left-5'>
                        <div className='layer-div'>
                            <img src="/media/layout/chatbc.png" className='max-w-full h-full'/>
                        </div>
                    </div>

                </div>
            }
            {
                element === 'time_list' &&
                <div className="flex flex-col gap-5">
                    <label className='cursor-default line-clamp-1 mb-1'>{config.text.available_times}</label>
                    <Times_List value={value} onChange={onChange}/>
                </div>
            }
            {
                element === 'include_list' &&
                <div className="flex flex-col gap-5">
                    <label className='cursor-default line-clamp-1 mb-2'>{config.text.what_include}</label>
                    <Includes_List value={value} onChange={onChange}/>
                </div>
            }
            {
                element === 'json_input' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-start'} ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[5.5rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'}`}>{config.text[lower(label || name)]}</label>
                    <ul className="w-full pb-6 flex items-center gap-2.5">
                        {
                            langs.map((item, index) =>
                                <li key={index} onClick={() => setLang(item)} className={`py-1.5 px-3.5 rtl:pb-2 rounded-[.5rem] cursor-pointer border border-border dark:border-border-dark font-semibold tracking-wide text-[.9rem] select-none bg-white-light/30 dark:bg-black/20 duration-300 hover:bg-white-light dark:hover:bg-menu-dark ${lang === item && '!bg-white-light dark:!bg-menu-dark shadow-md dark:!text-white-light'}`}>
                                    {config.text[item]}
                                </li>
                            )
                        }
                    </ul>
                    {
                        langs.map((item, index) => 
                            <input 
                                key={index}
                                id={name} 
                                type={type || 'text'} 
                                onKeyUp={onKeyUp} 
                                onFocus={(e) => copyable ? copy(value, e.target) : ''} 
                                readOnly={readOnly} 
                                ref={focus ? ref : inputRef} 
                                autoComplete="off"
                                value={JSON.parse(value || '{}')[item] || ''} 
                                onChange={(e) => {
                                    let _value_ = JSON.parse(value || '{}');
                                    _value_[item] = e.target.value;
                                    onChange(JSON.stringify(_value_));
                                }}
                                className={`form-input flex-1 ${readOnly ? 'cursor-default': ''} ${lang !== item && 'hidden'}`} 
                            />
                        )
                    }
                </div>
            }
            {
                element === 'json_textarea' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-start'} ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[5.5rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'}`}>{config.text[lower(label || name)]}</label>
                    <ul className="w-full pb-6 flex items-center gap-2.5">
                        {
                            langs.map((item, index) =>
                                <li key={index} onClick={() => setLang(item)} className={`py-1.5 px-3.5 rtl:pb-2 rounded-[.5rem] cursor-pointer border border-border dark:border-border-dark font-semibold tracking-wide text-[.9rem] select-none bg-white-light/30 dark:bg-black/20 duration-300 hover:bg-white-light dark:hover:bg-menu-dark ${lang === item && '!bg-white-light dark:!bg-menu-dark shadow-md dark:!text-white-light'}`}>
                                    {config.text[item]}
                                </li>
                            )
                        }
                    </ul>
                    {
                        langs.map((item, index) => 
                            <textarea 
                                key={index}
                                id={name} 
                                readOnly={readOnly} 
                                rows={rows || 5} 
                                ref={ref} 
                                value={JSON.parse(value || '{}')[item] || ''} 
                                onChange={(e) => {
                                    let _value_ = JSON.parse(value || '{}');
                                    _value_[item] = e.target.value;
                                    onChange(JSON.stringify(_value_));
                                }}
                                className={`form-textarea min-h-[80px] resize-none ${readOnly && 'cursor-default'} ${lang !== item && 'hidden'}`}
                                >
                            </textarea>
                        )
                    }
                </div>
            }
            {
                element === 'json_editor' &&
                <div className={`w-full ${className.includes('flex') && 'flex justify-center items-start'} small ${className}`}>
                    <label htmlFor={name} className={`cursor-default line-clamp-1 ${className.includes('free-label') || !className.includes('flex') ? 'w-[9rem]' : 'w-[5.5rem]'} ${className.includes('flex') ? 'mb-0 ltr:mr-1 rtl:ml-1' : 'mb-5'}`}>{config.text[lower(label || name)]}</label>
                    <ul className="w-full pb-6 flex items-center gap-2.5">
                        {
                            langs.map((item, index) =>
                                <li key={index} onClick={() => setLang(item)} className={`py-1.5 px-3.5 rtl:pb-2 rounded-[.5rem] cursor-pointer border border-border dark:border-border-dark font-semibold tracking-wide text-[.9rem] select-none bg-white-light/30 dark:bg-black/20 duration-300 hover:bg-white-light dark:hover:bg-menu-dark ${lang === item && '!bg-white-light dark:!bg-menu-dark shadow-md dark:!text-white-light'}`}>
                                    {config.text[item]}
                                </li>
                            )
                        }
                    </ul>
                    {
                        langs.map((item, index) => 
                            <Quill 
                                key={index}
                                focus
                                className={`${lang !== item && 'hidden'}`}
                                value={JSON.parse(value || '{}')[item]} 
                                onChange={(content, text) => {
                                    let _value_ = JSON.parse(value || '{}');
                                    _value_[item] = content;
                                    onChange(JSON.stringify(_value_));
                                }}
                            />
                        )
                    }
                </div>
            }
            {
                element === 'json_include_list' &&
                <div className="flex flex-col gap-4">
                    <label className='cursor-default line-clamp-1'>{config.text.what_include}</label>
                    <ul className="w-full pb-3 flex items-center gap-2.5">
                        {
                            langs.map((item, index) =>
                                <li key={index} onClick={() => setLang(item)} className={`py-1.5 px-3.5 rtl:pb-2 rounded-[.5rem] cursor-pointer border border-border dark:border-border-dark font-semibold tracking-wide text-[.9rem] select-none bg-white-light/30 dark:bg-black/20 duration-300 hover:bg-white-light dark:hover:bg-menu-dark ${lang === item && '!bg-white-light dark:!bg-menu-dark shadow-md dark:!text-white-light'}`}>
                                    {config.text[item]}
                                </li>
                            )
                        }
                    </ul>
                    {
                        langs.map((item, index) =>
                            <Includes_List 
                                key={index}
                                value={JSON.stringify(JSON.parse(value || '{}')[item] || [])} 
                                onChange={(e) => {
                                    let _value_ = JSON.parse(value || '{}');
                                    _value_[item] = JSON.parse(e);
                                    onChange(JSON.stringify(_value_));
                                }}
                                className={`${lang !== item && 'hidden'}`}
                            />
                        )
                    }
                </div>
            }
            {
                element === 'choice' &&
                <div className="w-full">

                    <label className='cursor-default text-[1.2rem]'>{config.text[label || name]}</label>

                    <ul className="w-full pt-5 flex items-center gap-5">
                        {
                            items?.map((item, index) =>
                                <div key={index} className='w-full flex justify-start items-center select-none'>
                                    <label className="w-12 h-6 relative">
                                        <input id={item.name} checked={value === item.id} onChange={() => onChange(item.id)} ref={ref} type="checkbox" className="absolute w-full h-full opacity-0 z-10 cursor-pointer peer"/>
                                        <span className="bg-[#ebedf2] dark:bg-menu-dark block h-full rounded-full before:absolute before:left-1 
                                            before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 
                                            before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary 
                                            before:transition-all before:duration-300">
                                        </span>
                                    </label>
                                    <label htmlFor={item.name} className="ltr:pl-4 rtl:pr-4 cursor-pointer max-w-[60%] overflow-hidden !text-[1.05rem]">{config.text[lower(item.name)]}</label>
                                </div>
                            )
                        }
                    </ul>

                </div>
            }
            {
                element === 'chart' &&
                <Chart data={value || {}} type={type} title={name} label={label || name} color={color} icon={icon} height={height}/>
            }
            {
                element === 'hr' &&
                <hr className={`border-border dark:border-border-dark ${className.includes('my') ? className : `my-7 ${className}`}`}/>
            }
        </div>

    )

}
