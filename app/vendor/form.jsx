"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm} wallet={true} referrals={true} chatbox={true}
            related={[
                {
                    name: 'product',
                    label: 'products',
                    icon: 'product',
                    filters: { vendor_id: id },
                    options: { use_filters: false },
                },
                {
                    name: 'order',
                    label: 'orders',
                    icon: 'order',
                    filters: { vendor_id: id },
                    options: { use_filters: false },
                },
            ]}
            general={[
                {
                    options: {cols: 3, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text1', name: 'id', label: 'item_id', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text1', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
                        {element: 'input', type: 'text1', name: 'ip', label: 'device', class: 'flex', readOnly: true},
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
                    options: {cols: 1, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'json_textarea', rows: 1, name: 'company', required: true},
                        {element: 'json_textarea', rows: 1, name: 'location', required: true},
                        {element: 'json_textarea', rows: 2, name: 'description', required: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'date', name: 'birth_date', class: 'flex'},
                        {element: 'select', type: 'gender', name: 'gender', class: 'flex', value: 'male'},
                        {element: 'select', type: 'language', name: 'language', class: 'flex', value: 'ar'},
                        {element: 'select', type: 'country', name: 'country', class: 'flex', value: 'EG'},
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
                        {element: 'toggle', name: 'available'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 1, hr: false, class: 'gap-y-6'},
                    inputs: [
                        {element: 'toggle', name: 'allow_products'},
                        {element: 'toggle', name: 'allow_orders'},
                        {element: 'toggle', name: 'allow_coupons'},
                        {element: 'toggle', name: 'allow_reviews'},
                        {element: 'toggle', name: 'allow_messages'},
                        {element: 'toggle', name: 'allow_reports'},
                        {element: 'toggle', name: 'allow_blogs'},
                        {element: 'toggle', name: 'allow_comments'},
                        {element: 'toggle', name: 'allow_replies'},
                        {element: 'toggle', name: 'allow_likes'},
                        {element: 'toggle', name: 'allow_dislikes'},
                        {element: 'toggle', name: 'allow_transactions'},
                        {element: 'toggle', name: 'allow_referrals'},
                        {element: 'toggle', name: 'allow_statistics'},
                        {element: 'toggle', name: 'allow_login'},
                        {element: 'toggle', name: 'allow_withdraws'},
                        {element: 'toggle', name: 'allow_deposits'},
                        {element: 'toggle', name: 'allow_pay_later'},
                        {element: 'toggle', name: 'allow_notifications'},
                        {element: 'toggle', name: 'allow_manual_notifications'},
                        {element: 'toggle', name: 'allow_qrcodes'},
                        {element: 'toggle', name: 'allow_followers'},
                        {element: 'toggle', name: 'allow_private_services'},
                        {element: 'toggle', name: 'available'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            statistics={[
                {
                    options: {cols: 3, gap: 4},
                    inputs: [
                        {element: 'chart', type: 'area', name: 'products', icon: 'product', color: 'success'},
                        {element: 'chart', type: 'area', name: 'orders', icon: 'order', color: 'info'},
                        {element: 'chart', type: 'area', name: 'coupons', icon: 'coupon', color: 'danger'},
                        {element: 'chart', type: 'area', name: 'reviews', icon: 'user', color: 'secondary'},
                        {element: 'chart', type: 'area', name: 'comments', icon: 'user', color: 'warning'},
                        {element: 'chart', type: 'area', name: 'revenue', icon: 'user', color: 'success'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, class: 'mt-4'},
                    inputs: [
                        {element: 'chart', type: 'revenue', name: 'revenue_chart', charts: ['products', 'orders', 'coupons']},
                    ],
                },
            ]}
        />

    )

}
