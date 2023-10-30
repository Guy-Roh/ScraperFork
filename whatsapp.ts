import {Important} from "./interfaces";
import axios from "axios";
import {goodValueItems, importantData} from "./transform";
import {filteredObjects} from "./fetch";

const greenApiUrl : string = "https://api.green-api.com/waInstance7103868781/sendMessage/270de7e543a3400598aa429fd1cd10854ed72ce1fd5948e795"
const sendWhatsapp = async(items : Important[]):Promise<void> => {
    const payload = {
        chatId: '32488560338@c.us',
        message: `Een nieuwe zoekertje gevonden dat misschien een koopje zou kunnen zijn: 
        ${items[0].title}, Prijs: ${items[0].price},
        De Afstand tussen jou en de koper is: ${items[0].distance}, 
        de url om het te bekijken is:  ${items[0].link}`,
    };

    axios.post(greenApiUrl, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export const sendtoWhatsapp = async() => {
    await sendWhatsapp(await goodValueItems(await importantData(await filteredObjects())));
}