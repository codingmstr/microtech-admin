"use client";
import { actions } from '@/public/script/store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Elements from './elements';

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

                        <Link href="/" rel="preload" className="main-logo flex items-center shrink-0 ltr:ml-2 rtl:mr-2">
                            <img className="w-5 rtl:ml-3 ltr:mr-3 flex-none" src="/media/layout/logo.svg"/>
                            <span className="text-2xl font-semibold align-middle lg:inline dark:text-white-dark" style={{fontSize: "1.2rem", marginTop: "0"}}>
                                <span className='text-primary'>{config.text.logo1}</span> <span className='text-danger'>{config.text.logo2}</span>
                            </span>
                        </Link>

                        <button type="button" onClick={() => dispatch(actions.toggle_side())} className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>

                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">

                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">

                            {
                                config.user.id ?
                                <li className="nav-item">

                                    <Link href="/" rel="preload" className="group">

                                        <div className="flex items-center">

                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M6.22209 4.60105C6.66665 4.304 7.13344 4.04636 7.6171 3.82976C8.98898 3.21539 9.67491 2.9082 10.5875 3.4994C11.5 4.09061 11.5 5.06041 11.5 7.00001V8.50001C11.5 10.3856 11.5 11.3284 12.0858 11.9142C12.6716 12.5 13.6144 12.5 15.5 12.5H17C18.9396 12.5 19.9094 12.5 20.5006 13.4125C21.0918 14.3251 20.7846 15.011 20.1702 16.3829C19.9536 16.8666 19.696 17.3334 19.399 17.7779C18.3551 19.3402 16.8714 20.5578 15.1355 21.2769C13.3996 21.9959 11.4895 22.184 9.64665 21.8175C7.80383 21.4509 6.11109 20.5461 4.78249 19.2175C3.45389 17.8889 2.5491 16.1962 2.18254 14.3534C1.81598 12.5105 2.00412 10.6004 2.72315 8.86451C3.44218 7.12861 4.65982 5.64492 6.22209 4.60105Z" fill="currentColor"></path>
                                                <path d="M21.446 7.06901C20.6342 5.00831 18.9917 3.36579 16.931 2.55398C15.3895 1.94669 14 3.34316 14 5.00002V9.00002C14 9.5523 14.4477 10 15 10H19C20.6569 10 22.0533 8.61055 21.446 7.06901Z" fill="currentColor"></path>
                                            </svg>

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

                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24 5C24 6.65685 22.6569 8 21 8C19.3431 8 18 6.65685 18 5C18 3.34315 19.3431 2 21 2C22.6569 2 24 3.34315 24 5Z" fill="currentColor"></path>
                                                <path d="M17.2339 7.46394L15.6973 8.74444C14.671 9.59966 13.9585 10.1915 13.357 10.5784C12.7747 10.9529 12.3798 11.0786 12.0002 11.0786C11.6206 11.0786 11.2258 10.9529 10.6435 10.5784C10.0419 10.1915 9.32941 9.59966 8.30315 8.74444L5.92837 6.76546C5.57834 6.47377 5.05812 6.52106 4.76643 6.87109C4.47474 7.22112 4.52204 7.74133 4.87206 8.03302L7.28821 10.0465C8.2632 10.859 9.05344 11.5176 9.75091 11.9661C10.4775 12.4334 11.185 12.7286 12.0002 12.7286C12.8154 12.7286 13.523 12.4334 14.2495 11.9661C14.947 11.5176 15.7372 10.859 16.7122 10.0465L18.3785 8.65795C17.9274 8.33414 17.5388 7.92898 17.2339 7.46394Z" fill="currentColor"></path>
                                                <path d="M18.4538 6.58719C18.7362 6.53653 19.0372 6.63487 19.234 6.87109C19.3965 7.06614 19.4538 7.31403 19.4121 7.54579C19.0244 7.30344 18.696 6.97499 18.4538 6.58719Z" fill="currentColor"></path>
                                                <path opacity="0.5" d="M16.9576 3.02099C16.156 3 15.2437 3 14.2 3H9.8C5.65164 3 3.57746 3 2.28873 4.31802C1 5.63604 1 7.75736 1 12C1 16.2426 1 18.364 2.28873 19.682C3.57746 21 5.65164 21 9.8 21H14.2C18.3484 21 20.4225 21 21.7113 19.682C23 18.364 23 16.2426 23 12C23 10.9326 23 9.99953 22.9795 9.1797C22.3821 9.47943 21.7103 9.64773 21 9.64773C18.5147 9.64773 16.5 7.58722 16.5 5.04545C16.5 4.31904 16.6646 3.63193 16.9576 3.02099Z" fill="currentColor"></path>
                                            </svg>

                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.mail}</span>
                                        
                                        </div>

                                    </Link>

                                </li> : ''
                            }
                            {
                                config.user.allow_messages ?
                                <li className="nav-item">

                                    <Link href="/chatbox" rel="preload" className="group">

                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4036 22.4797L10.6787 22.015C11.1195 21.2703 11.3399 20.8979 11.691 20.6902C12.0422 20.4825 12.5001 20.4678 13.4161 20.4385C14.275 20.4111 14.8523 20.3361 15.3458 20.1317C16.385 19.7012 17.2106 18.8756 17.641 17.8365C17.9639 17.0571 17.9639 16.0691 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C5.43314 6.03516 4.04489 6.03516 3.02507 6.66011C2.45442 7.0098 1.97464 7.48958 1.62495 8.06023C1 9.08006 1 10.4683 1 13.2448V14.093C1 16.0691 1 17.0571 1.32282 17.8365C1.75326 18.8756 2.57886 19.7012 3.61802 20.1317C4.11158 20.3361 4.68882 20.4111 5.5477 20.4385C6.46368 20.4678 6.92167 20.4825 7.27278 20.6902C7.6239 20.8979 7.84431 21.2703 8.28514 22.015L8.5602 22.4797C8.97002 23.1721 9.9938 23.1721 10.4036 22.4797ZM13.1928 14.5171C13.7783 14.5171 14.253 14.0424 14.253 13.4568C14.253 12.8713 13.7783 12.3966 13.1928 12.3966C12.6072 12.3966 12.1325 12.8713 12.1325 13.4568C12.1325 14.0424 12.6072 14.5171 13.1928 14.5171ZM10.5422 13.4568C10.5422 14.0424 10.0675 14.5171 9.48193 14.5171C8.89637 14.5171 8.42169 14.0424 8.42169 13.4568C8.42169 12.8713 8.89637 12.3966 9.48193 12.3966C10.0675 12.3966 10.5422 12.8713 10.5422 13.4568ZM5.77108 14.5171C6.35664 14.5171 6.83133 14.0424 6.83133 13.4568C6.83133 12.8713 6.35664 12.3966 5.77108 12.3966C5.18553 12.3966 4.71084 12.8713 4.71084 13.4568C4.71084 14.0424 5.18553 14.5171 5.77108 14.5171Z"
                                                    fill="currentColor"/>
                                                <path opacity="0.5" d="M15.486 1C16.7529 0.999992 17.7603 0.999986 18.5683 1.07681C19.3967 1.15558 20.0972 1.32069 20.7212 1.70307C21.3632 2.09648 21.9029 2.63623 22.2963 3.27821C22.6787 3.90219 22.8438 4.60265 22.9226 5.43112C22.9994 6.23907 22.9994 7.24658 22.9994 8.51343V9.37869C22.9994 10.2803 22.9994 10.9975 22.9597 11.579C22.9191 12.174 22.8344 12.6848 22.6362 13.1632C22.152 14.3323 21.2232 15.2611 20.0541 15.7453C20.0249 15.7574 19.9955 15.7691 19.966 15.7804C19.8249 15.8343 19.7039 15.8806 19.5978 15.915H17.9477C17.9639 15.416 17.9639 14.8217 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C7.22423 6.03516 6.41369 6.03516 5.73242 6.06309V4.4127C5.76513 4.29934 5.80995 4.16941 5.86255 4.0169C5.95202 3.75751 6.06509 3.51219 6.20848 3.27821C6.60188 2.63623 7.14163 2.09648 7.78361 1.70307C8.40759 1.32069 9.10805 1.15558 9.93651 1.07681C10.7445 0.999986 11.7519 0.999992 13.0188 1H15.486Z"
                                                    fill="currentColor"/>
                                            </svg>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.chat}</span>
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

                                            <svg className="group-hover:!text-primary" style={{transform: 'scale(.9)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.70914 2.5 10.5 4.29086 10.5 6.5C10.5 8.70914 8.70914 10.5 6.5 10.5C4.29086 10.5 2.5 8.70914 2.5 6.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M13.5 17.5C13.5 15.2909 15.2909 13.5 17.5 13.5C19.7091 13.5 21.5 15.2909 21.5 17.5C21.5 19.7091 19.7091 21.5 17.5 21.5C15.2909 21.5 13.5 19.7091 13.5 17.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M21.5 6.5C21.5 4.61438 21.5 3.67157 20.9142 3.08579C20.3284 2.5 19.3856 2.5 17.5 2.5C15.6144 2.5 14.6716 2.5 14.0858 3.08579C13.5 3.67157 13.5 4.61438 13.5 6.5C13.5 8.38562 13.5 9.32843 14.0858 9.91421C14.6716 10.5 15.6144 10.5 17.5 10.5C19.3856 10.5 20.3284 10.5 20.9142 9.91421C21.5 9.32843 21.5 8.38562 21.5 6.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M10.5 17.5C10.5 15.6144 10.5 14.6716 9.91421 14.0858C9.32843 13.5 8.38562 13.5 6.5 13.5C4.61438 13.5 3.67157 13.5 3.08579 14.0858C2.5 14.6716 2.5 15.6144 2.5 17.5C2.5 19.3856 2.5 20.3284 3.08579 20.9142C3.67157 21.5 4.61438 21.5 6.5 21.5C8.38562 21.5 9.32843 21.5 9.91421 20.9142C10.5 20.3284 10.5 19.3856 10.5 17.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                                            </svg>

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

                                            <svg className="group-hover:!text-primary" style={{transform: 'scale(.95)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M21 22H9M3 22H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M19 22V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M5 22V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M11.9999 2H7.47214C6.26932 2 5.66791 2 5.18461 2.2987C4.7013 2.5974 4.43234 3.13531 3.89443 4.21114L2.49081 7.75929C2.16652 8.57905 1.88279 9.54525 2.42867 10.2375C2.79489 10.7019 3.36257 11 3.99991 11C5.10448 11 5.99991 10.1046 5.99991 9C5.99991 10.1046 6.89534 11 7.99991 11C9.10448 11 9.99991 10.1046 9.99991 9C9.99991 10.1046 10.8953 11 11.9999 11C13.1045 11 13.9999 10.1046 13.9999 9C13.9999 10.1046 14.8953 11 15.9999 11C17.1045 11 17.9999 10.1046 17.9999 9C17.9999 10.1046 18.8953 11 19.9999 11C20.6373 11 21.205 10.7019 21.5712 10.2375C22.1171 9.54525 21.8334 8.57905 21.5091 7.75929L20.1055 4.21114C19.5676 3.13531 19.2986 2.5974 18.8153 2.2987C18.332 2 17.7306 2 16.5278 2H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>

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
                                            
                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M12 16.0678L8.22855 19.9728C7.68843 20.5321 7.41837 20.8117 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4602C5.69597 20.2495 5.65848 19.8695 5.5835 19.1095C5.54117 18.6804 5.52 18.4658 5.45575 18.2861C5.31191 17.8838 5.00966 17.5708 4.6211 17.4219C4.44754 17.3554 4.24033 17.3335 3.82589 17.2896C3.09187 17.212 2.72486 17.1732 2.52138 17.0486C2.05772 16.7648 1.87548 16.1662 2.08843 15.6266C2.18188 15.3898 2.45194 15.1102 2.99206 14.5509L5.45575 12" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20.9084C17.3315 21.1289 17.9096 20.9402 18.1837 20.4602C18.304 20.2495 18.3415 19.8695 18.4165 19.1095C18.4588 18.6804 18.48 18.4658 18.5442 18.2861C18.6881 17.8838 18.9903 17.5708 19.3789 17.4219C19.5525 17.3554 19.7597 17.3335 20.1741 17.2896C20.9081 17.212 21.2751 17.1732 21.4786 17.0486C21.9423 16.7648 22.1245 16.1662 21.9116 15.6266C21.8181 15.3898 21.5481 15.1102 21.0079 14.5509L18.5442 12" stroke="currentColor" strokeWidth="1.5"></path>
                                            </svg>

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

                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M11 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5" stroke="currentColor" strokeWidth="1.5"></path>
                                            </svg>

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
                                            
                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M12 16.0678L8.22855 19.9728C7.68843 20.5321 7.41837 20.8117 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4602C5.69597 20.2495 5.65848 19.8695 5.5835 19.1095C5.54117 18.6804 5.52 18.4658 5.45575 18.2861C5.31191 17.8838 5.00966 17.5708 4.6211 17.4219C4.44754 17.3554 4.24033 17.3335 3.82589 17.2896C3.09187 17.212 2.72486 17.1732 2.52138 17.0486C2.05772 16.7648 1.87548 16.1662 2.08843 15.6266C2.18188 15.3898 2.45194 15.1102 2.99206 14.5509L5.45575 12" stroke="currentColor" strokeWidth="1.5"></path>
                                                <path d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20.9084C17.3315 21.1289 17.9096 20.9402 18.1837 20.4602C18.304 20.2495 18.3415 19.8695 18.4165 19.1095C18.4588 18.6804 18.48 18.4658 18.5442 18.2861C18.6881 17.8838 18.9903 17.5708 19.3789 17.4219C19.5525 17.3554 19.7597 17.3335 20.1741 17.2896C20.9081 17.212 21.2751 17.1732 21.4786 17.0486C21.9423 16.7648 22.1245 16.1662 21.9116 15.6266C21.8181 15.3898 21.5481 15.1102 21.0079 14.5509L18.5442 12" stroke="currentColor" strokeWidth="1.5"></path>
                                            </svg>

                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.reviews}</span>
                                        
                                        </div>

                                    </Link>

                                </li> : ''
                            }
                    
                            <div><Elements element='hr' className='my-2'/></div>

                            <li className="menu nav-item">

                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => currentMenu === 'users' ? setCurrentMenu('') : setCurrentMenu('users')}>
                                    
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
                                            <path opacity="0.8" d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path opacity="0.8" d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <ellipse cx="12" cy="17" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5"></ellipse>
                                            <path opacity="0.8" d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path opacity="0.8" d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.users}</span>
                                    </div>

                                    <div className={currentMenu === 'users' ? '!rotate-90' : 'rtl:rotate-180'}>
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
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
                                            <path opacity="0.8" d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path opacity="0.8" d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <ellipse cx="12" cy="17" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5"></ellipse>
                                            <path opacity="0.8" d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path opacity="0.8" d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                        </svg>
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
                                        { config.user.allow_contacts ? <li><Link href='/contact' rel="preload">{config.text.contacts}</Link></li> : '' }
                                        { config.user.allow_reports ? <li><Link href='/report' rel="preload">{config.text.reports}</Link></li> : '' }
                                    </ul>
                                </AnimateHeight>

                            </li> 

                            <div><Elements element='hr' className='my-2'/></div>

                            {
                                config.user.id ?
                                <li className="nav-item">

                                    <Link href="/account" rel="preload" className="group">

                                        <div className="flex items-center">

                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
                                                <path stroke="currentColor" strokeWidth="1.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 
                                                    12 13C16.4183 13 20 15.0147 20 17.5Z">
                                                </path>
                                            </svg>

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

                                            <svg className="group-hover:!text-primary" style={{transform: 'scale(.9)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
                                                <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" strokeWidth="1.5"></path>
                                            </svg>

                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{config.text.settings}</span>
                                        
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
