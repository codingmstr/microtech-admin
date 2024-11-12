"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

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
                        {element: 'input', type: 'number', name: 'id', label: 'item_id', class: 'flex', readOnly: true},
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
                    options: {cols: 2, gap: 1, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'supervisor', value: false},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 1, hr: false, class: 'gap-y-6'},
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
                        {element: 'toggle', name: 'allow_vendors_wallet', value: false},
                        {element: 'toggle', name: 'allow_clients_wallet', value: false},
                        {element: 'toggle', name: 'allow_reports', value: false},
                        {element: 'toggle', name: 'supervisor', value: false},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
