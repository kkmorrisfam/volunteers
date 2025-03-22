const Volunteer = require("../models/volunteers");

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res
      .status(400)
      .json({ message: "Server error while fetching volunteers." });
  }
};

module.exports = {
  getAllVolunteers,
};
