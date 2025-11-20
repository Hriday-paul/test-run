import ExchangeDetails from '@/components/Exchange/ExchangeDetails';

async function Detils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <ExchangeDetails id={id}/>
    </div>
  )
}

export default Detils