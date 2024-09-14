import Filter from '@/components/ui/filters'
import React from 'react'

export interface OrderFilterData {
    id: string
    name: string
};
const OrderFilters = () => {

    const OrderFiltersData: OrderFilterData[] = [
        { 'id': 'ongoing', "name": "Ongoing" },
        { 'id': 'previous', "name": "Previous" },
    ]
    return (
        <div>
            <Filter
                data={OrderFiltersData}
                componentName='orders'
                valueKey='name'
                name='Filter Orders'
            />
        </div>
    )
}

export default OrderFilters
