"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={['categories', 'products', 'vendors']}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'category_id', label: 'category', class: 'flex', children: 'categories', value: params.category_id},
                        {element: 'select_menu', name: 'product_id', label: 'product', class: 'flex', children: 'products', value: params.product_id},
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors', value: params.vendor_id},
                        {element: 'select', type: 'country', name: 'country', class: 'flex', value: 'EG'},
                        {element: 'input', type: 'text', name: 'city', class: 'flex'},
                        {element: 'select', type: 'service', name: 'type', label: 'services', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'number', name: 'amount', label: 'commission_amount', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'percentage', label: 'commission_percentage', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'min_price', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'max_price', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'min_orders', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'max_orders', class: 'flex free-label'},
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
                        {element: 'toggle', name: 'only_verified', value: false},
                        {element: 'toggle', name: 'coupons', label: 'with_coupons'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
