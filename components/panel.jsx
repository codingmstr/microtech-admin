"use client";
import { print } from '@/public/script/main';
import Elements from './elements';

export default function Form ({ items, data, setData }) {

    const set_data = ( item, e ) => {

        let _data_ = data;

        if ( item.element === 'slider' ) { _data_.new_files = e.new_files; _data_.deleted_files = e.deleted_files; }
        else if ( item.element === 'image_edit' ) _data_[`${item.name}_file`] = e.file;
        else _data_[item.name] = e;

        setData({..._data_});

    }
    return (

        <div>
            {
                items.map((group, index) =>
                    
                    !group.options?.hidden &&
                    <div key={index}>

                        <div className={`panel-grid grid grid-cols-${group.options?.cols || 1} gap-${group.options?.gap || 1} ${group.options?.class}`}>

                            {
                                group.inputs.map((item, index) =>

                                    <Elements 
                                        key={index} 
                                        element={item.element} 
                                        type={item.type} 
                                        name={item.name} 
                                        label={item.label} 
                                        value={data[item.name]} 
                                        onChange={(e) => set_data(item, e)} 
                                        readOnly={item.readOnly} 
                                        visible={item.visible} 
                                        focus={item.focus} 
                                        color={item.color} 
                                        icon={item.icon} 
                                        total={item.total} 
                                        series={item.series} 
                                        height={item.height} 
                                        frame={item.frame}
                                        className={item.class} 
                                        required={item.required}
                                        children={data[item.children] || []}
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
