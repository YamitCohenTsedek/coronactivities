// express is our web framework for Node.js.
const express = require('express')
// A MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
// Import the Activity model.
const Activity = require('./models/activity')
// Access to the router which was created in the specified file.
const activityRouter = require('./routes/activities')
// Method override enables using HTTP DELETE.
const methodOverride = require('method-override')
const app = express()

mongoose.set('useCreateIndex', true);
// Connect to the database.
mongoose.connect('mongodb+srv://coronactivities:coronactivities@coronactivities.einpk.mongodb.net/coronactivities?retryWrites=true&w=majority', { useUnifiedTopology:true, useNewUrlParser: true})

// We will write our views using ejs and our view engine will convert that ejs code to HTML.
// ejs lets you generate HTML markup with plain JavaScript.
app.set('view engine', 'ejs')

// Enable access to all the parameters of the activity form from the activity route by req.body.
app.use(express.urlencoded({ extended: false}))

// Serve the static files on the specified path.
app.use(express.static("./resources"));

app.use(methodOverride('_method'))

// The possible categories of activities.
categories = ['Cooking', 'Fitness', 'Crafts', 'Music', 'Reading', 'Home-Organization', 'Games', 'Drawing', 'Magic', 'Photography', 'Volunteering']
categories.sort()
categories.push('Other')
exports.categories = categories

// The index/main route.
app.get('/', async (req, res) => {
    const activities = await Activity.find().sort({ creationDate: 'desc' })
    // Access to specified path from the views folder, with the given options.
    res.render('activities/index', {activities: activities, categories: categories})
})

// The route of the activities filtered by category.
app.get('/:category', async (req, res) => {
    const activities = await Activity.find({category: req.params.category}).sort({ creationDate: 'desc' })
    res.render('activities/index', {activities: activities})
})

// Use the activity router, and specify the path on which it is going to be based.
app.use('/activities', activityRouter)

// Listen for connections on the specified port.
app.listen(5400)