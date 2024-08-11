"use client";
import { active_link, get_cookie, sound, print, check_class } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
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
    useEffect(() => {

        let clicking = null;

        document.addEventListener('click', function (e) {
            
            if ( clicking ) return;
            clicking = e;
            setTimeout(() => clicking=null, 100);

            if ( e.target.nodeName === 'BUTTON' ) sound('click2', 1, false);
            else if ( e.target.closest('button') ) sound('click2', 1, false);
            else if ( e.target.nodeName === 'A' || e.target.closest('A') ) sound('click1', 1, false);
            else if ( e.target.nodeName === 'LI' || e.target.closest('LI') ) sound('click2', 1, false);
            else if ( e.target.nodeName === 'LI' || e.target.closest('LI') ) sound('click2', 1, false);
            else if ( e.target.nodeName === 'INPUT' && e.target.type === 'checkbox' ) sound('click2', 1, false);
            else if ( e.target.closest('LABEL') ) sound('click2', 1, false);

        });

    }, []);

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
                                    <div className={`${animation} ${config.layout} animate__animated p-5`}>
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
