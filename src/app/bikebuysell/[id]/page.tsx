import BikeDetails from '@/components/BikeBuySell/BikeDetails';

async function CarDetils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <BikeDetails id={id}/>
    </div>
  )
}

export default CarDetils