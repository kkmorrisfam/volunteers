const express = require("express");
const app = express();
const connectDB = require("./db/connect")
require("dotenv").config();

const port = process.env.PORT || 3000;
const host = process.env.HOST;


app.use("/", (req, res)=>{
    res.send("<h1>Volunteers R Us</h1>");
});



const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on ${host} port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()