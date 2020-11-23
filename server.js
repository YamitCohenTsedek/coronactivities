// express is our web framework for Node.js.
const express = require('express')
// A MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
// Access to the router which was created in the specified file.
const activityRouter = require('./routes/activities')
const app = express()

// Connect to the database.
mongoose.connect('mongodb+srv://coronactivities:coronactivities@coronactivities.einpk.mongodb.net/coronactivities?retryWrites=true&w=majority', { useUnifiedTopology:true, useNewUrlParser: true})

// We will write our views using ejs and our view engine will convert that ejs code to HTML.
// ejs lets you generate HTML markup with plain JavaScript.
app.set('view engine', 'ejs')

// Enable access to all the parameters of the activity form from the activity route by req.body.
app.use(express.urlencoded({ extended: false}))
app.use(express.static("./resources"));

// The index/main route.
app.get('/', (req, res) => {
    const activities = [{
        title: 'Storytelling I Spy',
        creationDate: new Date(),
        targetAudience: ' kids, teenagers, adults',
        category: 'games',
        designedFor: 'many participants',
        cost: 'free',
        description: 'If you enjoy a bit of honest misdirection and like to keep your friends guessing, this is for you. Perfect for people with a flair for drama, this game is another great way to learn a bit more about each player, whether you discover that they’re a master of deception or that they happen to own a secret snow globe collection.',
        markdown: 'To play, each person takes a turn picking an object in their house and telling the story of how they got it, without actually saying what it is. The rest of the group then has to guess, as quickly as they can, what that object is. Depending on how challenging you want the game to be, you can keep it light by only recounting the origin stories of items most people probably have in their home, or you can lift the restriction and let players pick from any of their possessions.',
        password: '123456'
    }]
    // Access to specified path from the views folder, with the given options.
    res.render('activities/index', {activities: activities})
})

// Use the activity router, and specify the path on which it is going to be based.
app.use('/activities', activityRouter)

// Listen for connections.
app.listen(5400)