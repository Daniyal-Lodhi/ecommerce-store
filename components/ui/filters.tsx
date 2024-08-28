'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useState } from 'react'

interface FilterProps {
    data: (Color | Size)[] | null
    valueKey: string
    name: string
}

const Filter: React.FC<FilterProps> = ({
    data,
    valueKey,
    name
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedValue = searchParams.get(valueKey);

    const onFilterClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id
        }
        if (current[valueKey] === id) {
            query[valueKey] = null;
        }
        const querifiedUrl = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {
            skipNull: true
        }
        );
        router.push(querifiedUrl,{scroll:false});

    }
    return (
        <div className='mb-5' >
            <div className='font-semibold text-lg' >
                {name}
            </div>
            <hr className='my-3' />
            <div className='flex flex-wrap gap-2' >
                {data?.map((item) => (
                    <button onClick={() => onFilterClick(item.id)} key={item.id} id={item.id} className={`  font-bold text-sm border border-gray-500 rounded-md px-3 py-1 
                ${selectedValue === item.id && 'text-white bg-slate-800'}
                `}  >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Filter
