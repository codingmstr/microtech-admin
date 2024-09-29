"use client";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default function NotFound () {

    const config = useSelector((state) => state.config);

    useEffect(() => {

        document.title = config.text.not_founded_page;

    }, []);

    return (

        <div className="w-full h-[calc(100vh_-_160px)] flex justify-center items-center flex-wrap gap-16 cursor-default">

            <div className="flex justify-center items-center w-[14rem] layer-div">
                <img src="/media/layout/error.png" className="w-full"/>
            </div>

            <div className="flex flex-col gap-8">

                <h1 className='text-[1.5rem] font-bold tracking-wide dark:text-white-light'>{config.text.oops} ...</h1>

                <p className="flex flex-col gap-3 text-[.9rem] dark:text-white-light tracking-wide">
                    <span>{config.text.wrong1}</span>
                    {/* <span>{config.text.wrong2}</span> */}
                    <span>{config.text.wrong3}</span>
                </p>

                <a href="/" className="btn btn-primary btn-badge shadow-none hover:opacity-[.8]">{config.text.take_me_home}</a>
                
            </div>

        </div>

    )

}
