"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm} qrcode={true}
            bring={[
                'vendors',
                'products',
            ]}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: false, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors', value: params.vendor_id},
                        {element: 'select_menu', name: 'product_id', label: 'product', class: 'flex', children: 'products', value: params.product_id, langs: true},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true, class: 'gap-x-[2.5rem] gap-y-7 mt-7'},
                    inputs: [
                        {element: 'input', type: 'url', name: 'url', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 1, gap: 6, hr: true},
                    inputs: [
                        {element: 'json_textarea', rows: 2, name: 'title'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select', type: 'country', name: 'country', class: 'flex'},
                        {element: 'input', type: 'email', name: 'email', class: 'flex'},
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'input', type: 'phone', name: 'whatsapp', class: 'flex'},
                        {element: 'input', type: 'number', name: 'old_price', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'new_price', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'points', class: 'flex free-label'},
                        {element: 'input', type: 'datetime-local', name: 'expired_at', class: 'flex free-label'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'json_textarea', name: 'details'},
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
                    options: {cols: 1, gap: 1, hr: true, class: 'justify-center'},
                    inputs: [{element: 'image_edit', name: 'image', type: 'qr', class: 'h-[13rem]', readOnly: true}],
                },
                {
                    options: {cols: 2, gap: 1, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
