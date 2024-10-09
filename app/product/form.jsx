"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={[
                'categories',
                'vendors',
            ]}
            related={[
                {
                    name: 'order',
                    label: 'orders',
                    icon: 'order',
                    filters: { product_id: id },
                    options: { use_filters: false },
                },
                {
                    name: 'review',
                    label: 'reviews',
                    icon: 'review',
                    filters: { product_id: id },
                    options: { use_filters: false },
                },
            ]}
            general={[
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'slider', name: 'images'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors', value: params.vendor_id},
                        {element: 'select_menu', name: 'category_id', label: 'category', class: 'flex', children: 'categories', value: params.category_id},
                        {element: 'input', type: 'text', name: 'name', class: 'flex', required: true},
                        {element: 'input', type: 'number', name: 'old_price', class: 'flex'},
                        {element: 'input', type: 'number', name: 'new_price', class: 'flex'},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'text', name: 'company', class: 'flex'},
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'languages', name: 'language', class: 'flex', value: 'ar'},
                        {element: 'countries', name: 'country', class: 'flex', value: 'EG'},
                        {element: 'input', type: 'text', name: 'city', class: 'flex'},
                        {element: 'input', type: 'text', name: 'street', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'number', name: 'max_persons', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'duration', label: 'duration_min', class: 'flex free-label'},
                        {element: 'input', type: 'number', name: 'max_orders', class: 'flex free-label'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'time_list', name: 'times', label: 'available_times'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'include_list', name: 'includes', label: 'what_includes'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'expected_list', name: 'expected', label: 'what_expect'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true},
                    inputs: [
                        {element: 'textarea', name: 'description'},
                        {element: 'textarea', name: 'notes'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'editor', name: 'details'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'editor', name: 'policy', label: 'cancellation_policy'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 2, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'number', name: 'views', readOnly: true},
                        {element: 'input', type: 'number', name: 'reviews', readOnly: true},
                        {element: 'input', type: 'number', name: 'rate', readOnly: true},
                        {element: 'input', type: 'number', name: 'orders', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_reviews'},
                        {element: 'toggle', name: 'allow_coupons'},
                        {element: 'toggle', name: 'allow_orders'},
                        {element: 'toggle', name: 'allow_cancel'},
                        {element: 'toggle', name: 'pay_later'},
                        {element: 'toggle', name: 'allow'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            statistics={[
                {
                    options: {cols: 3, gap: 4},
                    inputs: [
                        {element: 'chart', type: 'area', name: 'orders', icon: 'order', color: 'info'},
                        {element: 'chart', type: 'area', name: 'reviews', icon: 'review', color: 'success'},
                        {element: 'chart', type: 'area', name: 'coupons', icon: 'coupon', color: 'danger'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, class: 'mt-4'},
                    inputs: [
                        {element: 'chart', type: 'revenue', name: 'revenue_chart', charts: ['orders', 'reviews', 'coupons']},
                    ],
                },
            ]}
        />

    )

}
