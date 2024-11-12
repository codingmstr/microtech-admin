"use client";
import { useSelector } from 'react-redux';
import Form from "@/components/form";

export default function _Form_ ({ system, id, setForm, params }) {

    const config = useSelector((state) => state.config);

    return (

        <Form
            id={id} system={system} setForm={setForm}
            bring={[
                'blogs',
                'comments',
                'clients',
            ]}
            general={[
                {
                    options: {cols: 2, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'select_menu', name: 'comment_id', label: 'comment', class: 'flex', children: 'comments', readOnly: id, required: !id, value: params.comment_id},
                        {element: 'select_menu', name: 'client_id', label: 'client', class: 'flex', children: 'clients', readOnly: id, value: params.client_id},
                    ],
                },
                {
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'textarea', name: 'content', required: true},
                    ],
                },
            ]}
            sidebar={[
                {
                    options: {cols: 2, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'number', name: 'id', label: 'item_id', readOnly: true},
                        {element: 'input', type: 'text1', name: 'created_at', label: 'date', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
