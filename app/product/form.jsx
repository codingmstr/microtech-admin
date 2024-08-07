"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm }) {

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
                        {element: 'select_menu', name: 'vendor_id', label: 'vendor', class: 'flex', children: 'vendors'},
                        {element: 'select_menu', name: 'category_id', label: 'category', class: 'flex', children: 'categories'},
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
                        {element: 'languages', name: 'language', class: 'flex'},
                        {element: 'countries', name: 'country', class: 'flex'},
                        {element: 'input', type: 'text', name: 'city', class: 'flex'},
                        {element: 'input', type: 'text', name: 'street', class: 'flex'},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'input', type: 'number', name: 'bathrooms', class: 'flex'},
                        {element: 'input', type: 'number', name: 'rooms', class: 'flex'},
                        {element: 'input', type: 'number', name: 'beds', class: 'flex'},
                        {element: 'input', type: 'number', name: 'adults', class: 'flex'},
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
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'editor', name: 'availability'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'editor', name: 'policy', label: 'cancellation_policy'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: true},
                    inputs: [
                        {element: 'editor', name: 'rules', label: 'house_rules'},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'editor', name: 'safety'},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 2, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'number', name: 'id', label: 'item_id', readOnly: true},
                        {element: 'input', type: 'number', name: 'views', readOnly: true},
                        {element: 'input', type: 'number', name: 'reviews', readOnly: true},
                        {element: 'input', type: 'number', name: 'orders', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_reviews', label: 'reviews'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 6, hr: true},
                    inputs: [
                        {element: 'toggle', name: 'allow_reviews'},
                        {element: 'toggle', name: 'allow_coupons'},
                        {element: 'toggle', name: 'allow_orders'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
                {
                    options: {cols: 3, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'desert_view'},
                        {element: 'toggle', name: 'sea_view'},
                        {element: 'toggle', name: 'hair_dryer'},
                        {element: 'toggle', name: 'cleaning_properties'},
                        {element: 'toggle', name: 'washing_machine'},
                        {element: 'toggle', name: 'iron'},
                        {element: 'toggle', name: 'indoor_stove'},
                        {element: 'toggle', name: 'wifi'},
                        {element: 'toggle', name: 'kitchen'},
                        {element: 'toggle', name: 'refrigerator'},
                        {element: 'toggle', name: 'oven'},
                        {element: 'toggle', name: 'television'},
                        {element: 'toggle', name: 'air_conditioner'},
                        {element: 'toggle', name: 'dining_table'},
                        {element: 'toggle', name: 'ceiling_fan'},
                        {element: 'toggle', name: 'desk_fan'},
                        {element: 'toggle', name: 'necessities'},
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
                        // {element: 'chart', type: 'items', name: 'category_chart', charts: ['orders', 'reviews', 'coupons']},
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
