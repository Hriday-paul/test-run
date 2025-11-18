export type IUser = {
    "location": {
        "type": "Point"
    },
    "_id": string,
    "email": string,
    "__v": 0,

    status: boolean,
    phone: string,
    first_name: string,
    last_name: string | null,
    whatsapp: string | null
    picture: { url: string, key: string } | null
    auth: {
        role: "User" | "Vendor"
    },

    division: string | null,
    district: string | null,
    upzilla: string | null,

    facebook: string | null
    twitter: string | null,
    youtube: string | null,
    instagram: string | null
    linkedin: string | null

}

export type Add = {
    id: number
    title: string
    price: number
    description: string | null
    images: { key: string, url: string }[],
    category: Category
    car: ICar
    bike: IBike
    workshop: IWorkshop
    job: IJob
    exchange: IExchange
    lawyer: Lawyer

    createdAt: Date
    updatedAt: Date

    division: string
    district: string

}

export enum Category {
    Bike = "Bike",
    Car = "Car",
    Workshop = "Workshop",
    Accessories = "Accessories",
    CarRent = "CarRent",
    Job = "Job",
    Exchange = "Exchange",
    Lawyer = "Lawyer",
}


export interface ICar {
    id: number;

    car_type?: string | null;
    condition?: string | null;
    brand?: string | null;
    model?: string | null;
    body_type?: string | null;
    mileage?: number | null;
    year?: number | null;
    engine?: string | null;
    color?: string | null;
    fuel_type?: string | null;
    transmission?: string | null;
    gear_box?: string | null;
    drive_type?: string | null;
    air_condition?: boolean | null;
    seat?: number | null;
}

export interface IBike {
    id: number;

    condition?: string | null;
    model?: string | null;
    year?: number | null;
    engine?: string | null;
    mileage?: number | null;
    kilometer?: number | null;
    color?: string | null;
    fuel_type?: string | null;
    edition?: string | null;
    brand: string | null;
    bike_type: string | null
}

export interface IJob {
    id: number;

    dedline?: string | null;
    vacancy?: number | null;
    salary?: string | null;
    age?: string | null;
    experience?: number | null;
    job_location?: string | null;
    about_company?: string | null;

    company_name: string;
    job_type: string;
    employment_type : string
}

export interface IExchange {
    exchange_category: ExchangeCategory;
    condition: Contition;
    wanted_category: ExchangeCategory;
    location?: string | null;
}


export enum Contition {
    New = "New",
    Used = "Used",
}

export enum ExchangeCategory {
    Car = "Car",
    Bike = "Bike",
    Phone = "Phone",
    Gadget = "Gadget",
    Truck = "Truck",
    Bicycle = "Bicycle",
    Van = "Van",
    Scooter = "Scooter",
    Laptop = "Laptop",
    Property = "Property",
    Other = "Other",
}

export interface Lawyer {
    phone : string | null
    gender?: string | null;
    license_number?: string | null;
    bar_council?: string | null;

    specialization: string[];         // required array
    experience_years?: number | null;
    language: string[];               // required array
    chamber_location?: string | null;

    consultation_fee?: number | null;
    hourly_rate?: number | null;

    available_from?: string | null;
    available_to?: string | null;
}

export interface IWorkshop {
    id: number,
    address: string
    open_time?: string
    close_time?: string
    open_days: string[]
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}


export interface IDivision {
    "id": number,
    "name": string,
    "bn_name": string,
    "lat": number,
    "long": number
}

export interface IDistrict {
    "id": number,
    "division_id": number,
    "name": string,
    "bn_name": string,
    "lat": number,
    "long": number
}