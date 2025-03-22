const FamilyInNeed = require("../models/family-needs");

const getAllFamilies = async (req, res) => {
  try {
    const family = await FamilyInNeed.find();
    res.status(200).json(family);
  } catch (error) {
    console.error("Error fetching all families in need:", error);
    res
      .status(400)
      .json({ message: "Server error while fetching all families in need." });
  }
};
const getOneFamily = async (req, res) => {
  try {
    console.log("inside getOneFamily");
    const result = await FamilyInNeed.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "Family not found." });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single family: ", error);
    res.status(400).json({ message: "Server error getting single family." });
  }
};

module.exports = {
  getAllFamilies,
  getOneFamily,
};
