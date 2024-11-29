"use client";
import { storage, print } from "@/public/script/main";
import { useSelector } from 'react-redux';
import Icons from './icons';

export default function Qrcode ({ data }) {

    const config = useSelector((state) => state.config);

    return (

        <div>

            <a href={`${storage}/${data.image}`} download target="_blank" className='w-full py-2.5 text-[1rem] flex justify-center items-center gap-3 rounded-md cursor-pointer duration-300 border border-info text-info hover:bg-info hover:text-white'>
                <Icons icon='download'/>
                {config.text.download}
            </a>

        </div>

    )

}
