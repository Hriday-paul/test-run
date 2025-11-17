
const env = process.env.NEXT_PUBLIC_production as "production" | "dev";

export const config = {
  serverBaseApi: process.env.SERVER_BASE_API,

  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API,

  hasSSL : process.env.HAS_SSL == "true" ? true : false,

//   myDomain: process.env.MY_DOMAIN,

  MAP_KEY: process.env.NEXT_PUBLIC_MAP_KEY,
  
  env: env
};

export const placeHolderBlurImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWnpaaXiDhOAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='

export const bikeBrands = [
    "Yamaha",
    "Honda",
    "Suzuki",
    "Hero",
    "TVS",
    "Bajaj",
    "Lifan",
    "Runner",
    "KTM",
    "Aprilia",
    "kawasaki",
    "Benelli",
    "keeway",
    "Taro GP",
    "roadmaster",
    "vespa",
    "Gpx Demon - 165R",
    "Taro GP V3",
    "Gpx Demon - 165RR",
    "Generic Cafe Racer",
    "AUGE",
    "DAYUNG",
    "Zara",
    "Haojue",
    "Benelli",
    "walton Fusion",
    "Vespa lx 125",
    "EMMA",
    "Royel Enfild",
    "Hammer"
];