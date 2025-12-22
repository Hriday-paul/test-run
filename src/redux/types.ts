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
    address: string | null,

    division: IDivision | null,
    district: IDistrict | null,
    area: IArea | null

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
    images: { key: string, url: string, id : number }[],
    category: Category
    car: ICar
    bike: IBike
    workshop: IWorkshop
    job: IJob
    exchange: IExchange
    lawyer: Lawyer
    carRent: IRentCar

    createdAt: Date
    updatedAt: Date

    divisionId : number | null,
    division: IDivision | null
    districtId : number | null
    district: IDistrict | null
    
    areaId : number | null
    area: IArea | null

    owner: IUser

    status: boolean

    view_count: number

}

export enum Category {
    Bike = "Bike",
    Car = "Car",
    Workshop = "Workshop",
    Accessories = "Accessories",
    Job = "Job",
    Exchange = "Exchange",
    Lawyer = "Lawyer",
    CarRent = "CarRent"
}


export interface ICar {
    id: number;

    car_type: string | null;
    condition: string | null;
    brand: string | null;
    model: string | null;
    body_type: string | null;
    mileage: number | null;
    year: number | null;
    engine: string | null;
    color: string | null;
    fuel_type: string | null;
    transmission: string | null;
    gear_box: string | null;
    drive_type: string | null;
    air_condition: boolean | string;
    seat: string | null;
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
    employment_type: string
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
    phone: string | null
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

export interface IRentCar {
    id: number,
    car_type: string
    location: string,
    phone: string
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}


export interface IDivision {
    id: number,
    name: string
    bName: string | null
}

export interface IDistrict {
    id: number,
    name: string
    bName: string | null
}
export interface IArea {
    id: number,
    name: string
    bName: string | null
}

export interface Package {
    "id": number,
    "name": string,
    "description": string | null,
    "duration": number,
    "price": number,
    "discount": string | null,
    "top_add_count": number,
    "bumpup_count": number,
    "feature_count": number,
    "add_count": number,
    "createdAt": Date,
    "updatedAt": Date,
    "isDeleted": Boolean

}

export interface Payment {
    id: number
    "subscription": {
        "package": Package | null
    },
    "order": null,
    "amount": number,
    "transactionId": string,
    "isPaid": boolean,
    "createdAt": Date
}

export interface IService {
    "id": number,
    "name": string,
    "bnName": string,
    "price": number,
    "description": string | null,
    "icon": string | null,
    "category": string,
    requirements: IRequirement[]
}

export interface IRequirement {
    "id": number,
    "serviceId": number,
    "name": string,
    "bnName": string,
    "fieldType": "File" | "Text",
    "required": boolean,
    "field_name": string
}

export interface IOrder {
    "id": number,
    "userId": number,
    "status": string,
    "isPaid": boolean,
    "serviceId": number,
    "paymentId": number,
    "fields": [],
    "otherFiles": [],
    "service": IService,

    response_list: { id : number, name: string, fieldType : string, File: { key: string, url: string } | null, data : string | null }[]

    createdAt: Date,
    updatedAt: Date
}

export interface IPackage {
    "id": number,
    "name": string,
    "description": string | null,
    "duration": number,
    "price": number,
    "discount": number | null,
    "top_add_count": number,
    "bumpup_count": number,
    "feature_count": number,
    "add_count": number,
    "createdAt": Date,
    "updatedAt": Date,
}