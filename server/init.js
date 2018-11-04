// - this is run with app is initialized
require('dotenv').config()
import "../imports/startup/server" // by default it will impoport index.js

console.log("env:\n",process.env)
