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
