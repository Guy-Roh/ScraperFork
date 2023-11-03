import {firstItem, goodValueItems, importantData, specificIphone} from './transform';
import {filteredObjects} from './fetch';
import {Listing} from "./interfaces";

let gefilterdeObjects = filteredObjects();
export const logFilteredData = async() => {
    console.log(await gefilterdeObjects);
}

export const printImportantData = async() => {
    let data = await importantData(await filteredObjects());
    console.log(data);
}
export const printSpecificIphone = async() => {
    let data = await specificIphone(await importantData(await filteredObjects()),"13");
    console.log(data);
}

export const printGoodValues = async() => {
    let data = await goodValueItems(await importantData(await filteredObjects()));
    console.log(data);
}
export const printFirstItem = async() => {
    let item = await firstItem(await importantData(await filteredObjects()));
    console.log(item);
}