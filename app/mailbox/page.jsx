"use client";
import { api, matching, fix_date_time, print } from "@/public/script/main";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Table from "./table";
import Form from "./form";
import Display from "./display";
import Broadcast from "./broadcast";

export default function Mailbox () {

    const config = useSelector((state) => state.config);
    const [page_size, set_size] = useState(10);
    const [tab, setTab] = useState('table');
    const [type, setType] = useState('inbox');
    const [pager, setPager] = useState({});
    const [data, setData] = useState([]);
    const [mails, setMails] = useState([]);
    const [rows, setRows] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({});
    const [loader, setLoader] = useState(true);
    const [checked, setChecked] = useState([]);

    const _get_ = async() => {

        setLoader(true);
        const response = await api('mail');
        setData(response.mails || []);
        setUsers(response.users || []);
        setTimeout(() => setLoader(false), 200);

    }
    const _sort_ = ( data ) => {

        let _data_ = data.map((item) => {
            item.is_sender = item.sender.id === config.user.id;
            item.star = item.sender.id === config.user.id ? item.star_sender : item.star_receiver;
            item.important = item.sender.id === config.user.id ? item.important_sender : item.important_receiver;
            item.user = item.sender.id === config.user.id ? item.receiver : item.sender;
            item.user = item.user.id === config.user.id ? config.user : item.user;
            return item;
        });

        let importants_stars = _data_.filter(_ => _.important && _.star);
        let importants = _data_.filter(_ => _.important && !_.star);
        let stars = _data_.filter(_ => _.star && !_.important);
        let normals = _data_.filter(_ => !_.star && !_.important);
        let final = [...importants_stars, ...importants, ...stars, ...normals];
        return final;

    }
    const _search_ = () => {

        let result = data.filter(_ => type === 'inbox' ? _.sender.id !== config.user.id : _.sender.id === config.user.id);
        result = _sort_(result);

        result = result.filter((item) => 
            matching(`--${item.id}`, search) ||
            matching(item.id, search) ||
            matching(item.title, search) ||
            matching(item.description, search) ||
            matching(item.content, search) ||
            matching(item.created_at, search) ||
            matching(fix_date_time(item.created_at), search) ||
            matching(item.star ? 'star' : '', search) ||
            matching(item.important ? 'important' : '', search) ||
            matching(item.user?.name, search) ||
            matching(item.user?.email, search) ||
            matching(item.user?.online ? 'online' : 'offline', search)
        );

        result.unreaden = data.filter(_ => _.sender.id !== config.user.id && !_.readen).length;
        setMails(result);
        setChecked([]);
        setPager({start: 1, end: page_size, size: page_size});

    }
    const _star_ = async( id ) => {

        let item = data.find(_ => _.id === id);
        if ( item.sender.id === config.user.id ) item.star_sender = !item.star_sender;
        else item.star_receiver = !item.star_receiver;
        setData([...data]);
        const response = await api('mail/star', {ids: JSON.stringify([id])});

    }
    const _important_ = async( id ) => {

        let item = data.find(_ => _.id === id);
        if ( item.sender.id === config.user.id ) item.important_sender = !item.important_sender;
        else item.important_receiver = !item.important_receiver;
        setData([...data]);
        const response = await api('mail/important', {ids: JSON.stringify([id])});

    }
    const _open_ = async() => {

        selected.readen = true;
        setData([...data]);
        setTab('display');
        const response = await api('mail/active', {ids: JSON.stringify([selected.id])});

    }
    useEffect(() => {

        if ( selected?.id ) _open_();
        else setTab('table');

    }, [selected]);
    useEffect(() => {
        
        setRows(mails.slice(pager.start-1, pager.end));
        setChecked([]);

    }, [pager]);
    useEffect(() => {

        _search_();

    }, [data, type, search]);
    useEffect(() => {
        
        document.title = config.text.mailbox;
        _get_();

    }, []);

    return(

        <div className={`mailbox panel p-0 relative flex overflow-visible h-[calc(100vh_-_100px)] ${config.menu === 'horizontal' && 'lg:h-[calc(100vh_-_152px)]'}`}>

            { tab === 'table' && <Table mails={mails} rows={rows} data={data} setData={setData} setSelected={setSelected} setTab={setTab} type={type} setType={setType} loader={loader} pager={pager} setPager={setPager} checked={checked} setChecked={setChecked} search={search} setSearch={setSearch} setStar={_star_} setImportant={_important_} reload={_get_}/> }

            { tab === 'display' && <Display  mail={selected} setSelected={setSelected} setTab={setTab} setStar={_star_} setImportant={_important_}/> }

            { tab === 'form' && <Form data={data} setData={setData} setTab={setTab} setType={setType} users={users}/> }

            <Broadcast data={data} setData={setData} current_user={config.user}/>

        </div>

    )

}
