import React from 'react'

const Badge = (params:{title:string}) => {
    return (
        <div title='This product will return soon.' className="px-2 py-1 bg-gray-200 text-gray-500 font-bold rounded-full text-sm" >
            {params.title}
        </div>
    )
}

export default Badge
