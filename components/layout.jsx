"use client";
import { active_link, get_cookie } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { English } from '@/public/langs/en';
import { Arabic } from '@/public/langs/ar';
import Header from './header';
import Sidebar from './sidebar';
import Setting from './setting';
import Loader from './loader';

export default function Layout ({ children }) {

    const dispatch = useDispatch();
    const pathname = usePathname();
    const config = useSelector((state) => state.config);
    const [animation, setAnimation] = useState(false);
    const [loader, setLoader] = useState(true);
    const [auth, setAuth] = useState(false);
   
    useEffect(() => {

        const lang = localStorage.getItem('lang');
        dispatch(actions.toggle_dir(lang === 'ar' ? 'rtl' : 'ltr'));

        let current_text = English;
        if ( lang === 'ar' ) current_text = Arabic;
        if ( lang === 'en' ) current_text = English;
        // if ( lang === 'fr' ) current_text = English;
        // if ( lang === 'it' ) current_text = English;
        // if ( lang === 'du' ) current_text = English;
        // if ( lang === 'su' ) current_text = English;
        // if ( lang === 'ru' ) current_text = English;
        // if ( lang === 'tr' ) current_text = English;
        dispatch(actions.toggle_text(current_text));

    }, [dispatch, config.lang, pathname]);
    useEffect(() => {

        setAuth(config.user?.logged);

    }, [config.user]);
    useEffect(() => {

        setAnimation(false);
        setTimeout(() => setAnimation(config.animation));
        setTimeout(() => { setLoader(false); dispatch(actions.toggle_loader(false)); }, 500);
        setTimeout(() => active_link(pathname), 200);
        setTimeout(() => active_link(pathname), 500);
        setTimeout(() => active_link(pathname), 1000);

    }, [pathname, config.animation]);
    useEffect(() => {

        dispatch( actions.toggle_theme( localStorage.getItem('theme') ) );
        dispatch( actions.toggle_menu( localStorage.getItem('menu') ) );
        dispatch( actions.toggle_layout( localStorage.getItem('layout') ) );
        dispatch( actions.toggle_dir( localStorage.getItem('dir') ) );
        dispatch( actions.toggle_animation( localStorage.getItem('animation') ) );
        dispatch( actions.toggle_nav( localStorage.getItem('nav') ) );
        dispatch( actions.toggle_lang( localStorage.getItem('lang') ) );
        dispatch( actions.toggle_user( get_cookie('user') ) );
        setAnimation(config.animation);

    }, [dispatch]);

    return (

        <div className={`${config.side && 'toggle-sidebar'} ${config.menu} ${config.dir} main-section relative font-nunito text-sm font-normal antialiased`}>
        
            <div className='relative'>

                {
                    loader || config.loader ? <Loader className='fixed'/> :
                    
                    <div className={`${config.nav} main-container min-h-screen text-black dark:text-white-dark`}>
                        
                        <Setting />

                        {
                            auth &&
                            <div className='main-content'>
                                <Sidebar />
                                <Header />
                            </div>
                        }
                        {
                            auth ?
                            <div className={`main-content overflow-y-auto overflow-x-hidden scroll-smooth h-[calc(100vh_-_60px)] ${config.menu === 'horizontal' && 'lg:h-[calc(100vh_-_112px)]'}`}>
                                {
                                    animation &&
                                    <div className={`${animation} ${config.layout} animate__animated py-5 px-8`}>
                                        <div className='relative'>{children}</div>
                                    </div>
                                }
                            </div> :
                            <div className={`${animation} ${config.layout} animate__animated px-5`}>
                                <div className='relative'>{children}</div>
                            </div>
                        }
                        
                    </div>
                    
                }

            </div>

        </div>
        
    )

}
