import Cookies from "js-cookie";
import CryptoJS from "./crypto";
import { toast } from 'react-toastify';
export const api_url = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
export const storage = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_STORAGE_URL : process.env.NEXT_PUBLIC_STORAGE_URL;

export async function api ( url, data ) {

    url = `${api_url}/api/admin/${url}`;
    let form = new FormData();
    Object.keys(data || {}).forEach(_ => form.append(_, data[_]));
    form.append('local_lang', localStorage.getItem('lang') || 'ar');
    form.append('local_location', localStorage.getItem('location'));

    const response = await fetch(url, {
        method: 'POST',
        body: form,
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${get_cookie('user')?.token}`,
        }
    });
    
    const res = await response.text();
    try{ return JSON.parse(res); }catch(e){ return res; }

}
export function sound ( src, vol, lazey=true ) {
    
    const audio = new Audio();
    audio.src = `/media/layout/${src}.wav`;
    audio.volume = vol || .7;
    if ( lazey ) setTimeout(() => audio.play(), 100);
    else audio.play();

}
export function print ( ..._ ) {
    
    console.log(..._);

}
export function get_cookie ( key, request ) {

    let value = request ? request.cookies.get(key)?.value : Cookies.get(key);
    if ( !value ) return null;
    value = CryptoJS.AES.decrypt(value, "CODINGMASTER").toString(CryptoJS.enc.Utf8);
    if ( !value ) return null;
    return JSON.parse(value);

}
export function set_cookie ( key, value ) {

    if ( !key || !value ) return;
    value = CryptoJS.AES.encrypt(JSON.stringify(value), "CODINGMASTER").toString();
    Cookies.set(key, value);
    return get_cookie(key);

}
export function reset_cookie ( key, data ) {

    let value = get_cookie(key);
    if ( !value || typeof(data) !== 'object' ) return;
    Object.keys(data).forEach((item) => value[item] = data[item]);
    set_cookie(key, value);
    return get_cookie(key);

}
export function remove_cookie ( key ) {

    Cookies.remove(key);

}
export function active_link ( path ) {

    document.querySelectorAll('.sidebar ul a, .sidebar ul button, ul.horizontal-menu a, ul.horizontal-menu .nav-link').forEach(_ => _.classList.remove('active'));
    document.querySelector(`.sidebar ul a[href='${path}']`)?.classList.add('active');
    document.querySelector(`ul.horizontal-menu a[href='${path}']`)?.classList.add('active');
    document.querySelector(`ul.horizontal-menu a[href='${path}']`)?.closest('li.menu')?.querySelectorAll('.nav-link')[0]?.classList.add('active');
    document.querySelector(`.sidebar ul a[href='${path}']`)?.closest('li.menu')?.querySelectorAll('.nav-link')[0]?.classList.add('active');

}
export function position ( element, query ) {

    if (query === "top") return element.offsetTop;

    if (query === "bottom") return window.outerHeight - element.offsetTop;

    if (query === "left") return element.offsetLeft;

    else if (query === "right") return window.outerWidth - element.offsetLeft;

    else return [element.offsetTop, element.offsetLeft];

}
export function query ( query ) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[query] ? params[query] : params;

}
export function date ( query, _ ) {

    query = query ? query.toLowerCase().replace(/\s+/g, "") : "full";
    var cur_date = _ ? new Date(_.toString().trim()) : new Date();
    let Months = ["January","February","March","April","May","June","July","August",
                    "September","October","November","December"];
    let Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let Mon_name = Months[cur_date.getMonth()];
    let Day_name = Days[cur_date.getDay()];
    let Week_day = cur_date.getDay();
    let years = cur_date.getFullYear();
    let months = cur_date.getMonth() + 1;
    let days = cur_date.getDate();
    let hours = cur_date.getHours();
    let hrs = cur_date.getHours();
    let minutes = cur_date.getMinutes();
    let seconds = cur_date.getSeconds();
    let p = cur_date.getHours() > 12 ? "PM" : "AM";

    hrs = hrs > 12 ? hrs - 12 : hrs;
    hrs = hrs === 0 ? 12 : hrs < 10 ? `0${hrs}` : `${hrs}`;
    years = years < 10 ? `0${years}` : `${years}`;
    months = months < 10 ? `0${months}` : `${months}`;
    days = days < 10 ? `0${days}` : `${days}`;
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if (query === 'int') return cur_date.getTime();
    else if (query === 'y') return cur_date.getFullYear();
    else if (query === 'm') return cur_date.getMonth() + 1;
    else if (query === 'd')  return cur_date.getDate();
    else if (query === 'h') return cur_date.getHours();
    else if (query === 'mi') return cur_date.getMinutes();
    else if (query === 's') return cur_date.getSeconds();
    else if ("years".includes(query)) return cur_date.getFullYear();
    else if ("months".includes(query)) return cur_date.getMonth() + 1;
    else if ("days".includes(query))  return cur_date.getDate();
    else if ("hours".includes(query)) return cur_date.getHours();
    else if ("minutes".includes(query)) return cur_date.getMinutes();
    else if ("seconds".includes(query)) return cur_date.getSeconds();
    else if ("weekdays".includes(query)) return cur_date.getDay();
    else if ("ps".includes(query)) return p;
    else if ("month_lists".includes(query)) return Months;
    else if ("mon_lists".includes(query)) return Months.map(_ => _.slice(0, 3));
    else if ("day_lists".includes(query)) return Days;
    else if ("d_lists".includes(query)) return Days.map(_ => _.slice(0, 3));
    else if ("day_names".includes(query)) return Day_name;
    else if ("d_names".includes(query)) return Day_name.slice(0, 3);
    else if ("month_names".includes(query)) return Mon_name;
    else if ("mon_names".includes(query)) return Mon_name.slice(0, 3);
    else if ("week_days".includes(query)) return Week_day;
    else if ("dates".includes(query)) return `${years}-${months}-${days}`;
    else if ("times".includes(query)) return `${hours}:${minutes}:${seconds}`;
    else if ("dts".includes(query)) return `${years}-${months}-${days} ${hrs}:${minutes} ${p}`;
    else if ("datetimes".includes(query)) return `${years}-${months}-${days} ${hrs}:${minutes}:${seconds} ${p}`;
    else if ("todays".includes(query)) return `${Days[Week_day]}, ${Months[months-1].slice(0, 3)} ${days.replace(/^0/, '')}, ${years}`;
    return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;

}
export function local_date( utc_date ) {

    const utcDate = new Date(utc_date);
    const timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    const localTime = new Date(utcDate.getTime() + timezoneOffset * 60 * 60 * 1000);
    const local_date = date('', localTime);
    return local_date;

}
export function diff_date ( start, end ) {

    start = start ? new Date(start) : new Date();
    end = end ? new Date(end) : new Date();
    return Math.floor((end.getTime() - start.getTime()) / 1000);

}
export function file_info ( File, query ) {
    
    query = query ? query.toLowerCase() : '';
    if ( !File ) return '';
    let Size = File['size'];
    let Real_Size = File['size'];
    let Name = File['name'].split(".").slice(0, -1).join(".");
    let Type = File['type'].split("/")[0];
    let Extention = File['name'].split(".").slice(-1)[0];
    let LastModifiedDate = File['lastModifiedDate'];
 

    if ( !File['type'] ) Extention = "";
    if (Size < 1000) Size = `${Size} Byte`
    else if (Size >= 1000 && Size < 1000000) Size = `${(Size / 1000).toFixed(2)} KB`;
    else if (Size >= 1000000 && Size < 1000000000) Size = `${(Size / 1000000).toFixed(2)} MB`;
    else if (Size >= 1000000000 && Size < 1000000000000) Size = `${(Size / 1000000000).toFixed(2)} GB`;
    else Size = `${(Size / 1000000000000).toFixed(2)} TB`;

    Type = Type === 'image' ? 'image' : Type === 'video' ? 'video' : 'file';
    Extention = Extention || 'png';
    if (query === "size") return Size;
    else if (query === "real_size") return Real_Size;
    else if (query === "name") return Name;
    else if (query === "type") return Type;
    else if (query === "ext") return Extention;
    else if (query === "last_modify") return LastModifiedDate;
    return { file: File, name: Name, size: Size, type: Type, ext: Extention };

}
export function read_file ( file, type ) {

    return new Promise((resolve) => {

        if ( !file ) return resolve();

        let info = file_info(file);
        if ( type === 'image' && info.type !== 'image' ) return resolve();
        if ( type === 'image_video' && !['image', 'video'].includes(info.type) ) return resolve();
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => resolve({...info, url: e.target.result});

    });

}
export function fix_files ( data ) {

    let _new_ = {};
    data?.new_files?.forEach((f, index) => _new_[`file_${index}`] = f.file);
    if ( data.deleted_files ) _new_.deleted_files = JSON.stringify(data.deleted_files);
    return _new_;
    
}
export function image_ext( ext ) {

    let list_ = ["png", "jpg", "jpeg", "gif", "svg", "apng", "ico",
        "avif", "jfif", "pjpeg", "pjp", "webp", "bmp", "eps"];

    return list_.includes(ext.toString().toLowerCase()) ? ext : 'png';

}
export function full_screen () {

    (document.fullScreenElement && null !== document.fullScreenElement) || 
    (!document.mozFullScreen && !document.webkitIsFullScreen) ? document.documentElement.requestFullScreen ?
    document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ?
    document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen
    && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ?
    document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
    document.webkitCancelFullScreen && document.webkitCancelFullScreen()

}
export function check_hidden( _ ){ 
    
    return document.querySelector(_).style.display === "none";

}
export function check_class( el, class_name, check_parent=true ) {

    if ( !el ) return false;
    let same = false;

    class_name.split(" ").forEach( _ => {

        if ( check_parent ) {
            if ( el.classList.contains(_) || el.closest(`.${_}`) ) same = true
        }
        else {
            if ( el.classList.contains(_) ) same = true;
        }
    
    });

    return same;

}
export function lower ( str ) {
    
    return str ? str.toString().toLowerCase() : '';

}
export function upper ( str ) {
    
    return str ? str.toString().toUpperCase() : '';

}
export function capitalize ( str ) {
    
    if ( !str ) return '';
    str = lower(str);
    return str.replace(str.slice(0, 1), upper(str.slice(0, 1)));

}
export function title ( str ) {
    
    if ( !str ) return '';
    str = lower(str);
    return str.split(" ").map(_ => capitalize(_)).join(" ");

}
export function trim ( str ) {
    
    return str ? str.toString().trim(): '';

}
export function no_space ( str ) {
    
    return str ? str.toString().replace(/\s+/g, '') : '';

}
export function int ( _ ) {
    
    return parseInt(_) || 0;

}
export function float ( _ ) {
    
    return parseFloat(_) || 0.0

}
export function round ( num, _ ) {

    if ( !_ ) return parseInt(num) || 0;

    return parseFloat(num).toFixed(_);

}
export function parse ( _, dict ) {

    if ( Array.isArray(_)  ) return _;
    if ( dict ) return JSON.parse(_ || '{}') || {};
    return JSON.parse(_ || '[]') || [];

}
export function localize ( _ ) {

    try{
        let data = JSON.parse(_ || '{}') || {};
        return data[localStorage.getItem('lang') || 'ar'] || '';
    } catch(e) {
        return _ || '';
    }

}
export function language () {

    let lang = navigator.language || navigator.userLanguage || 'en';
    lang = lang.split("-")[0].toLowerCase();
    return lang
    
}
export function matching ( val1, val2 ) {

    val1 = val1 ? val1.toString().toLowerCase().trim().replace(/\s+/g, '') : '';
    val2 = val2 ? val2.toString().toLowerCase().trim().replace(/\s+/g, '') : '';
    return `${val1}s`.includes(val2);
    
}
export function unique ( list ) {

    let list1 = [];
    list.forEach(_ => !list1.includes(_) && list1.push(_));
    return list1;

}
export function fix_number ( num, float ) {

    num = num || 0;
    num = num.toString().split('.');
    let decimal = num[1] || 0;
    let text = num[0].split('').reverse();
    let number = "";
    text.forEach((_, i) => {
        number += _;
        if ( (i + 1) % 3 === 0 && i < text.length - 1) number += ","
    });
    number = number.split('').reverse().join('');
    if ( float ) return `${number}.${decimal ? decimal.toString().slice(0, 2) : '00'}`;
    return `${number}${decimal ? `.${decimal.toString().slice(0, 2)}` : ''}`;

}
export function fix_time ( dt, local=true ) {
    
    dt = dt ? local ? local_date(dt) : dt : '';
    let hours = parseInt(dt?.split(" ")[1]?.split(':')?.slice(0, 2)[0] || 0);
    let minutes = parseInt(dt?.split(" ")[1]?.split(':')?.slice(0, 2)[1] || 0);
    let p = 'AM';

    if ( hours > 10 ) { hours -= 12; p = 'PM' }
    if ( hours === 0 ) { hours = 12; p = 'AM' }

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${p}`;

}
export function fix_date ( dt, time ) {
    
    dt = dt ? local_date(dt) : '';
    let today = `${date('year')}-${date('month')}-${date('day')} 0:0:0`;
    let diff = new Date(today).getTime() - new Date(dt).getTime();
    let text = JSON.parse(localStorage.getItem('text'));

    if ( diff <= 0 ) {
        if ( time ) return fix_time(dt, false);
        else return 'Today';
    }
    else if ( Math.floor(diff / 1000 / 60 / 60) < 24 ) return 'Yasterday';
    else dt = dt?.split(" ")[0];
    return dt;

}
export function fix_date_time ( dt ) {

    dt = dt ? local_date(dt) : '';
    const displayDt = new Date(dt);
    const currentDt = new Date();
    let final_date = ''

    if (displayDt.toDateString() === currentDt.toDateString()) {

        let hr = parseInt(dt.split(' ')[1].split(':')[0]);
        let min = parseInt(dt.split(' ')[1].split(':')[1]);
        let p = 'PM';
        if ( hr < 12 ) p = 'AM';
        if ( hr === 0 ) { hr = 12; }
    
        final_date = `${hr < 10 ? `0${hr}` : hr}:${min < 10 ? `0${min}` : min} ${p}`;

    }
    else if ( displayDt.getFullYear() === currentDt.getFullYear() ) {

        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        final_date = `${String(displayDt.getDate()).padStart(2, '0')} ${monthNames[displayDt.getMonth()]}`;

    }
    else {

        final_date = `${displayDt.getFullYear()}-${String(displayDt.getMonth() + 1).padStart(2, '0')}-${String(displayDt.getDate()).padStart(2, '0')}`;

    }

    return final_date;

}
export function copy ( text, element ) {

    navigator.clipboard.writeText(text);
    element?.select();
    alert_msg('Secret key copied ✔ .');

}
export function scroll_down ( e, smooth ) {

    let element = document.querySelector(e);
    if ( smooth ) element?.classList.add('scroll-smooth');
    else element?.classList.remove('scroll-smooth');

    setTimeout(() => {
        element.scrollBy(0, 100000);
        element.scrollTop = element.scrollHeight;
    }, 100);

}
export function is_down ( e, space ) {

    space = space || 100;
    let result = parseInt(e.target.scrollTop + e.target.offsetHeight) > ( e.target.scrollHeight - space );
    return !result;

}
export function scroll_to ( id ) {

    setTimeout(() => {

        let element = document.querySelector(`#${id}`);
        if ( !element ) return;
        let parent = element.closest('.chat-conversation-box');
        let list = Array.from(parent.children);
        let prev = list[list.indexOf(element)-1];
        prev.scrollIntoView();

    });

}
export function alert_msg ( msg, type ) {

    const options = {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    }

    const message = msg || '';
    if ( type === 'error' ) toast.error(message, options);
    else toast.success(message, options);

}
// setTimeout(() => {

//     if ( !document ) return;
//     let clicking = null;

//     document?.addEventListener('click', function (e) {
        
//         if ( clicking ) return;
//         clicking = e;
//         setTimeout(() => clicking = null, 100);

//         if ( e.target.nodeName === 'A' || e.target.closest('A') ) sound('click', 1, false);
//         else if ( e.target.nodeName === 'BUTTON' || e.target.closest('button') ) sound('click', 1, false);
//         else if ( e.target.nodeName === 'LI' || e.target.closest('LI') ) sound('click', 1, false);
//         else if ( e.target.nodeName === 'INPUT' && e.target.type === 'checkbox' ) sound('click', 1, false);
//         else if ( e.target.closest('LABEL') ) sound('click', 1, false);
//         else if ( e.target.nodeName === 'SELECT' ) sound('click', 1, false);

//     });

// }, 3000);
