const Volunteer = require("../models/volunteers");

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
    const result = await Volunteer.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "Volunteer not found." });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single volunteer: ", error);
    res.status(400).json({ message: "Server error getting single volunteer." });
  }
};

// Post/ Create route
const createVolunteer = async (req, res) => {
  try {
    // this should be caught in validation chain
    if (!req.body.userName || !req.body.password) {
      res
        .status(400)
        .json({ message: "Username or password cannot be empty." });
      return;
    }

    const volunteer = new Volunteer(req.body);
    await volunteer.save();
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(400).json({ message: "Server error adding volunteer." });
  }
};

// Put / Edit route

// Delete Route

module.exports = {
  getAllVolunteers,
  getOneVolunteer,
  createVolunteer,
};
