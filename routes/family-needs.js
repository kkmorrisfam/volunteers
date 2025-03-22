const express = require("express");
const router = express.Router();

const familyController = require("../controllers/family-needs");

router.get("/", familyController.getAllFamilies);
router.get("/:id", familyController.getOneFamily);

module.exports = router;