const fetch = require('node-fetch');
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: {
    apikey : "H7j17vFUPVYWJCaFca2UUQmB3eAuWQRc"
  }
};

async function conversion(to,from,amount){
    try{
        const response = await fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);
        const converted = await response.json();
        return converted.result;
    }
    catch(err){
        console.log(err);
        return null;
    }
}
module.exports = conversion

