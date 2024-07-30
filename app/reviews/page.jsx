"use client";
import { useState } from "react";
import Table from "@/components/table";
import Form from "@/components/form";

export default function _Page_ ({ searchParams, item_filters, options }) {

    const [system, setSystem] = useState('reviews');
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
                    ]}
                /> :
                <Form
                    id={id}
                    system={system}
                    setForm={setForm}
                    bring={['clients']}
                    related={[
                        {
                            name: 'admins',
                            filters: { user_id: id },
                            options: { use_filters: false, settings: false, search: false },
                        },
                    ]}
                    general={[
                        {
                            options: {cols: 2, gap: 6, hr: true},
                            inputs: [
                                {element: 'input', type: 'text', name: 'name', class: 'flex', focus: true},
                                {element: 'input', type: 'email', name: 'email', class: 'flex'},
                                {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                                {element: 'input', type: 'number', value: 18, name: 'age', class: 'flex'},
                                {element: 'select_menu', name: 'client', value: searchParams.user_id || 0, class: 'flex', children: 'clients'},
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
                            options: {cols: 3, gap: 6, hr: false},
                            inputs: [
                                {element: 'chart', name: 'orders'},
                                {element: 'comments', name: 'comments'},
                                {element: 'replies', name: 'replies'},
                            ],
                        },
                    ]}
                    sidebar={[
                        {
                            options: {cols: 2, gap: 6, hr: true},
                            inputs: [
                                {element: 'input', type: 'text', name: 'date', readOnly: true},
                                {element: 'input', type: 'text', name: 'price', readOnly: true},
                            ],
                        },
                        {
                            options: {cols: 2, gap: 6, hr: false},
                            inputs: [
                                {element: 'toggle', value: true, name: 'paid'},
                                {element: 'toggle', value: true, name: 'active'},
                            ],
                        },
                    ]}
                />
            }
        </div>

    )

}
