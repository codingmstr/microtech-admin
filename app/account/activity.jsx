"use client";
import { api, alert_msg, print } from "@/public/script/main";
import { useSelector } from 'react-redux';
import Table from "@/components/table";

export default function Activity () {

    const config = useSelector((state) => state.config);

    return (

        <div className="relative">
            
            <Table
                id={config.user.id}
                system={'reports'}
                use_filters={false}
                search={false}
                add={false}
                edit={false}
                settings={false}
                columns={[
                    { accessor: 'id', title: 'id', render: ({ id }) => <div>{id}</div> },
                    { accessor: 'title', title: 'title', render: ({ title }) => <div className="max-w-[15rem] line-clamp-1">{title}</div> },
                    { accessor: 'body', title: 'body', render: ({ body }) => <div className="max-w-[25rem] line-clamp-1">{body}</div> },
                    { accessor: 'userId', title: 'user', render: ({ userId }) => <div>{userId}</div> },
                ]}
            />

        </div>

    )

}
