const mongoose = require('../db/connection');

const ListingSchema = new mongoose.Schema(
  {
    address: String,
    availability: Boolean,
    imgUrls: [String],
    notes: String,
  },
  { timestamps: true }
);

module.exports = ListingSchema;
