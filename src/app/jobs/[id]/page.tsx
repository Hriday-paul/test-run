import JobDetails from '@/components/Job/JobDetails';

async function Detils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <JobDetails id={id}/>
    </div>
  )
}

export default Detils