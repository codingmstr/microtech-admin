"use client";
import { useState } from "react";
import Table from "./table";
import Form from "./form";

export default function _Page_ ({ searchParams, item_filters, options }) {

    const [system, setSystem] = useState('review');
    const [form, setForm] = useState(false);
    const [id, setId] = useState(0);

    return (

        <div>
            {
                form ? <Form system={system} id={id} setForm={setForm}/> :
                <Table system={system} id={id} setId={setId} setForm={setForm} params={searchParams} item_filters={item_filters} options={options}/>
            }
        </div>

    )

}
