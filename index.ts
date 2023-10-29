import * as interfaces from "./interfaces"
import {Important, Items, Listing} from "./interfaces";
const request = require('request');

const apiKey : string = "LiO+/mro1pMzUhj6UFJBSQ==qkXaBUvmcUldfHrx";
let url = "https://www.2dehands.be/lrp/api/search?attributesByKey[]=Language%3Aall-languages&l1CategoryId=820&l2CategoryId=1953&limit=30&offset=30&postcode=2000&searchInTitleAndDescription=true&viewOptions=list-view"
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
            price : data[i].priceInfo.priceCents/100,
            cityName : data[i].location.cityName,
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

const CityLongtitudeLatitude = async(cityName : string):Promise<string[]> => {
    const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${cityName}&country=BE&key=${apiKey}`);
    const data = await response.json();
    return data;
}
const PrintCityCoordinates = async() => {
    let data = await CityLongtitudeLatitude("attenrode");
    console.log(data);
}



var name = 'San Francisco'
request.get({
    url: 'https://api.api-ninjas.com/v1/city?name=' + name,
    headers: {
        'X-Api-Key': 'YOUR_API_KEY'
    },
}, function(error:string, response:string, body:string[]) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else console.log(body)
});