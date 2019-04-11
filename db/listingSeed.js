const { Listing } = require('../models');

Listing.remove({}).then(_ => {
  Listing.insertMany([
    {
      address: '123 loop ave',
      availability: true,
      imgUrls: [
        'https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg',
      ],
      notes: 'im a note on loop',
    },
    {
      address: '647 graph ave',
      availability: false,
      imgUrls: [
        'https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg',
      ],
      notes: 'im a note on graph',
    },
    {
      address: '647 bird ave',
      availability: true,
      imgUrls: [
        'https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg',
      ],
      notes: 'im a note on bird',
    },
  ]).then(listing => {
    console.log(listing);
    process.exit();
  });
});
