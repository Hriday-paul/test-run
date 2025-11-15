import { SlLocationPin } from "react-icons/sl";

function CarCard() {
    return (
        <div
            key={v.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0"
        >
            <img
                src={v.image}
                alt={v.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 pt-0 space-y-2">
                <h3 className="font-semibold text-gray-900 text-lg">
                    {v.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 gap-1">
                    <SlLocationPin size={14} /> {v.location}
                </div>
                <div className="my-2" />
                <div className="flex items-center justify-between text-gray-700 text-sm">
                    <div className="flex flex-col justify-between items-start gap-5">
                        <span className="flex items-center gap-1">
                            <Gauge size={14} /> {v.km} km
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={14} /> {v.seats} Seats
                        </span>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-5">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} /> {v.year}
                        </span>
                        <span className="flex items-center gap-1">
                            <Bike size={14} /> {v.brand}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <DollarSign size={14} /> {v.price}
                    </p>
                    <Link href={"/shop/car-shop/car-details"}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-[#0C8CE9] hover:text-white bg-[#0C8CE9]/30 hover:bg-[#0C8CE9] transition-all duration-300 cursor-pointer py-5 px-6"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CarCard