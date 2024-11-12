"use client";
import { parse } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Icons from "./icons";

export default function Times_List ({ value, onChange, className }) {

    const config = useSelector((state) => state.config);
    const [count, setCount] = useState(1);
    const [list, setList] = useState([]);

    useEffect(() => {

        setList(parse(value) || []);
        setCount(parse(value)?.length || 1);

    }, [value]);

    return (

        <div className={`w-full flex flex-col gap-5 ${className}`}>

            <div className="panel !px-6 !py-8 w-full grid grid-cols-2 md:grid-cols-2 gap-5 duration-300 transition-all !bg-white-light/15 dark:!bg-black/10">
                {
                    Array.from({ length: count }, (_, i) => 
                        <div key={i} className="w-full relative px-4 py-5 rounded-sm border border-border dark:border-menu-dark duration-300 transition-all bg-gray-50 dark:bg-dark/20">

                            <label htmlFor={i} className='cursor-default line-clamp-1 mb-4'>{config.text.time} {i+1}</label>

                            <input 
                                id={i}
                                type="time" 
                                className="form-input" 
                                value={list[i] || ''} 
                                onChange={(e) => {
                                    const newValues = [...list];
                                    newValues[i] = e.target.value;
                                    onChange(JSON.stringify(newValues));
                                }} 
                            />

                            <div onClick={() => { onChange(JSON.stringify(list.filter((_, index) => index !== i))); setCount( count-1 || 1); }} className="absolute top-4 ltr:right-4 rtl:left-4 w-[1.7rem] h-[1.7rem] border border-border dark:border-border-dark flex justify-center items-center rounded-full dark:text-white-light cursor-pointer bg-menu dark:bg-menu-dark duration-300 hover:scale-[1.1]">
                                <Icons icon='close' className='!w-4 -h-4'/>
                            </div>

                        </div>
                    )
                }
            </div>

            <div className="w-full flex justify-end items-center gap-3 pt-2 select-none">

                <button onClick={() => setCount(count+1)} className="w-[9rem] py-2.5 text-[.95rem] font-semibold cursor-pointer bg-primary text-white rounded-md duration-300 hover:opacity-[.8] flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined !text-[1.2rem]">add_circle</span>
                    <span>{config.text.add_new}</span>
                </button>

            </div>

        </div>

    )

}
