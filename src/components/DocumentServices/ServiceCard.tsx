import { IService } from '@/redux/types'
import pdfIcon from "../../../public/pdf.svg"
import Image from 'next/image'
import Link from 'next/link'

function ServiceCard({ service }: { service: IService }) {
    return (
        <div className="p-6 border border-stroke bg-white rounded-lg space-y-4">
            <div className="flex items-start gap-3">
                <Image src={pdfIcon} alt='pdf icon' height={100} width={1000} className='h-20 w-auto' />
            </div>

            <h3 className="text-xl font-popin font-medium text-foreground">{service?.bnName}</h3>

            <p className="text-sm text-zinc-800 font-popin leading-relaxed">{service?.description || "N/A"}</p>

            <div className="flex items-center gap-2">
                {/* <DollarSign className="w-5 h-5 text-muted-foreground" /> */}
                <span className="text-base font-medium font-popin text-foreground">Processing Price: {service?.price} TK</span>
            </div>

            <Link href={`/vehicle-process/${service?.id}`} scroll={true}>
                <button className="w-full bg-primary hover:bg-primary/80 duration-150 text-white font-medium py-2 cursor-pointer text-center font-popin rounded-lg">Process Now</button>
            </Link>
        </div>
    )
}

export default ServiceCard