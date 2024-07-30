import { NextResponse } from 'next/server';
import { get_cookie } from "@/public/script/main";

const redirect = ( url, request ) => {

    return NextResponse.redirect(new URL(url, request.url));

}
const check_auth = ( request, path, user ) => {

    if ( !user ) {
        if ( path !== '/auth/login' ) return redirect('/auth/login', request);
    }
    else {
        if ( !user.logged ) {
            if ( path !== '/auth/unlock' ) return redirect('/auth/unlock', request);
        }
        else{
            if ( path.includes('/auth') ) return redirect('/', request);
        }
    }

}
const check_role = ( request, path, user ) => {

    if ( path.includes('/home') ) return redirect('/', request);
    if ( path.includes('/categories') && !user.allow_categories ) return redirect('/', request);
    if ( path.includes('/products') && !user.allow_products ) return redirect('/', request);
    if ( path.includes('/coupons') && !user.allow_coupons ) return redirect('/', request);
    if ( path.includes('/orders') && !user.allow_orders ) return redirect('/', request);
    if ( path.includes('/reviews') && !user.allow_reviews ) return redirect('/', request);
    if ( path.includes('/blogs') && !user.allow_blogs ) return redirect('/', request);
    if ( path.includes('/comments') && !user.allow_comments ) return redirect('/', request);
    if ( path.includes('/replies') && !user.allow_replies ) return redirect('/', request);
    if ( path.includes('/contacts') && !user.allow_contacts ) return redirect('/', request);
    if ( path.includes('/reports') && !user.allow_reports ) return redirect('/', request);
    if ( path.includes('/chatbox') && !user.allow_messages ) return redirect('/', request);
    if ( path.includes('/mailbox') && !user.allow_mails ) return redirect('/', request);
    if ( path.includes('/clients') && !user.allow_clients ) return redirect('/', request);
    if ( path.includes('/vendors') && !user.allow_vendors ) return redirect('/', request);
    if ( path.includes('/admins') && !user.supervisor ) return redirect('/', request);
    if ( path.includes('/settings') && !user.super ) return redirect('/', request);

}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
export const middleware = async( request ) => {

    const path = request.nextUrl.pathname;
    const user = get_cookie('user', request);

    if ( /\.(.*)$/.test(path) ) return NextResponse.next();

    const auth_denied = check_auth( request, path, user );
    if ( auth_denied ) return auth_denied;

    const role_denied = check_role( request, path, user );
    if ( role_denied ) return role_denied;

}
