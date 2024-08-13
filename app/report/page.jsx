"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Table from "./table";
import Form from "./form";

export default function _Page_ ({ item_filters, options }) {

    const [system, setSystem] = useState('report');
    const searchParams = useSearchParams();
    const [params, setParams] = useState({});
    const [form, setForm] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {

        const params_data = {};
        for (const [key, value] of searchParams.entries()) params_data[key] = value;
        setParams(params_data);

        if ( params_data.edit ) setId(params_data.edit);
        if ( params_data.add || params_data.edit ) setForm(true);

    }, []);

    return (

        <div>
            {
                form ? <Form system={system} id={id} setForm={setForm} params={params}/> :
                <Table system={system} id={id} setId={setId} setForm={setForm} params={params} item_filters={item_filters} options={options}/>
            }
        </div>

    )

}
