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
                    name: 'comment',
                    label: 'comments',
                    icon: 'comment',
                    filters: { blog_id: id },
                    options: { use_filters: false },
                },
                {
                    name: 'reply',
                    label: 'replies',
                    icon: 'reply',
                    filters: { blog_id: id },
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
                        {element: 'input', type: 'phone', name: 'phone', class: 'flex'},
                        {element: 'select', type: 'country', name: 'country', class: 'flex', value: 'EG'},
                        {element: 'select', type: 'language', name: 'language', class: 'flex', value: 'ar'},
                        {element: 'input', type: 'text_date', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
                    ],
                },
                {
                    options: {cols: 1, gap: 6, hr: true, class: 'gap-x-[2.5rem] gap-y-7'},
                    inputs: [
                        {element: 'json_textarea', rows: 2, name: 'title', required: true},
                        {element: 'json_textarea', rows: 2, name: 'location'},
                        {element: 'json_textarea', rows: 2, name: 'company'},
                        {element: 'json_textarea', rows: 2, name: 'description'},
                        {element: 'json_editor', rows: 2, name: 'content', class: 'medium'},
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
                    options: {cols: 3, gap: 5, hr: true},
                    inputs: [
                        {element: 'input', type: 'number', name: 'id', label: 'item_id', readOnly: true},
                        {element: 'input', type: 'number', name: 'views', readOnly: true},
                        {element: 'input', type: 'number', name: 'likes', readOnly: true},
                        {element: 'input', type: 'number', name: 'dislikes', readOnly: true},
                        {element: 'input', type: 'number', name: 'comments', readOnly: true},
                        {element: 'input', type: 'number', name: 'replies', readOnly: true},
                    ],
                },
                {
                    options: {cols: 2, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_comments', label: 'reviews'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
            settings={[
                {
                    options: {cols: 3, gap: 6, hr: false},
                    inputs: [
                        {element: 'toggle', name: 'allow_comments'},
                        {element: 'toggle', name: 'allow_replies'},
                        {element: 'toggle', name: 'allow_likes'},
                        {element: 'toggle', name: 'allow_dislikes'},
                        {element: 'toggle', name: 'active'},
                    ],
                },
            ]}
        />

    )

}
