import AccessoriesDetails from '@/components/Accessories/AccessoriesDetails';
import BikeDetails from '@/components/BikeBuySell/BikeDetails';

async function Detils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <AccessoriesDetails id={id}/>
    </div>
  )
}

export default Detils