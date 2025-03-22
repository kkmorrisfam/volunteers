const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const familySchema = new Schema({
  familyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  comment: { type: String },
  needDates: {
    type: [String],
    default: [],
  },
  familySize: { type: Number },
});

//third parameter is collection name in database, because it's not the same
const FamilyInNeed = model("FamilyInNeed", familySchema, "familyToFeed");
module.exports = FamilyInNeed;
