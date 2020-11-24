// express is our web framework for Node.js.
const express = require('express')
// A MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
// Import the Activity model.
const Activity = require('./models/activity')
// Access to the router which was created in the specified file.
const activityRouter = require('./routes/activities')
const app = express()

// Connect to the database.
mongoose.connect('mongodb+srv://coronactivities:coronactivities@coronactivities.einpk.mongodb.net/coronactivities?retryWrites=true&w=majority', { useUnifiedTopology:true, useNewUrlParser: true, useCreateIndexes: true})

// We will write our views using ejs and our view engine will convert that ejs code to HTML.
// ejs lets you generate HTML markup with plain JavaScript.
app.set('view engine', 'ejs')

// Enable access to all the parameters of the activity form from the activity route by req.body.
app.use(express.urlencoded({ extended: false}))
app.use(express.static("./resources"));

// The index/main route.
app.get('/', async (req, res) => {
    const activities = await Activity.find().sort({ creationDate: 'desc' })
    
    // Access to specified path from the views folder, with the given options.
    res.render('activities/index', {activities: activities})
})

app.get('/sortedByCategory', async (req, res) => {
    const activities = await Activity.find().sort({ category: 'asc' })
    // Access to specified path from the views folder, with the given options.
    res.render('activities/sortedByCategory', {activities: activities})
})

// Use the activity router, and specify the path on which it is going to be based.
app.use('/activities', activityRouter)

// Listen for connections.
app.listen(5400)