"use client";
import { useState } from "react";
import Table from "@/components/table";
import Form from "@/components/form";
import { date } from "@/public/script/main";

export default function _Page_ ({ searchParams, item_filters, options }) {

    const [system, setSystem] = useState('products');
    const [form, setForm] = useState(false);
    const [id, setId] = useState(0);

    return (

        <div>
            {
                !form ?
                <Table
                    id={id}
                    system={system}
                    setForm={setForm}
                    setId={setId}
                    searchParams={searchParams}
                    item_filters={item_filters}
                    {...options}
                    columns={[
                        { accessor: 'id', title: 'id', render: ({ id }) => <div>{id}</div> },
                        { accessor: 'title', title: 'title', render: ({ title }) => <div className="max-w-[15rem] line-clamp-1">{title}</div> },
                        { accessor: 'body', title: 'body', render: ({ body }) => <div className="max-w-[25rem] line-clamp-1">{body}</div> },
                        { accessor: 'userId', title: 'user', render: ({ userId }) => <div>{userId}</div> },
                    ]}
                /> :
                <Form
                    id={id}
                    system={system}
                    setForm={setForm}
                    bring={[
                        'categories',
                    ]}
                    related={[
                        {
                            name: 'orders',
                            label: 'orders',
                            hidden: false,
                            filters: { user_id: id },
                            options: { use_filters: false, settings: false, search: false },
                        },
                        {
                            name: 'reviews',
                            filters: { user_id: id },
                            options: { use_filters: false, settings: false, search: false },
                        },
                    ]}
                    general={[
                        {
                            options: {cols: 1, gap: 1, hr: true, hidden: false},
                            inputs: [{element: 'slider', name: 'files'}],
                        },
                        {
                            options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                            inputs: [
                                {element: 'input', type: 'text', name: 'name', class: 'flex', required: true, focus: false},
                                {element: 'input', type: 'phone', name: 'phone', class: 'flex',  required: true},
                                {element: 'select_menu', name: 'category', label: 'category', class: 'flex', children: 'categories'},
                            ],
                        },
                        {
                            options: {cols: 1, gap: 1, hr: true, hidden: false},
                            inputs: [
                                {element: 'editor', name: 'details'},
                            ],
                        },
                        {
                            options: {cols: 1, gap: 1, hr: false},
                            inputs: [
                                {element: 'textarea', name: 'notes'},
                            ],
                        },
                    ]}
                    settings={[
                        {
                            options: {cols: 3, gap: 6, hr: false},
                            inputs: [
                                {element: 'toggle', name: 'allow_categories'},
                                {element: 'toggle', name: 'allow_products'},
                                {element: 'toggle', name: 'allow_coupons'},
                                {element: 'toggle', name: 'allow_orders'},
                                {element: 'toggle', name: 'allow_reviews'},
                            ],
                        },
                    ]}
                    statistics={[
                        {
                            options: {cols: 3, gap: 4},
                            inputs: [
                                {element: 'chart', type: 'area', name: 'orders', icon: 'order', color: 'success', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                                {element: 'chart', type: 'area', name: 'reviews', icon: 'user', color: 'info', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                                {element: 'chart', type: 'area', name: 'comments', icon: 'coupon', color: 'danger', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                                {element: 'chart', type: 'area', name: 'replies', icon: 'user', color: 'warning', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                                {element: 'chart', type: 'area', name: 'coupons', icon: 'coupon', color: 'secondary', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                                {element: 'chart', type: 'area', name: 'logins', icon: 'user', color: 'success', total: 4938, series: [4232, 5121, 2366, 1277, 4233, 3111, 2345]},
                            ],
                        },
                        {
                            options: {cols: 2, gap: 4, class: 'mt-4'},
                            inputs: [
                                {element: 'chart', type: 'summary', name: 'Profit', label: ['income', 'expenses', 'profit'], series: [2938, 928, 928]},
                                {element: 'chart', type: 'category', name: 'Another', label: ['confirmed', 'cancelled', 'reviews'], series: [2938, 928, 928]},
                            ],
                        },
                        {
                            options: {cols: 1, gap: 1, class: 'mt-4'},
                            inputs: [
                                {
                                    element: 'chart',
                                    type: 'statistics',
                                    name: 'Statistics',
                                    frame: 'daily',
                                    series: {
                                        daily: [
                                            {name: 'products', data: [32, 1, 23, 23, 12, 5, 29]},
                                            {name: 'coupons', data: [23, 2, 32, 11, 9, 23, 23]},
                                        ],
                                        weekly: [
                                            {name: 'products', data: [22, 299, 128, 1919, 10, 128, 29]},
                                            {name: 'coupons', data: [29, 19, 182, 20, 199, 1282, 129]},
                                        ],
                                        monthly: [
                                            {name: 'products', data: [29, 121, 109, 19, 153, 97, 217, 100, 287, 33, 223, 239]},
                                            {name: 'coupons', data: [20, 101, 100, 10, 103, 97, 210, 120, 207, 30, 203, 299]},
                                        ],
                                        yearly: [
                                            {name: 'products', data: [22, 299, 128, 1919, 10, 128, 29]},
                                            {name: 'coupons', data: [29, 19, 182, 20, 199, 1282, 129]},
                                        ],
                                    },
                                },
                            ],
                        },
                    ]}
                    sidebar={[
                        {
                            options: {cols: 2, gap: 6, hr: true},
                            inputs: [
                                {element: 'input', readOnly: true, value: date(), name: 'created_at'},
                                {element: 'input', readOnly: true, value: 0, name: 'reviews'},
                            ],
                        },
                        {
                            options: {cols: 2, gap: 6, hr: false},
                            inputs: [
                                {element: 'toggle', value: true, name: 'allow_login'},
                                {element: 'toggle', value: true, name: 'active'},
                            ],
                        },
                    ]}
                />
            }
        </div>

    )

}
