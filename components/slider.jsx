"use client";
import { storage, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Elements from "./elements";

export default function Slider ({ data, slider, onChange, readOnly }) {
   
    const config = useSelector((state) => state.config);
    const [swiper, setSwiper] = useState(null);
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    const [new_files, set_new_files] = useState([]);
    const [deleted_files, set_deleted_files] = useState([]);

    const add_file = ( file ) => {

        if ( !file ) return;
        
        let _files_ = files;
        let _new_ = new_files;
        _files_.push(file);
        _new_.push(file);

        setFiles([..._files_]);
        set_new_files([..._new_]);
        setTimeout(() => swiper?.slideTo(files.length), 100);

    }
    const del_file = ( index, id ) => {

        setFiles([...files.slice(0, index).concat(files.slice(index+1))]);

        if ( id ){
            set_deleted_files([...deleted_files, id]);
        }
        else {
            let _index_ = index - data?.length || 0 + deleted_files.length;
            let _files_ = new_files.slice(0, _index_).concat(new_files.slice(_index_+1));
            set_new_files([..._files_]);
        }

    }
    const layout = () => {

        try{
            let width = document.querySelector('.slider').offsetWidth;
            document.querySelector('.swiper').style.maxWidth = `${width-2}px`;
        }catch(e){}

    }
    useEffect(() => {

        layout();
        setTimeout(layout, 500);
        window.addEventListener('click', _ => setTimeout(layout, 200));
        setIndex(data?.length ? 1 : 0);

        if ( slider ) {
            setFiles(slider.files || []);
            set_new_files(slider.new_files || []);
            set_deleted_files(slider.deleted_files || []);
        }
        else {
            setFiles(data?.map(_ => { !_.url.includes('http') ? _.url = `${storage}/${_.url}` : ''; return _; }) || []);
        }

    }, []);
    useEffect(() => {

        onChange({files: files, new_files: new_files, deleted_files: deleted_files});

    }, [new_files, deleted_files, files]);

    return (

        <div>

            <div className="slider w-full h-[12rem] sm:h-[20rem] flex items-center border border-[#e0e6ed] dark:border-[#1b2e4b] text-black dark:text-white bg-[#fafafa] dark:bg-[#060818] rounded-md overflow-hidden">

                <Swiper modules={[Navigation, Pagination, Autoplay]} navigation={true} onSwiper={setSwiper} onSlideChange={(e) => setIndex(e.realIndex+1)} className='w-full h-full'>
                    
                    {
                        files.length ? files.map((item, index) => 

                            <SwiperSlide key={index}>

                                <div className='w-full h-full p-3 sm:p-4'>

                                    {
                                        !readOnly &&
                                        <div className="w-full flex justify-end items-center gap-x-1 sm:gap-x-3 opacity-[.8]">
                                            <a href={item.url} download target="_blank" className='scale-[.8] sm:scale-[1] flex justify-center items-center w-[1.85rem] h-[1.85rem] rounded-sm cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white'>
                                                <span className="material-symbols-outlined icon scale-[.7]">arrow_downward</span>
                                            </a>
                                            <a onClick={() => del_file(index, item.id)} className='scale-[.8] sm:scale-[1] flex justify-center items-center w-[1.85rem] h-[1.85rem] rounded-sm cursor-pointer border border-danger text-danger hover:bg-danger hover:text-white'>
                                                <span className="material-symbols-outlined icon scale-[.7]">close</span>
                                            </a>
                                        </div>
                                    }

                                    <div className={`w-full py-3 sm:py-1 flex justify-center items-center cursor-default ${readOnly ? 'h-[100%]' : 'h-[calc(100%_-_2rem)]'}`}>
                                        { 
                                            item.type === 'image' ?
                                            <img src={item.url} className='bg-none max-w-full max-h-full rounded-md'/> :
                                            <video src={item.url} controls className='bg-none max-w-full max-h-full rounded-md'></video>
                                        }
                                    </div>

                                </div>
                                
                            </SwiperSlide>

                        ) : 
                        <SwiperSlide>
                            <div className='w-full h-full flex justify-center items-center'>
                                <img src='/media/layout/error_icon.png' className='bg-none h-[5rem] sm:h-[8rem] empty-image'/>
                            </div>
                        </SwiperSlide>
                    }

                </Swiper>

            </div>

            {
                !readOnly &&
                <div className="w-full flex justify-between items-start flex-wrap mt-5 mb-[-.3rem] select-none">
                    <Elements element='upload' onChange={add_file} type='image_video' multiple/>
                    <div className='flex items-center space-x-2 text-[.9rem] tracking-wide px-2'>
                        <p>{files.length ? index || 1 : 0}</p>
                        <p>/</p>
                        <p>{files.length}</p>
                        <p>{config.text.files}</p>
                    </div>
                </div>
            }

        </div>

    );

};
