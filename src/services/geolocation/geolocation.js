import axios from 'axios';


// https://maps.googleapis.com/maps/api/geocode/json?address=6900&region=ch&key=AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk
const getRootUrl = operation => `https://maps.googleapis.com/maps/api/geocode/json?${operation}&key=${process.env.GEOLOCATION_KEY}`;


const DEFAULT_SWISS_LOCATION = {
  lat: '47.371744',
  len: '8.542136'
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
    return null;
  }
};

export default {
  searchByZIP
};
