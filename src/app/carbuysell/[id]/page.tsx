import CarDetails from '@/components/CarBuySell/CarDetails';
import React from 'react'

async function CarDetils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <CarDetails id={id}/>
    </div>
  )
}

export default CarDetils