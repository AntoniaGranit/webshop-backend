import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import plantProducts from './data/plants.json';
import { Plant } from './schemas/plant';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/webshop-backend";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
mongoose.set('debug', true);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});


// Get all plants
app.get("/plants", async (req, res) => {
  try {
    const allPlants = await Plant.find({});
    const response = {
      success: true,
      message: "Here are your plants!",
      body: allPlants, // Send the retrieved plants directly in the response
    };
    res.status(200).json(response);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      success: false,
      body: {
        message: e,
      },
    });
  }
});


    

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
