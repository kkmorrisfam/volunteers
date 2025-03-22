const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json());

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
