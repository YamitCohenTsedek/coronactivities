// express is our web framework for Node.js.
const express = require('express')
// Import the activity model.
const Activity = require('./../models/activity')
// A router that can be used to create views.
const router = express.Router()

const categories = ['Cooking', 'Sport', 'Crafts', 'Music', 'Reading', 'Home Organization', 'Games', 'Other']
categories.sort()

router.get('/new', (req, res) => {    
    res.render('activities/new', { activity: new Activity(), categories: categories })
})

// Whenever we pass a route that has activity/{id}, the following code will be executed.
router.get('/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id)
    // If the given id doesn't exist, go back to the home page. 
    if (activity == null) {
        res.redirect('/')
    }
})

// Whenever we submit the New Activity form, the following code will be executed.
router.post('/', async (req, res) => {
    let activity = new Activity({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        // Save the new activity.
        activity = await activity.Save()
        // Redirect to the page of the saved activity.
        res.redirect('/activities/${activity.id}')
    // If an error oocurred, render out the page we were on. 
    } catch (err) {
        res.render('activities/new', { activity: activity, categories: categories })
    }
})

module.exports = router