const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

console.log("inside volunteer model");

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
        ref: "FamilyInNeed",
      },
      volunteerDate: { type: String },
      meal: { type: String },
    },
  ],
});

//default is to pluralize volunteers, 3rd param, "volunteer" specifies my name in mongodb
const Volunteer = model("Volunteer", volunteerSchema, "volunteer");
module.exports = Volunteer;
