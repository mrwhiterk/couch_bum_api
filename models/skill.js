const mongoose = require('../db/connection');

const SkillSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

module.exports = SkillSchema;
