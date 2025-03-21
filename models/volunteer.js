const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const volunteerSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: { type: String },
  userName: { type: String },
  password: { type: String },
  service: [
    {
      familyInNeedId: {
        type: SchemaTypes.ObjectId,
        ref: "familyInNeed",
      },
      volunteerDate: { type: String },
      meal: { type: String },
    },
  ],
});

const Volunteer = model("Volunteer", volunteerSchema);
model.exports = Volunteer;
