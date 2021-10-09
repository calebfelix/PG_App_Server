const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  Apartment_Name: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Owner_Name: {
    type: String,
    required: true,
  },
  Owner_Contact: {
    type: String,
    required: true,
  },
  Owner_Email: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Deposit: {
    type: String,
    required: true,
  },
  Notice_Period: {
    type: String,
    required: true,
  },
  Accommodation: {
    type: String,
    required: true,
  },
  Maintenance: {
    type: String,
    required: true,
  },
  Electricity_Charges: {
    type: String,
    required: true,
  },
  Food_Availabilty: {
    type: String,
    required: true,
  },
  Parking: {
    type: String,
    required: true,
  },
  Power_Backup: {
    type: String,
    required: true,
  },
  AC_Rooms: {
    type: String,
    required: true,
  },
  No_of_Beds: {
    type: String,
    required: true,
  },
  img_url: {
    type: Array,
    default: [
      "https://firebasestorage.googleapis.com/v0/b/pg-website-7495d.appspot.com/o/default.png?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/pg-website-7495d.appspot.com/o/default.png?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/pg-website-7495d.appspot.com/o/default.png?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/pg-website-7495d.appspot.com/o/default.png?alt=media",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
