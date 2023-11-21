import {Important, Listing} from "./interfaces";

const latitudeMerksem : number = 51.2512741;
const longtitudeMerksem: number = 4.448539;
export const importantData = async(data : Listing[]):Promise<Important[]> => {
    let important : Important[] = [];
    for (let i=0;i<data.length;i++) {
        important[i] = {
            itemId: data[i].itemId,
            title: data[i].title,
            description : data[i].description,
            price : data[i].priceInfo.priceCents/100,
            cityName : data[i].location.cityName,
            distance: haversineDistance(data[i].location.latitude,data[i].location.longitude),
            dateDay: data[i].date.substring(5,10),
            dateHour: data[i].date.substring(11,16),
            link : `https://link.2dehands.be/${data[i].itemId}?utm_source=ios_social&utm_medium=social&utm_campaign=socialbuttons&utm_content=ap`
        };

    }
    return important
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

export const goodValueItems = async(items:Important[]):Promise<Important[]> => {
    let goodValues : Important[] = [];
    for (let i=0;i<items.length;i++) {
        if (items[i].title.includes("11") && items[i].price < 150) {
            goodValues.push(items[i]);
        }
        else if (items[i].title.includes("12") && items[i].price < 250) {
            goodValues.push(items[i]);
        }
        else if (items[i].title.includes("13") && items[i].price < 300) {
            goodValues.push(items[i]);
        }
        else if (items[i].title.includes("14") && items[i].price < 350) {
            goodValues.push(items[i]);
        }
    }
    return goodValues;
}

export const specificIphone = async(importantData: Important[], sortIphone:string):Promise<Important[]> => {
    let iphonelijst : Important[] = [];
    for (let i=0;i<importantData.length;i++) {
        if(importantData[i].title.includes(`${sortIphone}`)) {
            iphonelijst.push(importantData[i]);
        }
    }
    return iphonelijst;
}
export const firstItem = async(items:Important[]):Promise<Important> => {
    return items[0]
}
