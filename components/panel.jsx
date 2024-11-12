"use client";
import { print } from '@/public/script/main';
import { useEffect } from 'react';
import Elements from './elements';

export default function Panel ({ items, data, setData, system }) {

    const is_hidden = ( item ) => {

        let hidden = false;
        if ( !item.hidden_when ) return hidden;
        Object.keys(item.hidden_when).forEach(_ => hidden = data[_] === item.hidden_when[_]);
        return hidden;

    }
    const set_data = ( item, e ) => {

        let _data_ = data;

        if ( item.element === 'slider' ) {
            _data_.new_files = e.new_files; _data_.deleted_files = e.deleted_files;
            _data_.slider = { files: e.files, new_files: e.new_files, deleted_files: e.deleted_files }
        }
        else if ( item.element === 'image_edit' ) _data_[`${item.name}_file`] = e.file;
        else _data_[item.name] = e;
     
        setData({..._data_});

    }
    useEffect(() => {

        if ( system !== 'order' ) return;
        let new_price = data.products?.find(_ => _.id == data.product_id)?.new_price || 0;
        let discount = data.coupons?.find(_ => _.id == data.coupon_id)?.discount || 0;
        let price = new_price - (new_price * discount / 100);
        setData({...data, price: price});

    }, [data.product_id, data.coupon_id]);

    return (

        <div>
            {
                items.map((group, index) => (!group.options?.hidden && !is_hidden(group.options)) &&
                    <div key={index}>
                        <div className={`panel-grid grid grid-cols-${group.options?.cols || 1} gap-${group.options?.gap || 1} ${group.options?.class}`}>
                            {
                                group.inputs.map((item, index) =>
                                    !is_hidden(item) &&
                                    <Elements 
                                        key={index} 
                                        element={item.element} 
                                        type={item.type} 
                                        name={item.name} 
                                        label={item.label} 
                                        value={data[item.name]} 
                                        onChange={(e) => set_data(item, e)} 
                                        readOnly={item.readOnly} 
                                        copyable={item.copyable} 
                                        visible={item.visible} 
                                        rows={item.rows} 
                                        focus={item.focus} 
                                        color={item.color} 
                                        icon={item.icon} 
                                        items={item.items} 
                                        height={item.height} 
                                        className={item.class} 
                                        required={item.required}
                                        children={data[item.children] || []}
                                        slider={data.slider}
                                    />
                                )
                            }
                        </div>
                        { group.options?.hr && <Elements element="hr"/> }
                    </div>
                )
            }
        </div>

    )

}
