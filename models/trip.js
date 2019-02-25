const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  location: String,
  description: String,
  picture: String,
  creator: String,
  members: Array,
  difficulty: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;