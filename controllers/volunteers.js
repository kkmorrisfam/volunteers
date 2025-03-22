const Volunteer = require("../models/volunteers");
const ObjectId = require("mongodb").ObjectId;

//const contactId = new ObjectId(req.params.id);

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers: ", error);
    res
      .status(400)
      .json({ message: "Server error while fetching volunteers." });
  }
};

const getOneVolunteer = async (req, res) => {
  try {
    const result = await Volunteer.findOne({ _id: req.param.id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single volunteer: ", error);
    res.status(400).json({ message: "Server error getting single volunteer." });
  }
};

module.exports = {
  getAllVolunteers,
  getOneVolunteer
};
