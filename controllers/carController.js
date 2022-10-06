////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Car = require("../models/car")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// Here, we're going to set up a seed route
// this will seed our database for us, so we have some starting resources
// there are two ways we're going to talk about seeding a db
// routes -> they work, but they're not best practices
// seed scripts -> they work, and they are best practices
router.get("/seed", (req, res) => {
    // array of starter fruits
    const startCars = [
        {name: "Toyota, Supra", color: "Red", readyToDrive: false},
        {name: "Charger, Hellcat", color: "Black", readyToDrive: false},
        {name: "BMW, M5", color: "Blue", readyToDrive: false},
        {name: "Ram, duley", color: "grey", readyToDrive: false},
        {name: "Ford, F350", color: "White", readyToDrive: false},
    ]

    // Delete every fruit in the db
    Car.deleteMany({})
        .then(() => {
            // seed with the starter fruits array
            Car.create(startCars)
                .then(data => {
                    res.json(data)
                })
        })
})

// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Car.find({})
        .then(cars => {
            // this is fine for initial testing
            // res.send(fruits)
            // this the preferred method for APIs
            res.json({ cars: cars })
        })
        .catch(err => console.log(err))
})

// POST request
// create route -> gives the ability to create new fruits
router.post("/", (req, res) => {
    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // we'll use the mongoose model method `create` to make a new fruit
    Car.create(req.body)
        .then(fruit => {
            // send the user a '201 created' response, along with the new fruit
            res.status(201).json({ Car: Car.toObject() })
        })
        .catch(error => console.log(error))
})

// PUT request
// update route -> updates a specific fruit
router.put("/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    
    // for now, we'll use a simple mongoose model method, eventually we'll update this(and all) routes and we'll use a different method
    // we're using findByIdAndUpdate, which needs three arguments
    // it needs an id, it needs the req.body, and whether the info is new
    Car.findByIdAndUpdate(id, req.body, { new: true })
        .then(car => {
            console.log('the fruit from update', car)
            // update success is called '204 - no content'
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
// destroy route -> finds and deletes a single resource(fruit)
router.delete("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    // find and delete the fruit
    Car.findByIdAndRemove(id)
        // send a 204 if successful
        .then(() => {
            res.sendStatus(204)
        })
        // send the error if not
        .catch(err => res.json(err))
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Car.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("comments.author", "username")
        .then(car => {
            res.json({ car: car })
        })
        .catch(err => console.log(err))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router