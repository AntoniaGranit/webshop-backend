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

// Define the port
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Middlewares for cors and json body parsing
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});


// Get all plants
app.get("/plants", async (req, res) => {
  try {
    const allPlants = await Plant.find({});
    const response = {
      success: true,
      message: "All products",
      body: allPlants
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

// Get all small plants
app.get("/plants/small", async (req, res) => {
  try {
    const smallPlants = await Plant.find({ size: "small" });
    const response = {
      success: true,
      message: `All small plants. Amount: ${smallPlants.length}`,
      body: smallPlants
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

// Get all medium plants
app.get("/plants/medium", async (req, res) => {
  try {
    const mediumPlants = await Plant.find({ size: "medium" });
    const response = {
      success: true,
      message: `All medium-sized plants. Amount: ${mediumPlants.length}`,
      body: mediumPlants
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

// Get all big plants
app.get("/plants/big", async (req, res) => {
  try {
    const bigPlants = await Plant.find({ size: "big" });
    const response = {
      success: true,
      message: `All big plants. Amount: ${bigPlants.length}`,
      body: bigPlants
    };
    res.status(200).json(response);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      success: false,
      body: {
        message: e
      },
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
