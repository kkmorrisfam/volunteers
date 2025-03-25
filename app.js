const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const passport = require("passport");
const session = require("session");
const GitHubStrategy = require("passport-github2").Strategy;

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5150;
const host = process.env.HOST;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  //this is the basic express session({..}) initialization
  .use(passport.initialize())
  //init passport on every route call
  .use(passport.session())
  //allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept, Z-key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes/index.js"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({githubId: profile.id}, function (err, user) {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});
app.get(
  "/github/callback",
  passport.authenticate("gethub", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.use("/", require("./routes"));
// app.use("/", (req, res)=>{
//   res.send("<h1>Volunteers R Us</h1>");
// });

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`App is listening on ${host} port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
