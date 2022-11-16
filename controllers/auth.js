/**
 * Importing constant connect from getStream Package
 * This is for connecting to the getStream API and allow messaging functionality
 */
const {connect} = require('getstream')

/**
 * Importing constant bcrypt from bcrypt Package
 * This is for hashing passwords to provide privacy for users while also maintaining a level of security
 */
const bcrypt = require('bcrypt')

/**
 * Constant StreamChat is required to be defined as given by the documentation of getStream
 */
const StreamChat = require('stream-chat').StreamChat

/**
 * Importing constant crypto from crypto package
 * This is used with bcrypt to hash and therefore encrypt passwords
 */
const crypto = require('crypto')

/**
 * This allows the usage of "hidden" keys that will not be visible in Github when committed
 */
require('dotenv').config()

/**
 * These are keys, app id's and secrets required for the StreamChat client to connect and work properly
 * Contained in a .env file such that it will not be pushed to Github, and therefore maintains a semblance
 * of security and privacy
 */
const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const app_id = process.env.STREAM_APP_ID

/**
 * This is an asynchronous function in the form of a constant that encapsulates the logic
 * for signing up as a new user in AvoChat
 */
const signup = async (req, res) => {
  try {
    const {fullName, username, password, phoneNumber} = req.body
    
    const userId = crypto.randomBytes(16).toString('hex')

    const serverClient = connect(api_key, api_secret, app_id)

    const hashedPassword = await bcrypt.hash(password, 10)

    const token = serverClient.createUserToken(userId)

    res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber})

  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}

/**
 * This is an asynchronous function in the form of a constant that encapsulates the logic
 * for logging in as an existing user in AvoChat
 */
const login = async (req, res) => {
  try {
    const {username, password} = req.body

    const serverClient = connect(api_key, api_secret, app_id)
    const client = StreamChat.getInstance(api_key, api_secret)

    const {users} = await client.queryUsers({name: username})

    if(!users.length) return res.status(400).json({message: 'User not found'})

    const success = await bcrypt.compare(password, users[0].hashedPassword)

    const token = serverClient.createUserToken(users[0].id)

    if (success) {
        res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
    } else {
        res.status(500).json({message: 'Incorrect password'})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error})
  }
}

/**
 * Exporting the constants signup and login so that the other auth.js file in the 
 * Routes directory can call them when needed
 */
module.exports = {signup, login}