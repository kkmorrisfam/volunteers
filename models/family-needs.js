const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const familySchema = new Schema({
  familyName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  street: { type: String },
  city: { type: String },
  comment: { type: String },
  needDates: [String],
  familySize: { type: Number },
});

const FamilyInNeed = model("FamilyInNeed", familySchema);
module.exports = FamilyInNeed;
