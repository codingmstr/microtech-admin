"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'name', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'email', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'phone', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'ip', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'agent', class: 'flex', readOnly: true},
                        {element: 'countries', name: 'country', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'city', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'textarea', name: 'address'},
                        {element: 'textarea', name: 'content'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 2, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'text', name: 'id', label: 'item_id', readOnly: true},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
