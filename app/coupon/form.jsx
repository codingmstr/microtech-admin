"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={[
                'vendors',
                'categories',
                'products',
                'clients',
            ]}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors'},
                        {element: 'select_menu', name: 'category_id', label: 'category', class: 'flex', children: 'categories'},
                        {element: 'select_menu', name: 'product_id', label: 'product', class: 'flex', children: 'products'},
                        {element: 'select_menu', name: 'client_id', label: 'client', class: 'flex', children: 'clients'},
                        {element: 'input', type: 'text', name: 'name', class: 'flex', required: true},
                        {element: 'input', type: 'number', name: 'discount', class: 'flex', required: true},
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
                    options: {cols: 3, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'number', name: 'id', label: 'item_id', readOnly: true},
                        {element: 'input', type: 'number', name: 'orders', readOnly: true},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_orders', label: 'orders'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
