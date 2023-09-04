// Main imports and dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// User route imports
import register from './routes/user/register';
import login from './routes/user/login';
import userProfile from './routes/user/userprofile';
// Item route imports
import plants from './routes/plants/allplants';
import singlePlant from './routes/plants/plantbyid';
// Cart route imports
import getCart from './routes/cart/getcart';
import addItem from './routes/cart/additem';
import removeItem from './routes/cart/removeitem';

// Load environment variables from .env file
dotenv.config();

// Database connection
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

// Index route: list all endpoints
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Use user routes
app.use('/', register);
app.use('/', login);
app.use('/', userProfile);

// Use items routes
app.use('/', plants);
app.use('/', singlePlant);

// Use cart routes
app.use('/', getCart);
app.use('/', addItem);
app.use('/', removeItem);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
