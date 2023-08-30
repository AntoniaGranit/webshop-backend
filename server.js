import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
dotenv.config();

// Middlewares for cors and json body parsing
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// User routes
const register = require('./routes/user/register');
const login = require('./routes/user/login');

// Plant routes
const plants = require('./routes/plants/allplants')
const singlePlant = require('./routes/plants/plantbyid')

// Use user routes
app.use('/', register);
app.use('/', login);

// Use items routes
app.use('/', plants);
app.use('/', singlePlant);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
