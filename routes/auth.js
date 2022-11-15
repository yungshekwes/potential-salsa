/**
 * Defining the constant 'express' such that the Backend makes use of ExpressJS
 */
const express = require('express')

/**
 * Bringing over constants 'signup' and 'login' from Controller directory
 */
const {signup, login} = require('../controllers/auth.js')

/**
 * Defining a constant 'router' that makes use of the ExpressJS router
 */
const router = express.Router()

/**
 * ExpressJS Method that performs a HTTP POST given a URL and a function by means of a constant
 */
router.post('/signup', signup)

/**
 * ExpressJS Method that performs a HTTP POST given a URL and a function by means of a constant
 */
router.post('/login', login)

/**
 * This maps the router and all the abovementioned logic
 */
module.exports = router