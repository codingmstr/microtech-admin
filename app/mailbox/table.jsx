"use client";
import { api, fix_date_time } from "@/public/script/main";
import { useSelector } from 'react-redux';
import Loader from "@/components/loader";
import Icons from "@/components/icons";
import Elements from "@/components/elements";

export default function Table ( props ) {

    const config = useSelector((state) => state.config);
    const {
        mails, rows, data, setData, setTab, setSelected, type, setType, reload, search, setSearch,
        loader, pager, setPager, checked, setChecked, setStar, setImportant
    } = props;

    const _checkbox_ = ( id, all ) => {

        if ( checked.includes(id) ) setChecked(checked.filter(_ => _ !== id));
        else setChecked([...checked, id]);

        if ( all ) {
            if ( rows.filter(_ => checked.includes(_.id)).length === rows.length ) setChecked([]);
            else setChecked([...rows.map(_ => _.id)]);
        }

    }
    const _active_ = async() => {

        if ( !checked.length ) return;
        let _data_ = data.map(_ => { checked.includes(_.id) ? _.readen = true : ''; return _; });
        setData([..._data_]);
        setChecked([]);
        const response = await api('mail/active', {ids: JSON.stringify(checked)});

    }
    const _unactive_ = async() => {
        
        if ( !checked.length ) return;
        let _data_ = data.map(_ => { checked.includes(_.id) ? _.readen = false : ''; return _; });
        setData([..._data_]);
        setChecked([]);
        const response = await api('mail/unactive', {ids: JSON.stringify(checked)});

    }
    const _delete_ = async() => {

        if ( !checked.length ) return;
        if ( !confirm(`Are you sure to remove ${checked.length} mails ?`) ) return;
        let _data_ = data.filter(_ => !checked.includes(_.id));
        setData([..._data_]);
        setChecked([]);
        const response = await api('mail/delete', {ids: JSON.stringify(checked)});

    }
    const _refresh_ = async() => {

        reload();

    }

    return (

        <div className="realtive w-full h-full overflow-hidden">

            <div className="w-full flex justify-between items-center flex-wrap gap-4 p-4 select-none border-b border-[#e0e6ed] dark:border-[#1b2e4b]">

                <div className="w-full sm:w-auto flex justify-center items-center flex-col sm:flex-row gap-4">

                    <button type="button" onClick={() => setTab('form')} className="btn btn-outline-primary text-white bg-primary hover:opacity-[.8] w-full sm:w-auto">
                        {config.text.new_message}
                    </button>

                    <div className="w-full sm:w-auto flex justify-center items-center gap-4">

                        <button type="button" onClick={() => { setSearch(''); setType('inbox'); }} className={`w-full btn shadow-none flex justify-center items-center gap-2 hover:opacity-[.8] ${type === 'inbox' ? 'btn-danger' : 'btn-outline-danger'}`}>
                            <Icons icon='inbox'/>
                            {config.text.inbox}
                            {
                                mails.unreaden ?
                                <span className="-mt-[1px]">
                                    (&nbsp;{mails.unreaden}&nbsp;)
                                </span> : ''
                            }
                        </button>

                        <button type="button" onClick={() => { setSearch(''); setType('sent'); }} className={`w-full btn shadow-none flex justify-center items-center gap-2 hover:opacity-[.8] ${type === 'sent' ? 'btn-success' : 'btn-outline-success'}`}>
                            <Icons icon='send' className='max-w-4 max-h-4'/>
                            {config.text.send}
                        </button>

                    </div>

                </div>

                <div className="w-full sm:w-[20rem] flex justify-center items-center">

                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={config.text.search} className="form-input"/>

                </div>

            </div>

            <div className="w-full flex justify-between items-center flex-wrap gap-4 p-4 mail-actions select-none border-b border-[#e0e6ed] dark:border-[#1b2e4b]">

                <div className="flex justify-center items-center">

                    <input type="checkbox" checked={rows.filter(_ => checked.includes(_.id)).length === rows.length && rows.length} onChange={() => _checkbox_(0, true)} className="form-checkbox"/>

                    <div className="flex items-center mx-[1.5rem]">

                        <ul className="flex grow items-center sm:flex-none gap-4 ltr:sm:mr-4 rtl:sm:ml-4">

                            <li onClick={_refresh_}>
                                <button type="button" className="hover:text-primary flex items-center">
                                    <Icons icon='reload'/>
                                </button>
                            </li>
                            <li onClick={_delete_}>
                                <button type="button" className="hover:text-primary flex items-center mt-[-1.5px]">
                                    <Icons icon='delete'/>
                                </button>
                            </li>
                            <li>
                                <Elements element='menu' type='reverse' button={<Icons icon='dots' className='rotate-90 opacity-70 hover:text-primary'/>}>
                                    <ul className="whitespace-nowrap">
                                        <li onClick={_active_}>
                                            <button type="button" className="w-full gap-2">
                                                <Icons icon='read'/>
                                                {config.text.mark_as_read}
                                            </button>
                                        </li>
                                        <li onClick={_unactive_}>
                                            <button type="button" className="w-full gap-2">
                                                <Icons icon='unread'/>
                                                {config.text.mark_as_unread}
                                            </button>
                                        </li>
                                        <li onClick={_delete_}>
                                            <button type="button" className="w-full gap-2">
                                                <Icons icon='delete'/>
                                                {config.text.delete}
                                            </button>
                                        </li>
                                    </ul>
                                </Elements>
                            </li>

                        </ul>

                    </div>

                </div>

                <div className="flex justify-center items-center">

                    <div className="ltr:mr-3 rtl:ml-3">
                        {mails.length ? pager.start : 0} - {mails.length ? pager.end > mails.length ? mails.length : pager.end : 0} / {mails.length}
                    </div>

                    <button type="button" disabled={pager.start <= 1} onClick={() => setPager({...pager, start: pager.start - pager.size, end: pager.end - pager.size})} className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed">
                        <Icons icon='arrow_left'/>
                    </button>

                    <button type="button" disabled={pager.end >= mails.length} onClick={() => setPager({...pager, start: pager.start + pager.size, end: pager.end + pager.size})} className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed">
                        <Icons icon='arrow_right'/>
                    </button>

                </div>

            </div>

            <div className="relative table-responsive overflow-y-auto h-[calc(100%_-_245px)] sm:h-[calc(100%_-_140px)]">

                { loader && <Loader className='bg'/> }

                {
                    rows.length ?
                    <table className='table-hover cursor-pointer'>
                        <tbody>
                            {
                                rows.map((item, index) =>
                                    <tr key={index} onClick={() => setSelected(item)}>
                                        <td>
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="ltr:mr-3 rtl:ml-3">
                                                    <input type="checkbox" checked={checked.includes(item.id)} onChange={() => _checkbox_(item.id)} onClick={(e) => e.stopPropagation()} className="form-checkbox"/>
                                                </div>

                                                <div className={`whitespace-nowrap font-semibold dark:text-gray-300 flex items-center mx-3 gap-3`}>
                                                    <Elements element='image' value={item.user.image} className='w-7 h-7'/>
                                                    <span className='font-medium text-white-dark max-w-[10rem] truncate'>
                                                        {item.is_sender ? config.text.me : item.user.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="min-w-[300px] overflow-hidden font-medium text-white-dark line-clamp-1">
                                                <span className={`${!item.readen && !item.is_sender ? 'font-semibold text-gray-800 dark:text-gray-300' : ''}`}>
                                                    <span>{item.title || ''}</span> &minus;&nbsp;
                                                    <span>{item.description || ''}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="ltr:mr-3 rtl:ml-3">
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); setStar(item.id); }} className={`flex items-center enabled:hover:text-warning disabled:opacity-60 ${item.star && 'text-warning'}`}>
                                                        <svg className={`${item.star && 'fill-warning'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke="currentColor" strokeWidth="1.5" d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="ltr:mr-3 rtl:ml-3">
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); setImportant(item.id); }} className={`flex items-center enabled:hover:text-primary disabled:opacity-60 ${item.important && 'text-primary'}`}>
                                                        <svg className={`rotate-90 ${item.important && 'fill-primary'}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke="currentColor" strokeWidth="1.5" d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">
                                            {fix_date_time(item.created_at)}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table> :
                    <div className="grid place-content-center h-full select-none tracking-wide">
                        {config.text.no_data}
                    </div>
                }

            </div>

        </div>

    )

}
