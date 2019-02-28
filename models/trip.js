const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  location: String,
  description: String,
  picture: String,
  creator: Object,
  members: Array,
  difficulty: String,
  airbnbLink: String,
  beds: Number
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;