// express is our web framework for Node.js.
const express = require('express')
// Import the activity model.
const Activity = require('./../models/activity')
// A router that can be used to create views.
const router = express.Router()


const targetAudience = [' kids', ' teenagers', ' adults']

const designedFor = ['one participant', 'many participants']

router.get('/newActivity', (req, res) => {    
    res.render('activities/newActivity', { activity: new Activity(), categories: categories, targetAudience: targetAudience, designedFor: designedFor })
})

// Whenever we pass a route that has activity/{slug}, the following code will be executed.
router.get('/:slug', async (req, res) => {
    const activity = await Activity.findOne({slug: req.params.slug})
    // If the given slug doesn't exist, redirect the user back to the home page. 
    if (activity == null) {
        res.redirect('/')
    }
    res.render('activities/displayActivity', { activity: activity })
})

// Whenever we submit the New Activity form, the following code will be executed.
router.post('/', async (req, res, next) => {
       req.activity =  new Activity()
       next()
}, async (req, res) => {
    let activity = req.activity
    activity.title = req.body.title
    activity.category = req.body.category,
    activity.designedFor = req.body.designedFor,
    activity.targetAudience = req.body.targetAudience,
    activity.cost = req.body.cost,
    activity.description = req.body.description
    activity.markdown = req.body.markdown
    activity.code = req.body.code
    try {
      // Save the new activity.
      activity = await activity.save()
      // Redirect to the page of the saved activity.
      res.redirect(`/activities/${activity.slug}`)
    // If an error oocurred, render out the page we were on. 
    } catch (err) {
      res.render('activities/newActivity', { activity: activity, categories: categories, targetAudience: targetAudience, designedFor: designedFor })
    }
  })

// Delete the activity and back to the home page.
router.delete('/:id', async (req, res) => {
    await Activity.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router