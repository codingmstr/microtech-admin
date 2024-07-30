"use client";
import { active_link, get_cookie } from '@/public/script/main';
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
        setTimeout(_ => setAnimation(config.animation), 100);
        setTimeout(() => active_link(pathname), 200);
        setTimeout(() => { setLoader(false); dispatch(actions.toggle_loader(false)); }, 500);

    }, [pathname, config.animation, config.theme]);
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

                        { auth && <Sidebar /> }

                        <div className={`${auth && 'main-content'}`}>

                            { auth && <Header /> }

                            {
                                animation &&
                                <div className={`${animation} ${config.layout} animate__animated ${auth ? 'p-5' : 'px-5'}`}>

                                    <div className='relative'>{children}</div>

                                </div>
                            }

                        </div>

                    </div>
                }

            </div>

        </div>
        
    )

}
