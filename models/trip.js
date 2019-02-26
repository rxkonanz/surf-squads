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
  host: { type: Schema.Types.ObjectId, ref:'User'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;