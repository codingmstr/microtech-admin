"use client";
import { actions } from '@/public/script/store';
import { date, api } from '@/public/script/main';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Dropdown from './menu';
import Icons from "./icons";
import Elements from "./elements";
import Notification from './notification';

export default function Header () {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const dispatch = useDispatch();
    const [lang, setLang] = useState(config.lang);
    const [query, setQuery] = useState('');

    const search = () => {

        alert(query);
        setQuery('');

    }
    const logout = async( lock ) => {

        dispatch( actions.toggle_loader(true) );

        if ( lock ) {
            dispatch(actions.toggle_user({...config.user, logged: false, update: date()}));
            router.replace('/auth/unlock');
        }
        else{
            const response = await api('auth/logout');
            dispatch(actions.toggle_user(null));
            router.replace('/auth/logout');
        }

    }
    return (

        <header>
            
            <div className="shadow-sm bg-white dark:bg-black select-none">

                <div className={`relative flex w-full items-center justify-between py-2.5 px-5 ${config.layout}`}>

                    <div className="horizontal-logo flex items-center justify-between ltr:mr-4 rtl:ml-4 lg:hidden">

                        <button type="button" onClick={() => dispatch(actions.toggle_side())} className="collapse-icon ltr:mr-2 rtl:ml-2 ltr:-ml-1 rtl:-mr-1 flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden">
                            <Icons icon='menu'/>
                        </button>

                        <Link href="/" rel="preload" className={`main-logo items-center hidden lg:flex ltr:pr-2 rtl:pl-2 ${config.menu === 'vertical' && 'hidden lg:hidden'}`}>
                            <img className="w-6 rtl:ml-3 ltr:mr-3" src="/media/layout/logo.png"/>
                            <span className="text-2xl font-semibold align-middle lg:inline dark:text-white-dark text-[1.2rem]">
                                <span className='text-[#27aabb]'>{config.text.logo1}</span>
                                <span className='text-[#c55858] px-1'>{config.text.logo2}</span>
                            </span>
                        </Link>

                    </div>

                    <div className='items-center flex-1 hidden md:flex'>
                      
                        <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyUp={(e) => { e.key === 'Enter' && search() }} type="text" className="form-input w-[18rem] tracking-wide" placeholder={`${config.text.search} ...`}/>
                   
                    </div>

                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">

                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse px-2">

                            <div>

                                <button className='flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    onClick={() => dispatch(actions.toggle_setting())}>
                                    <svg className="animate-[spin_3s_linear_infinite]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
                                        <path opacity="0.5" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" strokeWidth="1.5"></path>
                                    </svg>
                                </button>

                            </div>

                            <div className="dropdown shrink-0">

                                <Dropdown offset={[0, 8]} placement={`${config.dir === 'rtl' ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                    button={lang && <img className="h-5 w-5 rounded-full object-cover" src={`/media/flags/${lang.toUpperCase()}.svg`} alt="flag" />}>
                                    
                                    <ul className="langs-list grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                        {
                                            config.langs_list.map((item) =>

                                                <li key={item.code}>

                                                    <button type="button" className={`flex w-full hover:text-primary ${lang === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => { dispatch(actions.toggle_lang(item.code)); setLang(item.code); }}>
                                                        <img src={`/media/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{config.text[item.code]}</span>
                                                    </button>

                                                </li>

                                            )
                                        }
                                    </ul>

                                </Dropdown>

                            </div>

                            <Notification />

                            <div>
                                {
                                    config.theme === 'light' ?
                                    <button onClick={() => dispatch(actions.toggle_theme('dark'))} className='flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button> :
                                    <button onClick={() => dispatch(actions.toggle_theme('light'))} className='flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"/>
                                        </svg>
                                    </button>
                                }
                            </div>

                        </div>

                        <div className="dropdown flex shrink-0 all-data">

                            <Dropdown offset={[0, 8]} placement={`${config.dir === 'rtl' ? 'bottom-start' : 'bottom-end'}`} btnClassName="relative group block"
                                button={<Elements element='image' value={config.user.image} className='w-[2.25rem] h-[2.25rem]'/>}>
                                
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    
                                    <li>

                                        <div className="flex items-center mb-2 px-4 py-3 border-b border-white-light dark:border-white-light/10">
                                            
                                            <Elements element='image' value={config.user.image} className='w-[1.8rem] h-[1.8rem]'/>
                                            
                                            <div className="ltr:pl-3 rtl:pr-3 w-[10rem]">

                                                <h4 className="text-base truncate w-full -mt-[1px]">
                                                    {config.user.name}
                                                </h4>

                                            </div>

                                        </div>

                                    </li>
                                    <li>

                                        <button onClick={() => router.push('/account')} type='button' className="dark:hover:text-white">

                                            <svg className="ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                <path opacity="0.5" stroke="currentColor" strokeWidth="1.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"/>
                                            </svg>

                                            {config.text.account}

                                        </button>

                                    </li>
                                    {
                                        config.user.allow_mails ?
                                        <li>

                                            <button onClick={() => router.push('/mailbox')} type='button' className="dark:hover:text-white">

                                                <svg className="ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" stroke="currentColor" strokeWidth="1.5" d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"/>
                                                    <path stroke="currentColor" strokeWidth="1.5" d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" strokeLinecap="round"/>
                                                </svg>

                                                {config.text.mail}

                                            </button>

                                        </li> : ''
                                    }
                                    <li>

                                        <button onClick={() => logout(true)} type='button' className="dark:hover:text-white">
                                            
                                            <svg className="ltr:mr-2 rtl:ml-2 -mt-[1px]" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke="currentColor" strokeWidth="1.5" d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"/>
                                                <path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <g opacity="0.5">
                                                    <path d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z" fill="currentColor" />
                                                    <path fill="currentColor" d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"/>
                                                    <path fill="currentColor" d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"/>
                                                </g>
                                            </svg>

                                            {config.text.lockscreen}

                                        </button>

                                    </li>
                                    <li className="mt-2 border-t border-white-light dark:border-white-light/10">

                                        <button onClick={() => logout()} type='button' className="!py-3 text-danger">

                                            <svg className="rotate-90 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"/>
                                                <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            {config.text.logout}

                                        </button>

                                    </li>

                                </ul>

                            </Dropdown>

                        </div>

                    </div>

                </div>

            </div>

            <div className="shadow-sm navbar-menu select-none">

                <ul className={`horizontal-menu hidden w-full py-1.5 px-5 font-semibold rtl:space-x-reverse lg:space-x-2 ${config.layout}`}>

                    {
                        config.user.id ?
                        <li className="nav-item relative">
                            <Link href="/" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='chart' className="group-hover:!text-primary"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.dashboard}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.allow_mails ?
                        <li className="nav-item relative">
                            <Link href="/mailbox" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='mail' className="group-hover:!text-primary"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.mailbox}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.allow_messages ?
                        <li className="nav-item relative">
                            <Link href="/chatbox" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='message' className="group-hover:!text-primary"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.chatbox}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.super ?
                        <li className="nav-item relative">
                            <Link href="/setting" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='setting' className="group-hover:!text-primary"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.settings}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.allow_reports ?
                        <li className="nav-item relative">
                            <Link href="/report" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='report' className="group-hover:!text-primary"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.reports}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.id ?
                        <li className="nav-item relative">
                            <Link href="/account" rel="preload" className="nav-link">
                                <div className="flex items-center ltr:pr-1 rtl:pl-1">
                                    <Icons icon='user' className="group-hover:!text-primary -mt-[1px]"/>
                                    <span className="ltr:pl-3 rtl:pr-3">{config.text.account}</span>
                                </div>
                            </Link>
                        </li> : ''
                    }
                    {
                        config.user.id ?
                        <li className="menu nav-item relative">

                            <button type="button" className="nav-link">

                                <div className="flex items-center">
                                    <Icons icon='users' className="group-hover:!text-primary"/>
                                    <span className="px-3">{config.text.users}</span>
                                </div>

                                <div className="right_arrow ltr:pl-1 rtl:pr-1">
                                    <svg className="rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                            </button>

                            <ul className="sub-menu">

                                { config.user.supervisor ? <li><Link href="/admin" rel="preload">{config.text.admins}</Link></li> : '' }
                                { config.user.allow_vendors ? <li><Link href="/vendor" rel="preload">{config.text.vendors}</Link></li> : '' }
                                { config.user.allow_clients ? <li><Link href="/client" rel="preload">{config.text.clients}</Link></li> : '' }
                                
                            </ul>

                        </li> : ''
                    }
                    {
                        config.user.id ?
                        <li className="menu nav-item relative">

                            <button type="button" className="nav-link">

                                <div className="flex items-center">
                                    <Icons icon='apps' className="group-hover:!text-primary"/>
                                    <span className="px-3">{config.text.apps}</span>
                                </div>

                                <div className="right_arrow ltr:pl-1 rtl:pr-1">
                                    <svg className="rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                            </button>

                            <ul className="sub-menu">

                                { config.user.allow_categories ? <li><Link href="/category" rel="preload">{config.text.categories}</Link></li> : '' }
                                { config.user.allow_products ? <li><Link href="/product" rel="preload">{config.text.products}</Link></li> : '' }
                                { config.user.allow_coupons ? <li><Link href="/coupon" rel="preload">{config.text.coupons}</Link></li> : '' }
                                { config.user.allow_orders ? <li><Link href="/order" rel="preload">{config.text.orders}</Link></li> : '' }
                                <hr className="border-[#e0e6ed] dark:border-primary my-2 opacity-[.5] dark:opacity-[.2] m-auto"/>
                                { config.user.allow_reviews ? <li><Link href="/review" rel="preload">{config.text.reviews}</Link></li> : '' }
                                { config.user.allow_contacts ? <li><Link href="/contact" rel="preload">{config.text.contacts}</Link></li> : '' }
                                <hr className="border-[#e0e6ed] dark:border-primary my-2 opacity-[.5] dark:opacity-[.2] m-auto"/>
                                { config.user.allow_blogs ? <li><Link href="/blog">{config.text.blogs}</Link></li> : '' }
                                { config.user.allow_comments ? <li><Link href="/comment" rel="preload">{config.text.comments}</Link></li> : '' }
                                { config.user.allow_replies ? <li><Link href="/reply" rel="preload">{config.text.replies}</Link></li> : '' }
                                
                            </ul>

                        </li> : ''
                    }

                </ul>

            </div>

        </header>

    );

}
