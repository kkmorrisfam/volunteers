const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "API Documentation for Contacts Project Week 2",
  },
  host: "",
  servers: [
    { url: "http://localhost:5150", description: "Local Server" },
    {
      url: "https://cse341-contacts-dqby.onrender.com",
      description: "Render Server",
    },
  ],
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
