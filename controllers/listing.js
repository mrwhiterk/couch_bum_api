const { Listing } = require('../models/index');

module.exports = {
  index: (req, res) => {
    Listing.find({}).then(listings => {
      res.json(listings);
    });
  },
  show: (req, res) => {
    Listing.findOne({ _id: req.params.id }).then(listing => {
      res.json(listing);
    });
  },
  create: (req, res) => {
    Listing.create(req.body).then(listing => res.json(listing));
  },
  update: (req, res) => {
    Listing.findOne({ _id: req.params.id }).then(listing => {
      const { address, availability, notes, imgUrls } = req.body;
      listing.address = address;
      listing.availability = availability;
      listing.notes = notes;
      listing.imgUrls = imgUrls;

      listing.save((err, listing) => {
        res.json(listing);
      });
    });
  },
  delete: (req, res) => {
    Listing.findByIdAndRemove({ _id: req.params.id }).then(listing => {
      res.json(listing);
    });
  },
};
