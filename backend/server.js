const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const PersonModel = require("./PersonModel");

require("dotenv").config();

const socketServer = require("./socketServer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  const persons = await PersonModel.find().sort({ createdAt: -1 });
  res.json({ message: "fetch all persons", persons: persons });
});

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(DB_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`SERVER RUN AT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
