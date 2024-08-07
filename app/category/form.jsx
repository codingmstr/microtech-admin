"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            related={[
                {
                    name: 'product',
                    label: 'products',
                    icon: 'product',
                    filters: { category_id: id },
                    options: { use_filters: false },
                },
            ]}
            general={[
                {
                    options: {cols: 3, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'id', label: 'item_id', class: 'flex', readOnly: true},
                        {element: 'input', type: 'number', name: 'products', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'name', class: 'flex', required: true},
                        {element: 'input', type: 'text', name: 'slug', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'company', class: 'flex'},
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'input', type: 'text', name: 'location', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'textarea', name: 'description'},
                        {element: 'textarea', name: 'notes'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 1, gap: 1, hr: true, class: 'justify-center'},
                    inputs: [{element: 'image_edit', name: 'image', type: 'md', class: 'h-[11rem]'}],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_products', label: 'products'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_products'},
                        {element: 'toggle', name: 'allow_coupons'},
                        {element: 'toggle', name: 'allow_orders'},
                        {element: 'toggle', name: 'allow_reviews'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            statistics={[
                {
                    options: {cols: 3, gap: 4},
                    inputs: [
                        {element: 'chart', type: 'area', name: 'products', icon: 'order', color: 'success'},
                        {element: 'chart', type: 'area', name: 'orders', icon: 'product', color: 'info'},
                        {element: 'chart', type: 'area', name: 'coupons', icon: 'coupon', color: 'danger'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, class: 'mt-4'},
                    inputs: [
                        {element: 'chart', type: 'revenue', name: 'revenue_chart', charts: ['products', 'coupons']},
                    ],
                },
            ]}
        />

    )

}
