const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description:
      "API Documentation for Week 3 & 4 Project: Meals for Families in Need",
  },
  host: "",
  servers: [
    { url: "http://localhost:5150", description: "Local Server" },
    {
      url: "https://volunteers-2wa4.onrender.com",
      description: "Render Server",
    },
  ],
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
