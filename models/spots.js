const mongoose = require("mongoose"), 
    Schema = mongoose.Schema,
    bcrypt = require(bcrypt),
    SALT_WORK_FACTOR = 10;


const spotSchema = new Schema({
  coords: { type: Array, required: true }, // Stored as longitude and latitude.
  spotName: { type: String, required: true },
  currentLine: String,
  motivationalLine: String,
  keepInMind: String,
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;

// use sessions to check if user is logged in order to display the correct information/ page.
// 