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

module.exports = {
  getAllFamilies,
};
