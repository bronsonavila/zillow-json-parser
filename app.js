const axios = require('axios');
const fs = require('fs');
const { parse } = require('json2csv');

const fields = [
  '__priceToValueRatio',
  'address',
  'area',
  'baths',
  'beds',
  'dateSold',
  'detailUrl',
  'homeType',
  'imgSrc',
  'price',
  'taxAssessedValue',
  'zestimate',
];
const opts = { fields };

require('dotenv').config();

axios
  .request({ url: process.env.URL, headers: { 'User-Agent': 'PostmanRuntime/7.26.8' } })
  .then(response => {
    const { listResults } = response.data.cat1.searchResults;
    const homes = listResults
      .map(result => {
        const { address, area, baths, beds, detailUrl, hdpData, zestimate } = result;

        const { dateSold, homeType, price, taxAssessedValue } = hdpData.homeInfo;

        return {
          __priceToValueRatio: !taxAssessedValue
            ? undefined
            : Number((price / taxAssessedValue).toFixed(2)),
          address,
          area,
          baths,
          beds,
          dateSold: new Date(dateSold).toLocaleDateString(),
          detailUrl,
          homeType,
          price,
          taxAssessedValue,
          zestimate,
        };
      })
      .sort((a, b) =>
        a.__priceToValueRatio < b.__priceToValueRatio || !a.__priceToValueRatio ? 1 : -1
      );

    console.log(homes);

    fs.writeFileSync('homes.csv', parse(homes, opts));
  });
