"use client";
import { actions } from '@/public/script/store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import Link from 'next/link';
import Elements from './elements';
import Icons from './icons';

export default function Sidebar () {
    
    const dispatch = useDispatch();
    const config = useSelector((state) => state.config);
    const [currentMenu, setCurrentMenu] = useState('');

    return (

        <div>

            <div className={`${(!config.side && 'hidden') || ''} fixed inset-0 z-50 bg-[black]/60 lg:hidden`} onClick={() => dispatch(actions.toggle_side())}></div>

            <nav className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[1px_0_4px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${config.dark ? 'text-white-dark' : ''}`}>
                
                <div className="h-full bg-white dark:bg-black no-select">

                    <div className="flex items-center justify-between px-4 py-3">

                        <Link href="/" rel="preload" className="main-logo flex items-center shrink-0 ltr:ml-2 rtl:mr-2 pt-[2px]">
                            <img className="w-6 rtl:ml-2.5 ltr:mr-2.5" src="/media/layout/logo.png"/>
                            <span className="text-2xl font-semibold align-middle lg:inline dark:text-white-dark" style={{fontSize: "1.2rem"}}>
                                <span className='text-[#27aabb]'>{config.text.logo1}</span>
                                <span className='text-[#c55858] px-1'>{config.text.logo2}</span>
                            </span>
                        </Link>

                        <button type="button" onClick={() => dispatch(actions.toggle_side())} className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>

                    <PerfectScrollbar className="relative h-[calc(100vh_-_70px)]">

                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">

                            {
                                config.user.id ?
                                <li className="nav-item">
                                    <Link href="/" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='chart' className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.dashboard}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_mails ?
                                <li className="nav-item">
                                    <Link href="/mailbox" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='mail' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.mail}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            <div><Elements element='hr' className='my-2'/></div>
                            {
                                config.user.allow_messages ?
                                <li className="nav-item">
                                    <Link href="/chatbox" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='message' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.messages}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_contacts ?
                                <li className="nav-item">
                                    <Link href="/contact" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='contact' className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.contacts}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            <div><Elements element='hr' className='my-2'/></div>
                            {
                                config.user.allow_categories ?
                                <li className="nav-item">
                                    <Link href="/category" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='category' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.categories}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_products ?
                                <li className="nav-item">
                                    <Link href="/product" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='product' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.products}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_coupons ?
                                <li className="nav-item">
                                    <Link href="/coupon" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='coupon' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.coupons}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_orders ?
                                <li className="nav-item">
                                    <Link href="/order" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='order' className='group-hover:!text-primary'/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.orders}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_reviews ?
                                <li className="nav-item">
                                    <Link href="/review" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='review' className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.reviews}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            <div><Elements element='hr' className='my-2'/></div>
                            <li className="menu nav-item">

                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => currentMenu === 'users' ? setCurrentMenu('') : setCurrentMenu('users')}>
                                    
                                    <div className="flex items-center">
                                        <Icons icon='users' className='group-hover:!text-primary'/>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.users}</span>
                                    </div>

                                    <div className={`duration-200 ${currentMenu === 'users' ? '!rotate-90' : 'rtl:rotate-180'}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        { config.user.supervisor ? <li><Link href='/admin' rel="preload">{config.text.admins}</Link></li> : '' }
                                        { config.user.allow_vendors ? <li><Link href='/vendor' rel="preload">{config.text.vendors}</Link></li> : '' }
                                        { config.user.allow_clients ? <li><Link href='/client' rel="preload">{config.text.clients}</Link></li> : '' }
                                    </ul>
                                </AnimateHeight>

                            </li>
                            <li className="menu nav-item">

                                <button type="button" className={`${currentMenu === 'more' ? 'active' : ''} nav-link group w-full`} onClick={() => currentMenu === 'more' ? setCurrentMenu('') : setCurrentMenu('more')}>
                                    
                                    <div className="flex items-center">
                                        <Icons icon='apps' className="group-hover:!text-primary"/>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.more}</span>
                                    </div>

                                    <div className={currentMenu === 'more' ? '!rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'more' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        { config.user.allow_blogs ? <li><Link href='/blog' rel="preload">{config.text.blogs}</Link></li> : '' }
                                        { config.user.allow_comments ? <li><Link href='/comment' rel="preload">{config.text.comments}</Link></li> : '' }
                                        { config.user.allow_replies ? <li><Link href='/reply' rel="preload">{config.text.replies}</Link></li> : '' }
                                    </ul>
                                </AnimateHeight>

                            </li>
                            <div><Elements element='hr' className='my-2'/></div>
                            {
                                config.user.id ?
                                <li className="nav-item">
                                    <Link href="/account" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='user'className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.account}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.super ?
                                <li className="nav-item">
                                    <Link href="/setting" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='setting'className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.settings}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }
                            {
                                config.user.allow_reports ?
                                <li className="nav-item">
                                    <Link href="/report" rel="preload" className="group">
                                        <div className="flex items-center">
                                            <Icons icon='report' className="group-hover:!text-primary"/>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.reports}</span>
                                        </div>
                                    </Link>
                                </li> : ''
                            }

                        </ul>

                    </PerfectScrollbar>

                </div>

            </nav>

        </div>

    );

}
