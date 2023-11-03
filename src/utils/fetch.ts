import * as interfaces from "./interfaces";
import {Listing} from "./interfaces";

const url = "https://www.2dehands.be/lrp/api/search?attributesByKey[]=Language%3Aall-languages&l1CategoryId=820&l2CategoryId=1953&limit=100&offset=0&postcode=2000&searchInTitleAndDescription=true&viewOptions=list-view";
const fetched = async (): Promise<interfaces.Items> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
export const filteredObjects = async ():Promise<Listing[]> => {
    let data = await fetched();
    let filteredData : interfaces.Listing[] = [];
    for (let i=0;i<data.listings.length;i++) {
        if (data.listings[i].priorityProduct == "NONE" && !data.listings[i].sellerInformation.showWebsiteUrl) {
            filteredData.push(data.listings[i]);
        }
    }
    return filteredData;
}