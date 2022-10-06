/////////////////////////////////////////////
// Our schema and model for the car resource
/////////////////////////////////////////////
const mongoose = require("mongoose")

// pull Schema and model from mongoose
// use syntax called "destructuring"

const {Schema, model} = mongoose

// Car  schema
// rules for Schema
const carSchema = new Schema({
    name: String,
    color: String,
    readyToDrive: Boolean
})

// make car model
// model takes 2 args
// first is what we call our model
// the second is what we will use to build the model

const Car = model("Car", carSchema)

/////////////////////////////////////////////
// Export our model
/////////////////////////////////////////////
module.exports = Car