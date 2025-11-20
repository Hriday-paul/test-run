import JobDetails from '@/components/Job/JobDetails';
import LawyerDetails from '@/components/Lawyers/LawyerDetails';

async function Detils({params}:{params : Promise<{id : string}>}) {
    const {id} = await params;
  return (
    <div>
        <LawyerDetails id={id}/>
    </div>
  )
}

export default Detils