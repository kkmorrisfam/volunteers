const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const MongoStore = require("connect-mongo");

const isProd = process.env.NODE_ENV === "production";

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5150;
const host = process.env.HOST;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//.use(session) before use(passport)
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "some secret phrase or word",
      resave: false,
      saveUninitialized: true, //if false, then don't save a session unless something is stored
      //saves sessions in database
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
      }),
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
      clientID: isProd
        ? process.env.GITHUB_CLIENT_ID_PROD
        : process.env.GITHUB_CLIENT_ID_DEV,
      clientSecret: isProd
        ? process.env.GITHUB_CLIENT_SECRET_PROD
        : process.env.GITHUB_CLIENT_SECRET_DEV,
      callbackURL: process.env.CALLBACK_URL_DEV,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({githubId: profile.id}, function (err, user) {
      // console.log(profile);
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
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    console.log("GitHub login successful:"); // req.user);
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.use("/", require("./routes"));

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
