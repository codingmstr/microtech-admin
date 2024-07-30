"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { actions } from '@/public/script/store';

export default function Account () {

    const router = useRouter();
    const dispatch = useDispatch();

    return (

        <div>Account</div>

    )

}
