const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Home = new Schema({
  planName: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
  sqfeet: {
    type: String,
    required: true,
  },
  url: {
      type: String,
      required: true,
  },
  fp1_url: {
      type: String,
      required: true,
  },
  fp2_url: {
      type: String,
      required: true,
      default: "NA"
  },
  completed: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("Homes", Home);