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
                        {element: 'input', type: 'text', name: 'title', class: 'flex', required: true},
                        {element: 'input', type: 'text', name: 'slug', class: 'flex', readOnly: true},
                        {element: 'languages', name: 'language', class: 'flex'},
                        {element: 'countries', name: 'country', class: 'flex'},
                        {element: 'input', type: 'text', name: 'phone', class: 'flex'},
                        {element: 'input', type: 'text', name: 'company', class: 'flex'},
                        {element: 'input', type: 'text', name: 'created_at', label: 'date', class: 'flex', readOnly: true},
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
                    options: {cols: 1, gap: 1, hr: false},
                    inputs: [
                        {element: 'editor', name: 'content', class: 'medium'},
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
