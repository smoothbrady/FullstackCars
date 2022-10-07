///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Car = require('./car')

// Here, we're going to set up a seed script
// this will seed our database for us, so we have some starting resources
// This script will be run, with the command in the terminal `npm run seed`

// router.get("/seed", (req, res) => {
//     // array of starter cars

//     // Delete every car in the db
//     Car.deleteMany({})
//         .then(() => {
//             // seed with the starter cars array
//             Car.create(startCars)
//                 .then(data => {
//                     res.json(data)
//                 })
//         })
// })

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startCars = [
        {name: "Toyota, Supra", color: "Red", readyToDrive: false},
        {name: "Charger, Hellcat", color: "Black", readyToDrive: false},
        {name: "BMW, M5", color: "Blue", readyToDrive: false},
        {name: "Ram, duley", color: "grey", readyToDrive: false},
        {name: "Ford, F350", color: "White", readyToDrive: false},
    ]

    // delete all the existing fruits
    Car.deleteMany({})
        .then(deletedCars => {
            console.log('this is what .deleteMany returns', deletedCars)

            // create a bunch of new fruits from startFruits
            Car.create(startCars)
                .then(data => {
                    console.log('here are the newly created cars', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
            })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})