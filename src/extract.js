import axios from 'axios';

const {PINATA_API_Key,PINATA_SECRET_KEY,PINATA_JWT} = require('./components/data.js');


export default async function pinList()  {
  try {
    const res = await axios.get('https://api.pinata.cloud/data/pinList?includeCount=false&status=pinned', {
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`
      }
    })
    const pins = res.data;
    return(pins);
  } catch(error) {
    console.log(error);
  }
}
