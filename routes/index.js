const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("<h1>Volunteers R Us</h1>");
});

router.use("/volunteers", require("./volunteers"));
router.use("/meals", require("./family-needs"));

router.get("/login", passport.authenticate("github"), (req, res) => {});
// router.get("/login", (req, res, next) => {
//   console.log("🚀 Hit /login route");
//   next();}, passport.authenticate("github"));

// router.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//     // req.session.destroy(() => {
//     //   res.redirect("/");
//     // });
//   });
// });

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy(function (err) {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});
module.exports = router;
