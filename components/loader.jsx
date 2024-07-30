"use client";
import { useSelector } from 'react-redux';
import Icons from "./icons";

export default function Loader ({ className='' }) {
    
    const config = useSelector((state) => state.config);

    return (

        <div className={`screen_loader rounded-lg animate__animated w-full ${className.includes('fixed') ? 'fixed' : 'absolute'} ${className.includes('bg') ? 'bg-[#fff] dark:bg-[#0e1726]' : 'bg-[#fafafa] dark:bg-[#060818]'} ${config.user?.logged ? className.includes('container') ? 'h-[calc(100vh_-_160px)]' : 'h-full' : 'h-screen'} ${className} inset-0 z-[60] grid place-content-center`}>

            <Icons icon='loader' className={`${className.includes('small') ? 'w-[32px] h-[32px]' : className.includes('medium') ? 'w-[50px] h-[50px]' : 'w-[60px] h-[60px]'}`}/>
       
        </div>

    );

}
