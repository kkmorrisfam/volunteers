const express = require("express");
const router = express.Router();

const familyController = require("../controllers/family-needs");

router.get("/meals", familyController.getAllFamilies);

module.exports = router;