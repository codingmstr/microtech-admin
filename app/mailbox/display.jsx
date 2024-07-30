"use client";
import { storage, fix_date_time } from "@/public/script/main";
import { useSelector } from 'react-redux';
import Elements from "@/components/elements";
import Icons from "@/components/icons";

export default function Display ({ mail, setSelected, setTab, setStar, setImportant }) {

    const config = useSelector((state) => state.config);

    return (

        <div className='relative w-full h-full overflow-hidden'>

            <div className="flex items-center p-4 border-b border-[#e0e6ed] dark:border-[#1b2e4b] gap-4">

                <button type="button" onClick={() => { setSelected({}); setTab('table'); }} className="hover:text-primary">
                    <Icons icon='arrow_left'/>
                </button>

                <h4 className="text-base md:text-lg font-medium truncate mt-[-2px] cursor-default">
                    {mail.title}
                </h4>
            
                <div className="flex select-none">
                    {
                        mail.is_sender ?
                        <div className="badge bg-success shadow-none">{config.text.send}</div> :
                        <div className="badge bg-danger shadow-none">{config.text.inbox}</div>
                    }
                </div>

            </div>

            <div className="p-6 relative overflow-y-auto h-[calc(100%_-_70px)] gap-8 cursor-default">

                <div className="flex flex-wrap gap-2">

                    <Elements element='image' value={mail.user.image} className='w-12 h-12 -mt-[2px]'/>

                    <div className="flex-1">

                        <div className="flex items-center gap-4 whitespace-nowrap -mt-[4px]">

                            <div className="text-lg">{ mail.is_sender ? config.text.me : mail.user.name }</div>

                            <div className="w-2 h-2 bg-success rounded-full"></div>

                            <div className="text-white-dark">{fix_date_time(mail.created_at)}</div>

                        </div>

                        <div className="text-white-dark flex items-center gap-2 mt-[2px]">

                            <div>{mail.user.email}</div>

                            <Elements element='menu' type='reverse' button={<Icons icon='arrow_down' className='hover:text-primary'/>}>

                                <ul className="min-w-[300px]">
                                    <li>
                                        <div className="flex items-start px-4 py-2 gap-2">
                                            <div className="text-white-dark w-11">{config.text.from}</div> :
                                            <div className="flex-1 px-2">{mail.is_sender ? config.text.me : mail.user.email}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-start px-4 py-2 gap-2">
                                            <div className="text-white-dark w-11">{config.text.to}</div> :
                                            <div className="flex-1 px-2">
                                                {!mail.is_sender ? config.text.me : mail.user.id === config.user.id ? config.tex.me : mail.user.email}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-start px-4 py-2 gap-2">
                                            <div className="text-white-dark w-11">{config.text.date}</div> :
                                            <div className="flex-1 px-2">{mail.created_at.split(' ')[0]}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-start px-4 py-2 gap-2">
                                            <div className="text-white-dark w-11">{config.text.title}</div> :
                                            <div className="flex-1 px-2">{mail.title}</div>
                                        </div>
                                    </li>
                                </ul>

                            </Elements>

                        </div>

                    </div>

                    <div className="flex items-start mt-2 justify-between space-x-3 rtl:space-x-reverse w-[3.5rem]">

                        <button type="button" onClick={() => setStar(mail.id)} className={`enabled:hover:text-warning disabled:opacity-60 ${mail.star && 'text-warning'}`}>
                            <svg className={`${mail.star && 'fill-warning'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path stroke="currentColor" strokeWidth="1.5" d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
                            </svg>
                        </button>

                        <button type="button" onClick={() => setImportant(mail.id)} className={`mt-[1px] enabled:hover:text-primary disabled:opacity-60 ${mail.important && 'text-primary'}`}>
                            <svg className={`rotate-90 ${mail.important && 'fill-primary'}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path stroke="currentColor" strokeWidth="1.5" d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"/>
                            </svg>
                        </button>

                    </div>

                </div>

                <div dangerouslySetInnerHTML={{ __html: mail.content }} className="mt-8 prose dark:prose-p:text-white prose-p:text-sm md:prose-p:text-sm max-w-full prose-img:inline-block prose-img:m-0 mail-description"></div>
               
                <Elements element='file_type' label='attachements' children={mail.files} className='mt-8'/>

            </div>

        </div>

    )

}
