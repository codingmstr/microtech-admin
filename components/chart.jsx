"use client";
import { fix_number, date, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Icons from './icons';
import Dropdown from './menu';
import Loader from './loader';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Chart ({ data, type, label, color, title, height, icon }) {

    const config = useSelector((state) => state.config);
    const [mounted, setMounted] = useState(false);
    const [frame, setFrame] = useState('daily');
    const [total, setTotal] = useState(data?.total || 0);
    const [series, setSeries] = useState(data ? data[frame]?.series || [] : []);
    const [loader, setLoader] = useState(true);

    const area = {
        series: [{name: label, data: series.filter(_ => _ > 0).length ? series : [1, 1, 1, 1, 1, 1, 1]}],
        options: {
            chart: {
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: [
                color === 'danger' ? '#e7515a' : 
                color === 'info' ? '#4361ee' : 
                color === 'warning' ? '#e2a03f' : 
                color === 'secondary' ? '#9e45ae' : 
                color === 'success-light' ? '#36d2a1' : '#00ab55'
            ],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: series.filter(_ => _ > 0).length ? 90 : 150,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };
    const revenue = {
        series: Array.isArray(data) && data.map(_ => { return { name: config.text[_.name], data: _[frame]?.series || [] } }),
        options: {
            chart: {
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: true,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: ['#E7515A', '#00ab55', '#e2a03f', '#2196F3'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#00ab55',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 2,
                        dataPointIndex: 4,
                        fillColor: '#e2a03f',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 3,
                        dataPointIndex: 3,
                        fillColor: '#2196F3',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: 
                frame === 'daily' ?  [...date('d_list').slice(date('week_day')+1), ...date('d_list').slice(0, date('week_day')+1)] 
                : frame === 'weekly' ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] 
                : frame === 'monthly' ? [...date('mon_list').slice(date('month')), ...date('mon_list').slice(0, date('month'))] : 
                [date('year')-6, date('year')-5, date('year')-4, date('year')-3, date('year')-2, date('year')-1, date('year')],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: config.dir === 'rtl' ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value) => {
                        // return value / 1000 + 'K';
                        return parseFloat(value).toFixed(1);
                    },
                    offsetX: config.dir === 'rtl' ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: config.dir === 'rtl' ? true : false,
            },
            grid: {
                borderColor: config.theme === 'dark' ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 10,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: config.theme === 'dark' ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: config.theme === 'dark' ? [100, 100] : [45, 100],
                },
            },
        },
    };
    const items = {
        series: Array.isArray(data) ? data.map(_ => _.total || 1) : [],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: config.theme === 'dark' ? '#0e1726' : '#fff',
            },
            colors: config.theme === 'dark' ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: config.theme === 'dark' ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: config.text.total,
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w) => {
                                    return w.globals.seriesTotals.reduce(function (a, b) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: Array.isArray(data) ? data.map(_ => config.text[_.name] || '') : [''],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };
    useEffect(() => {

        setTimeout(() => setMounted(true), 500);
        setTimeout(() => setLoader(false), 1000);
        setSeries(data ? data[frame]?.series || [] : []);

    }, [frame, data]);

    return (

        <div className='w-full h-full chart-div'>
            {
                mounted ?
                <div className='panel w-full h-full p-0'>
                    {
                        type === 'revenue' ?
                        <div className="p-4 h-full">

                            <div className="mb-5 flex items-center justify-between dark:text-white-light no-select">

                                <h5 className="text-lg font-semibold">{config.text.statistics}</h5>

                                <div className="dropdown">

                                    <Dropdown offset={[0, 1]} placement={`${config.dir === 'rtl' ? 'bottom-start' : 'bottom-end'}`}
                                        button={
                                            <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        }>

                                        <ul>
                                            <li onClick={() => setFrame('daily')}><button type="button">{config.text.daily}</button></li>
                                            <li onClick={() => setFrame('weekly')}><button type="button">{config.text.weekly}</button></li>
                                            <li onClick={() => setFrame('monthly')}><button type="button">{config.text.monthly}</button></li>
                                            <li onClick={() => setFrame('yearly')}><button type="button">{config.text.yearly}</button></li>
                                        </ul>

                                    </Dropdown>
                                    
                                </div>

                            </div>

                            <div className="relative">

                                <div className="rounded-lg bg-white dark:bg-black">
                                    
                                    <ReactApexChart series={revenue.series} options={revenue.options} type="area" height={height || 370} width={'100%'}/>

                                </div>

                            </div>

                        </div>
                        : type === 'area' ?
                        <div className={`p-0 h-full min-h-[${height || 170}px]`}>

                            <div className="absolute flex w-full items-center justify-between p-5">

                                { color === 'success' && <div className={`flex h-10 w-10 items-center justify-center rounded-lg opacity-[.8] bg-success-light text-success dark:bg-success dark:text-success-light`}><Icons icon={icon || 'product'}/></div> }
                                { color === 'info' && <div className={`flex h-10 w-10 items-center justify-center rounded-lg opacity-[.8] bg-info-light text-info dark:bg-info dark:text-info-light`}><Icons icon={icon || 'product'}/></div> }
                                { color === 'warning' && <div className={`flex h-10 w-10 items-center justify-center rounded-lg opacity-[.8] bg-warning-light text-warning dark:bg-warning dark:text-warning-light`}><Icons icon={icon || 'product'}/></div> }
                                { color === 'danger' && <div className={`flex h-10 w-10 items-center justify-center rounded-lg opacity-[.8] bg-danger-light text-danger dark:bg-danger dark:text-danger-light`}><Icons icon={icon || 'product'}/></div> }
                                { color === 'secondary' && <div className={`flex h-10 w-10 items-center justify-center rounded-lg opacity-[.8] bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light`}><Icons icon={icon || 'product'}/></div> }

                                <h5 className="text-2xl default font-semibold ltr:text-right rtl:text-left dark:text-white-light">

                                    {fix_number(total).replace(/.0+$/, '')}

                                    <span className="block text-sm font-normal tracking-wide">{config.text[label]}</span>

                                </h5>

                            </div>

                            <div className="rounded-lg bg-transparent pt-4">
                                <ReactApexChart series={area.series} options={area.options} type='area' height={height || 170} width={'100%'}/>
                            </div>

                        </div>
                        : type === 'items' ?
                        <div className={`p-4 h-full relative min-h-[${height || 400}px] ${loader && 'min-h-[360px]'}`}>

                            <div className="mb-5 flex items-center">

                                <h5 className="text-lg font-semibold dark:text-white-light">{config.text[title || 'chart_items']}</h5>

                            </div>

                            <div className="rounded-lg bg-white dark:bg-black pb-2">
                                <ReactApexChart series={items.series} options={items.options} type="donut" height={height || 400} width={'100%'}/>
                            </div>

                        </div> : ''
                    }
                </div> :
                <div className={`panel relative min-h-[300px] w-full`}>
                    <Loader className='medium bg opacity-0'/>
                </div>
            }
        </div>

    );

};
