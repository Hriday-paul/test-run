import WorkshopDetails from '@/components/WorkShop/WorkshopDetails';

async function CarDetils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <WorkshopDetails id={id}/>
    </div>
  )
}

export default CarDetils