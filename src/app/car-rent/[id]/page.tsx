import RentCarDetails from '@/components/RentCar/RentCarDetails';

async function Detils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <RentCarDetails id={id}/>
    </div>
  )
}

export default Detils