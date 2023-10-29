import * as interfaces from "./interfaces"
import {Important, Items, Listing} from "./interfaces";

const apiKey : string = "LiO+/mro1pMzUhj6UFJBSQ==qkXaBUvmcUldfHrx";
let url = "https://www.2dehands.be/lrp/api/search?attributesByKey[]=Language%3Aall-languages&l1CategoryId=820&l2CategoryId=1953&limit=30&offset=30&postcode=2000&searchInTitleAndDescription=true&viewOptions=list-view"
const latitudeMerksem : number = 51.2512741;
const longtitudeMerksem: number = 4.448539;
const fetched = async (): Promise<interfaces.Items> => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
}
const filteredObjects = async ():Promise<Listing[]> => {
    let data = await fetched();
    let filteredData : interfaces.Listing[] = [];
    for (let i=0;i<data.listings.length;i++) {
        if (data.listings[i].priorityProduct == "NONE") {
            filteredData.push(data.listings[i]);
        }
    }
    return filteredData;
}

const logFilteredData = async() => {
    let data = await filteredObjects();
    console.log(data);
}

const randomNumber = (min:number, max:number):number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const importantData = async(data : Listing[]):Promise<Important[]> => {
    let important : Important[] = [];
    for (let i=0;i<data.length;i++) {
        important[i] = {
            title: data[i].title,
            description : data[i].description,
            price : `${data[i].priceInfo.priceCents/100} €`,
            cityName : data[i].location.cityName,
            distance: `${haversineDistance(data[i].location.latitude,data[i].location.longitude)} KM verwijderd van je locatie`,
            dateDay: data[i].date.substring(5,10),
            dateHour: data[i].date.substring(11,16),
            vipUrl : data[i].vipUrl
        };

    }
    return important
}

const printImportantData = async() => {
    let data = await importantData(await filteredObjects());
    console.log(data);
}

const haversineDistance = (lat: number, lon: number):number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat - latitudeMerksem) * (Math.PI / 180);
    const dLon = (lon - longtitudeMerksem) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latitudeMerksem * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Math.floor(R * c); // Distance in kilometers
    return distance;
}


printImportantData();