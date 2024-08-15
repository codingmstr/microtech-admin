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
                    name: 'order',
                    label: 'orders',
                    icon: 'order',
                    filters: { client_id: id },
                    options: { use_filters: false },
                },
                {
                    name: 'review',
                    label: 'reviews',
                    icon: 'review',
                    filters: { user_id: id },
                    options: { use_filters: false },
                },
                {
                    name: 'comment',
                    label: 'comments',
                    icon: 'comment',
                    filters: { user_id: id },
                    options: { use_filters: false },
                }
            ]}
            general={[
                {
                    options: {cols: 3, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'id', label: 'item_id', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text', name: 'ip', label: 'device', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'name', class: 'flex', required: true},
                        {element: 'input', type: 'email', name: 'email', class: 'flex', required: true},
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'password', name: 'password', class: 'flex', visible: true, required: id ? false : true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'balance', class: 'flex', readOnly: true},
                        {element: 'input', type: 'number', name: 'age', class: 'flex'},
                        {element: 'languages', name: 'language', class: 'flex'},
                        {element: 'countries', name: 'country', class: 'flex'},
                        {element: 'input', type: 'text', name: 'city', class: 'flex'},
                        {element: 'input', type: 'text', name: 'street', class: 'flex'},
                        
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
                    inputs: [{element: 'image_edit', name: 'image', class: 'w-[10rem] h-[10rem]'}],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_login'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_orders'},
                        {element: 'toggle', name: 'allow_coupons'},
                        {element: 'toggle', name: 'allow_reviews'},
                        {element: 'toggle', name: 'allow_contacts'},
                        {element: 'toggle', name: 'allow_comments'},
                        {element: 'toggle', name: 'allow_replies'},
                        {element: 'toggle', name: 'allow_likes'},
                        {element: 'toggle', name: 'allow_dislikes'},
                        {element: 'toggle', name: 'allow_messages'},
                        {element: 'toggle', name: 'allow_reports'},
                        {element: 'toggle', name: 'allow_statistics'},
                        {element: 'toggle', name: 'allow_login'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            statistics={[
                {
                    options: {cols: 3, gap: 4},
                    inputs: [
                        {element: 'chart', type: 'area', name: 'orders', icon: 'order', color: 'success'},
                        {element: 'chart', type: 'area', name: 'reviews', icon: 'product', color: 'info'},
                        {element: 'chart', type: 'area', name: 'coupons', icon: 'coupon', color: 'danger'},
                        {element: 'chart', type: 'area', name: 'comments', icon: 'user', color: 'warning'},
                        {element: 'chart', type: 'area', name: 'replies', icon: 'user', color: 'secondary'},
                        {element: 'chart', type: 'area', name: 'contacts', icon: 'user', color: 'success'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, class: 'mt-4'},
                    inputs: [
                        {element: 'chart', type: 'revenue', name: 'revenue_chart', charts: ['reviews', 'orders', 'comments']},
                    ],
                },
            ]}
        />

    )

}
