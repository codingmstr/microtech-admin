"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={[
                'products',
                'clients',
                'coupons',
            ]}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'product_id', label: 'product', class: 'flex', children: 'products', readOnly: id, translate: true},
                        {element: 'select_menu', name: 'client_id', label: 'client', class: 'flex', children: 'clients', readOnly: id},
                        {element: 'select', name: 'coupon_id', label: 'coupon', class: 'flex', children: 'coupons', readOnly: id},
                        {element: 'input', type: 'text1', name: 'price', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', name: 'name', class: 'flex'},
                        {element: 'input', type: 'email', name: 'email', class: 'flex'},
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'select', type: 'country', name: 'country', class: 'flex', value: 'EG'},
                        {element: 'input', name: 'city', class: 'flex'},
                        {element: 'input', name: 'street', class: 'flex'},
                        {element: 'input', type: 'text1', name: 'created_at', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text1', name: 'paid_at', class: 'flex', readOnly: true},
                        {element: 'input', type: 'date', name: 'ordered_at', label: 'date', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'textarea', name: 'address'},
                        {element: 'textarea', name: 'notes'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'select', type: 'status', name: 'status'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'input', type: 'text1', value: '--', name: 'secret_key', readOnly: true, copyable: id},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'paid'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
