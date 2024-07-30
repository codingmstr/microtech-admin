"use client";
import { alert_msg, storage, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Icons from "./icons";
import Elements from "./elements";

export default function Files ({ data, onChange, setData }) {
   
    const config = useSelector((state) => state.config);
    const [swiper, setSwiper] = useState(null);
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    const [new_files, set_new_files] = useState([]);
    const [deleted_files, set_deleted_files] = useState([]);

    const add_file = ( file ) => {

        if ( !file ) return;
        setFiles([...files, file]);
        set_new_files([...new_files, file.file]);
        setTimeout(() => swiper?.slideTo(files.length), 100);

    }
    const del_file = ( index, id ) => {

        setFiles([...files.slice(0, index).concat(files.slice(index+1))]);

        if ( id ){
            set_deleted_files([...deleted_files, id]);
        }
        else {
            let _index_ = index - data.files.length + deleted_files.length;
            let _files_ = new_files.slice(0, _index_).concat(new_files.slice(_index_+1));
            set_new_files([..._files_]);
        }

    }
    useEffect(() => {

        setFiles(data.files?.map(_ => { _.src = `${storage}/${_.url}`; return _; }) || []);
        setIndex(data.files?.length ? 1 : 0);

    }, []);
    useEffect(() => {
        
        onChange({new_files: new_files, deleted_files: deleted_files});

    }, [new_files, deleted_files]);

    return (

        <div>
            {
                multiple ?
                <div className="mb-6 w-full">

                    <div className="slider w-full h-[12rem] sm:h-[20rem] flex items-center border border-[#e0e6ed] dark:border-[#1b2e4b] text-black dark:text-white bg-[#fafafa] dark:bg-[#060818] rounded-md overflow-hidden">

                        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation={true} onSwiper={setSwiper} onSlideChange={(e) => setIndex(e.realIndex+1)} className='w-full h-full'>
                            
                            {
                                files.length ? files.map((item, index) => 

                                    <SwiperSlide key={index}>

                                        <div className='w-full h-full p-3 sm:p-4'>

                                            <div className="w-full flex justify-end items-center gap-x-1 sm:gap-x-3 opacity-[.8]">

                                                <a href={item.src} download target="_blank" className='scale-[.8] sm:scale-[1] flex justify-center items-center w-[1.85rem] h-[1.85rem] rounded-sm cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white'>
                                                    <span className="material-symbols-outlined icon scale-[.7]">arrow_downward</span>
                                                </a>

                                                <a onClick={() => del_file(index, item.id)} className='scale-[.8] sm:scale-[1] flex justify-center items-center w-[1.85rem] h-[1.85rem] rounded-sm cursor-pointer border border-danger text-danger hover:bg-danger hover:text-white'>
                                                    <span className="material-symbols-outlined icon scale-[.7]">close</span>
                                                </a>

                                            </div>

                                            <div className='w-full h-[calc(100%_-_2rem)] py-3 sm:py-1 flex justify-center items-center cursor-default'>
                                                { 
                                                    item.type === 'image' ?
                                                    <img src={item.src} className='bg-none max-w-full max-h-full rounded-md cursor-default'/> :
                                                    <video src={item.src} controls className='bg-none max-w-full max-h-full rounded-md cursor-pointer'></video>
                                                }
                                            </div>

                                        </div>
                                        
                                    </SwiperSlide>

                                ) : 
                                <SwiperSlide>
                                    <div className='w-full h-full flex justify-center items-center opacity-[.4]'>
                                        <img src='/media/layout/error_icon.png' className='bg-none h-[5rem] sm:h-[8rem]'/>
                                    </div>
                                </SwiperSlide>
                            }

                        </Swiper>

                    </div>

                    <div className="w-full flex justify-between items-start flex-wrap mt-5 select-none">

                        <Elements element='upload' onChange={add_file} type='image_video'/>

                        <div className='flex items-center space-x-2 text-[.9rem] tracking-wide px-2'>
                            <p>{files.length ? index : 0}</p>
                            <p>/</p>
                            <p>{files.length}</p>
                            <p>{config.text.files}</p>
                        </div>

                    </div>

                </div> :
                <Elements element='image_edit' type='user' value={`${storage}/${data.image}`} onChange={(f) => setData({...data, image_file: f.file})}/>
            }
        </div>

    );

};
