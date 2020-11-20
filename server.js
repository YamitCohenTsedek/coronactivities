const express = require('express')
const activityRouter = require('./routes/activities')
const app = express()

app.set('view engine', 'ejs')
app.use('/activities', activityRouter)
app.use(express.static("./resources"));

app.get('/', (req, res) => {
    const activities = [{
        title: 'Test title',
        creationDate: new Date(),
        category: 'test category',
        description: 'test description'
    }]
    res.render('activities/index', {activities: activities})
})
app.listen(5400)