const axios = require('axios');

const geocode = async (address) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/'${address}.json?access_token=pk.eyJ1IjoiaGFyc2hpbDAxIiwiYSI6ImNsbHFkaXRncDBkOWIzdW5ya21hNTljbDMifQ.GAG5ixApWyQXVgVUen7lAg&limit=1`

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.features.length === 0) {
            return {error:'Unable to find location. Try another search.'};
        }

        else {
            return {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            }
        }

    }
    catch (error) {
        return {error:'Unable to connect to location services!'};
    }

}




module.exports = geocode;