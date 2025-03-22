const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>Volunteers R Us</h1>");
});

router.use("/volunteers", require("./volunteers"));
router.use("/meals", require("./family-needs"));

module.exports = router;

