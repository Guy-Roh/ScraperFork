import * as interfaces from "./interfaces"
import {Listing} from "./interfaces";


let url = "https://www.2dehands.be/lrp/api/search?attributesByKey[]=Language%3Aall-languages&l1CategoryId=820&l2CategoryId=1953&limit=30&offset=30&postcode=2000&searchInTitleAndDescription=true&viewOptions=list-view"
const fetched = async (): Promise<interfaces.Items> => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
}

const logData = async() => {
    let data = await fetched();
    console.log(data);
}

const firstObject = async () => {
    let data = await fetched();
    console.log(data.listings[0]);
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

logFilteredData();