const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ListingSchema = require('./listing');
const SkillSchema = require('./skill');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    formType: { type: Number, default: 0 },
    bio: { type: String, default: "I'm down for something new" },
    listings: [ListingSchema],
    skills: [SkillSchema],
    image: { type: String, default: 'https://via.placeholder.com/150' },
  },
  { timestamps: true }
);

module.exports = UserSchema;
