/**
 * Defining the constant 'express' such that the Backend makes use of ExpressJS
 */
const express = require('express');

/**
 * Importing constant cors from cors Package
 * This is to ensure that CORS problems are not encountered during operation
 */
const cors = require('cors');

/**
 * Importing the routes that we have defined in the Routes directory
 */
const authRoutes = require('./routes/auth.js');

/**
 * Defining the backend app that makes use of ExpressJS
 */
const app = express();

/**
 * Defining the port that the backend will run on
 */
const PORT = process.env.PORT || 5000;

/**
 * Importing config files that we do not want to commit onto Github
 */
require('dotenv').config()

/**
 * Defining what the backend app uses for functionality
 */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


/**
 * Simple homepage for the backend app
 */
app.get('/', (req, res) => {
  res.send('Welcome to the AvoChat Backend!')
})

/**
 * Making sure the backend app uses the routes that we have defined
 */
app.use('/auth', authRoutes)

/**
 * Indicates to developer that the backend is running, and also which port it is running on
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))