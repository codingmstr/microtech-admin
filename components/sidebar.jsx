"use client";
import { api, date } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useDispatch, useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Elements from './elements';
import Icons from './icons';

export default function Sidebar () {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState('');

    const logout = async( lock ) => {

        dispatch( actions.toggle_loader(true) );

        if ( lock ) {
            dispatch(actions.toggle_user({...config.user, logged: false, update: date()}));
            router.replace('/auth/unlock');
        }
        else{
            const response = await api('auth/logout');
            dispatch(actions.toggle_user(null));
            router.replace('/auth/login');
        }

    }
    return (

        <div>

            <div className={`${(!config.side && 'hidden') || ''} fixed inset-0 z-50 bg-[black]/60 lg:hidden`} onClick={() => dispatch(actions.toggle_side())}></div>

            <nav className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[270px] ltr:border-r rtl:border-l border-border dark:border-border-dark transition-all duration-300 ${config.dark ? 'text-white-dark' : ''}`}>
                
                <div className="h-full bg-panel dark:bg-panel-dark select-none p-[1px]">

                    <div className="flex items-center justify-between px-4 pt-6 pb-4 overflow-hidden">

                        <Link href="/" className="flex gap-3.5 ltr:ml-2 rtl:mr-2">
                            
                            <div>
                                <svg className='fill-primary w-8 h-8' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 553.048 553.048" xmlSpace="preserve">
                                    <path d="M76.774,179.141c-9.529,0-17.614,3.323-24.26,9.969c-6.646,6.646-9.97,14.621-9.97,23.929v142.914
                                        c0,9.541,3.323,17.619,9.97,24.266c6.646,6.646,14.731,9.97,24.26,9.97c9.522,0,17.558-3.323,24.101-9.97
                                        c6.53-6.646,9.804-14.725,9.804-24.266V213.039c0-9.309-3.323-17.283-9.97-23.929C94.062,182.464,86.082,179.141,76.774,179.141z"
                                        />
                                    <path d="M351.972,50.847L375.57,7.315c1.549-2.882,0.998-5.092-1.658-6.646c-2.883-1.34-5.098-0.661-6.646,1.989l-23.928,43.88
                                        c-21.055-9.309-43.324-13.972-66.807-13.972c-23.488,0-45.759,4.664-66.806,13.972l-23.929-43.88
                                        c-1.555-2.65-3.77-3.323-6.646-1.989c-2.662,1.561-3.213,3.764-1.658,6.646l23.599,43.532
                                        c-23.929,12.203-42.987,29.198-57.167,51.022c-14.18,21.836-21.273,45.698-21.273,71.628h307.426
                                        c0-25.924-7.094-49.787-21.273-71.628C394.623,80.045,375.675,63.05,351.972,50.847z M215.539,114.165
                                        c-2.552,2.558-5.6,3.831-9.143,3.831c-3.55,0-6.536-1.273-8.972-3.831c-2.436-2.546-3.654-5.582-3.654-9.137
                                        c0-3.543,1.218-6.585,3.654-9.137c2.436-2.546,5.429-3.819,8.972-3.819s6.591,1.273,9.143,3.819
                                        c2.546,2.558,3.825,5.594,3.825,9.137C219.357,108.577,218.079,111.619,215.539,114.165z M355.625,114.165
                                        c-2.441,2.558-5.434,3.831-8.971,3.831c-3.551,0-6.598-1.273-9.145-3.831c-2.551-2.546-3.824-5.582-3.824-9.137
                                        c0-3.543,1.273-6.585,3.824-9.137c2.547-2.546,5.594-3.819,9.145-3.819c3.543,0,6.529,1.273,8.971,3.819
                                        c2.438,2.558,3.654,5.594,3.654,9.137C359.279,108.577,358.062,111.619,355.625,114.165z"/>
                                    <path d="M123.971,406.804c0,10.202,3.543,18.838,10.63,25.925c7.093,7.087,15.729,10.63,25.924,10.63h24.596l0.337,75.454
                                        c0,9.528,3.323,17.619,9.969,24.266s14.627,9.97,23.929,9.97c9.523,0,17.613-3.323,24.26-9.97s9.97-14.737,9.97-24.266v-75.447
                                        h45.864v75.447c0,9.528,3.322,17.619,9.969,24.266s14.73,9.97,24.26,9.97c9.523,0,17.613-3.323,24.26-9.97
                                        s9.969-14.737,9.969-24.266v-75.447h24.928c9.969,0,18.494-3.544,25.594-10.631c7.086-7.087,10.631-15.723,10.631-25.924V185.45
                                        H123.971V406.804z"/>
                                    <path d="M476.275,179.141c-9.309,0-17.283,3.274-23.93,9.804c-6.646,6.542-9.969,14.578-9.969,24.094v142.914
                                        c0,9.541,3.322,17.619,9.969,24.266s14.627,9.97,23.93,9.97c9.523,0,17.613-3.323,24.26-9.97s9.969-14.725,9.969-24.266V213.039
                                        c0-9.517-3.322-17.552-9.969-24.094C493.888,182.415,485.798,179.141,476.275,179.141z"/>
                                </svg>
                            </div>

                            <div className={`text-[1.1rem] font-bold tracking-wide dark:text-white-light space-y-0.5 ${config.menu === 'collapsible-vertical' && 'text-[1rem] mx-3'}`}>
                                <p>{config.text.logo1}</p>
                                <p className='text-[.7rem] opacity-[.7]'>{config.text.v} 0.1.2</p>
                            </div>

                        </Link>

                        <button type="button" onClick={() => dispatch(actions.toggle_side())} className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>

                    <div className={`overflow-y-auto relative ${config.menu === 'vertical' ? 'h-[calc(100vh_-_180px)]' : 'h-[calc(100vh_-_120px)]'}`}>

                        <ul className="relative space-y-1 px-4">

                            {
                                config.user.id ?
                                <li className="nav-item">
                                    <Link href="/">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='chart' className='dark:!text-white-light/75'/>
                                            <span>{config.text.dashboard}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.id ?
                                <li className="nav-item">
                                    <Link href="/account">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='user' className='dark:!text-white-light/75'/>
                                            <span>{config.text.account}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_mails ?
                                <li className="nav-item">
                                    <Link href="/mailbox">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='mail' className='dark:!text-white-light/75'/>
                                            <span>{config.text.mail}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_messages ?
                                <li className="nav-item">
                                    <Link href="/chatbox">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='message' className='dark:!text-white-light/75'/>
                                            <span>{config.text.messages}</span>
                                        </div>
                                        <div className='w-[1.4rem] h-[1.4rem] rounded-full flex justify-center items-center text-[.8rem] font-semibold bg-primary/75 text-white'>
                                            <span>9</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_contacts ?
                                <li className="nav-item">
                                    <Link href="/contact">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='contact' className='dark:!text-white-light/75'/>
                                            <span>{config.text.contacts}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_categories ?
                                <li className="nav-item">
                                    <Link href="/category">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='category' className='dark:!text-white-light/75'/>
                                            <span>{config.text.categories}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_products ?
                                <li className="nav-item">
                                    <Link href="/product">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='product' className='dark:!text-white-light/75'/>
                                            <span>{config.text.products}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_coupons ?
                                <li className="nav-item">
                                    <Link href="/coupon">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='coupon' className='dark:!text-white-light/75'/>
                                            <span>{config.text.coupons}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_orders ?
                                <li className="nav-item">
                                    <Link href="/order">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='order' className='dark:!text-white-light/75'/>
                                            <span>{config.text.orders}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_reviews ?
                                <li className="nav-item">
                                    <Link href="/review">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='review' className='dark:!text-white-light/75'/>
                                            <span>{config.text.reviews}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            <li className="menu nav-item">

                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => currentMenu === 'users' ? setCurrentMenu('') : setCurrentMenu('users')}>
                                    
                                    <div className="flex items-center gap-3">
                                        <Icons icon='users' className='dark:!text-white-light/75'/>
                                        <span>{config.text.users}</span>
                                    </div>

                                    <div className={`duration-200 ${currentMenu === 'users' ? '!rotate-90' : 'rtl:rotate-180'}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu">
                                        { config.user.supervisor ? <li><Link href='/admin'>{config.text.admins}</Link></li> : '' }
                                        { config.user.allow_vendors ? <li><Link href='/vendor'>{config.text.vendors}</Link></li> : '' }
                                        { config.user.allow_clients ? <li><Link href='/client'>{config.text.clients}</Link></li> : '' }
                                    </ul>
                                </AnimateHeight>

                            </li>
                            <li className="menu nav-item">

                                <button type="button" className={`${currentMenu === 'more' ? 'active' : ''} nav-link group w-full`} onClick={() => currentMenu === 'more' ? setCurrentMenu('') : setCurrentMenu('more')}>
                                    
                                    <div className="flex items-center gap-3">
                                        <Icons icon='apps' className='dark:!text-white-light/75'/>
                                        <span>{config.text.more}</span>
                                    </div>

                                    <div className={currentMenu === 'more' ? '!rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'more' ? 'auto' : 0}>
                                    <ul className="sub-menu">
                                        { config.user.allow_blogs ? <li><Link href='/blog'>{config.text.blogs}</Link></li> : '' }
                                        { config.user.allow_comments ? <li><Link href='/comment'>{config.text.comments}</Link></li> : '' }
                                        { config.user.allow_replies ? <li><Link href='/reply'>{config.text.replies}</Link></li> : '' }
                                        { config.user.allow_levels ? <li><Link href='/level'>{config.text.levels}</Link></li> : '' }
                                        { config.user.allow_commissions ? <li><Link href='/commission'>{config.text.commissions}</Link></li> : '' }
                                    </ul>
                                </AnimateHeight>

                            </li>
                            {
                                config.user.allow_transactions ?
                                <li className="nav-item">
                                    <Link href="/transaction">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='report' className='dark:!text-white-light/75'/>
                                            <span>{config.text.transactions}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_reports ?
                                <li className="nav-item">
                                    <Link href="/report">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='report' className='dark:!text-white-light/75'/>
                                            <span>{config.text.reports}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.super ?
                                <li className="nav-item">
                                    <Link href="/setting">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='setting' className='dark:!text-white-light/75'/>
                                            <span>{config.text.settings}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.super ?
                                <li className="nav-item">
                                    <Link href="/payment">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='payment' className='dark:!text-white-light/75'/>
                                            <span>{config.text.payments}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_contents ?
                                <li className="nav-item">
                                    <Link href="/content">
                                        <div className="flex items-center gap-3">
                                            <Icons icon='content' className='dark:!text-white-light/75'/>
                                            <span>{config.text.content_manager}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }

                        </ul>

                    </div>

                    <div className={`p-4 overflow-hidden ${config.menu !== 'vertical' && 'hidden'}`}>

                        <div className='flex justify-between items-center rounded-sm bg-primary/10 dark:bg-[#1b3c48]/50 p-3 border border-border/50 dark:border-border-dark/50'>
                            
                            <div className='flex items-center gap-3'>

                                <Elements element='image' value={config.user.image} className='w-10 h-10'/>

                                <div className='flex flex-col flex-1 gap-0.5'>
                                    <p className='w-[6.3rem] text-black dark:text-white-light font-semibold text-[.95rem] line-clamp-1'>{config.user.name}</p>
                                    <p className='text-black/75 font-semibold dark:text-white-light/75 text-[.8rem]'>{config.text.active}</p>
                                </div>

                            </div>

                            <div onClick={() => logout(true)} className='w-[2rem] h-[2rem] rounded-full text-primary flex justify-center items-center cursor-pointer duration-300 hover:!bg-primary hover:text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 6a7.75 7.75 0 1 0 10 0"></path><path d="M12 4l0 8"></path>
                                </svg>
                            </div>

                        </div>

                    </div>

                </div>

            </nav>

        </div>

    )

}
