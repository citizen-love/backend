import axios from 'axios';


const getRootUrl = operation => `https://maps.googleapis.com/maps/api/geocode/json?${operation}&key=${process.env.GEOLOCATION_KEY}`;


const DEFAULT_SWISS_LOCATION = {
  lat: '47.371744',
  lng: '8.542136'
};

const searchByZIP = async (zip, country) => {
  try {
    const { data: { results } } = await axios(getRootUrl(`address=${zip}&region=${country}`));

    if (!results.length) {
      return DEFAULT_SWISS_LOCATION;
    }
    return results[0].geometry.location;
  } catch (e) {
    console.log(e);
    return DEFAULT_SWISS_LOCATION;
  }
};

export default {
  searchByZIP
};
