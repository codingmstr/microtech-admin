"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={['vendors', 'clients']}
            bring_values={['level']}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'number', name: 'level', class: 'flex', readOnly: true, value: 1},
                        {element: 'input', type: 'text', name: 'name', class: 'flex'},
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors', value: params.vendor_id},
                        {element: 'select_menu', name: 'client_id', label: 'client', class: 'flex', children: 'clients', value: params.client_id},
                        {element: 'input', type: 'number', name: 'amount', label: 'a_amount', class: 'flex'},
                        {element: 'input', type: 'number', name: 'percentage', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'textarea', name: 'notes'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'input', type: 'text1', name: 'created_at', label: 'date', readOnly: true},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 1, hr: false, class: 'gap-y-6'},
                    inputs: [
                        {element: 'toggle', name: 'vendors'},
                        {element: 'toggle', name: 'clients'},
                        {element: 'toggle', name: 'only_verified', value: false},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
