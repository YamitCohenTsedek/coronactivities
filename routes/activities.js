const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    const categories = ['Cooking', 'Sport', 'Crafts', 'Music', 'Reading', 'Home Organization', 'Games', 'Other']
    categories.sort()
    res.render('activities/new', { categories: categories })
})

router.post('/', (req, res) => {

})

module.exports = router