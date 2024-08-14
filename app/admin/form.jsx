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
                    name: 'report',
                    label: 'reports',
                    icon: 'report',
                    filters: { admin_id: id },
                    options: { use_filters: false },
                },
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
                        {element: 'input', type: 'number', name: 'salary', class: 'flex'},
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
                        {element: 'toggle', name: 'supervisor', value: false},
                        {element: 'toggle', name: 'active'},
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
                        {element: 'toggle', name: 'allow_contacts'},
                        {element: 'toggle', name: 'allow_blogs'},
                        {element: 'toggle', name: 'allow_comments'},
                        {element: 'toggle', name: 'allow_replies'},
                        {element: 'toggle', name: 'allow_vendors'},
                        {element: 'toggle', name: 'allow_clients'},
                        {element: 'toggle', name: 'allow_mails'},
                        {element: 'toggle', name: 'allow_messages'},
                        {element: 'toggle', name: 'allow_statistics'},
                        {element: 'toggle', name: 'allow_login'},
                        {element: 'toggle', name: 'allow_reports', value: false},
                        {element: 'toggle', name: 'supervisor', value: false},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
