# Zillow JSON Parser

Just a way for me to browse Zillow's search results more efficiently. Results are logged as an array of parsed JSON and written to a CSV, e.g.:

```javascript
[
  // ...
  {
    __priceToValueRatio: 0.99,
    address: '94-1446 Lanikuhana Ave APT 405, Mililani, HI 96789',
    area: 1158,
    baths: 3,
    beds: 3,
    daysOnZillow: 8,
    detailUrl: 'https://www.zillow.com/homedetails/94-1446-Lanikuhana-Ave-APT-405-Mililani-HI-96789/72094691_zpid/',
    homeType: 'SINGLE_FAMILY',
    imgSrc: 'https://photos.zillowstatic.com/fp/a8792a83eba45c1de2d5f5c36c06e08b-p_e.jpg',
    price: '$489,000',
    statusText: 'Active',
    taxAssessedValue: 491700,
    unformattedPrice: 489000,
    zestimate: 505174
  },
  // ...
]
```
