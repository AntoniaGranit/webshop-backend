import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
const userProfile = require('./routes/user/userprofile');

// Item routes
const plants = require('./routes/plants/allplants')
const singlePlant = require('./routes/plants/plantbyid')

// Cart routes
const getCart = require('./routes/cart/getcart');
const addItem = require('./routes/cart/additem');
const removeItem = require('./routes/cart/removeitem');

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
