// express is our web framework for Node.js.
const express = require('express')
// Import the activity model.
const Activity = require('./../models/activity')
// A router that can be used to create views.
const router = express.Router()

categories = ['cooking', 'sport', 'crafts', 'music', 'reading', 'home organization', 'games']
categories.sort()
categories.push('other')

const targetAudience = [' kids', ' teenagers', ' adults']

const designedFor = ['one participant', 'many participants']

router.get('/new', (req, res) => {    
    res.render('activities/new', { activity: new Activity(), categories: categories, targetAudience: targetAudience, designedFor: designedFor })
})

// Whenever we pass a route that has activity/{id}, the following code will be executed.
router.get('/:slug', async (req, res) => {
    const activity = await Activity.findOne({slug: req.params.slug})
    // If the given id doesn't exist, redirect the user back to the home page. 
    if (activity == null) {
        res.redirect('/')
    }
    res.render('activities/display', { activity: activity })
})

// Whenever we submit the New Activity form, the following code will be executed.
router.post('/', async (req, res) => {
    activity = new Activity({
        title: req.body.title,
        category: req.body.category,
        designedFor: req.body.designedFor,
        targetAudience: req.body.targetAudience,
        cost: req.body.cost,
        description: req.body.description,
        markdown: req.body.markdown,
        password: req.body.password
    })
    try {
        // Save the new activity.
        activity = await activity.save()
        // Redirect to the page of the saved activity.
        res.redirect(`/activities/${activity.slug}`)
    // If an error oocurred, render out the page we were on. 
    } catch (err) {
        console.log(err);
        res.render('activities/new', { activity: activity, categories: categories, targetAudience: targetAudience, designedFor: designedFor })
    }
})

method = "DELETE"
router.delete('/:id', async (req, res) => {
    await Activity.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router