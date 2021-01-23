const axios = require('axios');
require('dotenv').config();

axios
  .request({ url: process.env.URL, headers: { 'User-Agent': 'PostmanRuntime/7.26.8' } }) // Shhh...
  .then(response => {
    const { listResults } = response.data.cat1.searchResults;
    const homes = listResults
      .map(result => {
        const {
          address,
          area,
          baths,
          beds,
          detailUrl,
          hdpData,
          imgSrc,
          price,
          statusText,
          unformattedPrice,
          zestimate,
        } = result;

        const { daysOnZillow, homeType, taxAssessedValue } = hdpData.homeInfo;

        return {
          __priceToValueRatio: !taxAssessedValue ? undefined : unformattedPrice / taxAssessedValue,
          address,
          area,
          baths,
          beds,
          daysOnZillow,
          detailUrl,
          homeType,
          imgSrc,
          price,
          statusText,
          taxAssessedValue,
          unformattedPrice,
          zestimate,
        };
      })
      .sort((a, b) =>
        a.__priceToValueRatio < b.__priceToValueRatio || !a.__priceToValueRatio ? 1 : -1
      );

    console.log(homes);
  });
