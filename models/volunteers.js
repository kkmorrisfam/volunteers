const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

console.log("inside volunteer model");

const volunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: { type: String },
  userName: { type: String },
  password: { type: String },
  service: {
    type: [
      {
        familyInNeedId: {
          type: SchemaTypes.ObjectId,
          ref: "FamilyInNeed",
        },
        volunteerDate: { type: String },
        meal: { type: String },
      },
    ],
    default: [],
  },
});

volunteerSchema.pre("save", function (next) {
  console.log("About to save a volunteer:", this);
  next();
});

//default is to pluralize volunteers, 3rd param, "volunteer" specifies my name in mongodb
const Volunteer = model("Volunteer", volunteerSchema, "volunteer");
module.exports = Volunteer;
