import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { get_cookie, host } from '@/public/script/main';

let echo;

if ( typeof window !== 'undefined' ) {

    window.Pusher = Pusher;

    echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_WS_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_WS_PORT,
        wssPort: process.env.NEXT_PUBLIC_REVERB_WS_PORT,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        authEndpoint: `${host}/api/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${get_cookie('user')?.token}`
            },
            withCredentials: true,
        },
    });

}

export default echo;
