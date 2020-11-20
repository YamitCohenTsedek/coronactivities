const express = require('express')
const activityRouter = require('./routes/activities')
const app = express()

app.set('view engine', 'ejs')
app.use('/activities', activityRouter)
app.use(express.static("./resources"));

app.get('/', (req, res) => {
    const activities = [{
        title: 'Storytelling I Spy',
        creationDate: new Date(),
        category: 'Games',
        description: 'If you enjoy a bit of honest misdirection and like to keep your friends guessing, this is for you. Perfect for people with a flair for drama, this game is another great way to learn a bit more about each player, whether you discover that they’re a master of deception or that they happen to own a secret snow globe collection.',
        markdown: 'To play, each person takes a turn picking an object in their house and telling the story of how they got it, without actually saying what it is. The rest of the group then has to guess, as quickly as they can, what that object is. Depending on how challenging you want the game to be, you can keep it light by only recounting the origin stories of items most people probably have in their home, or you can lift the restriction and let players pick from any of their possessions.While you aren’t allowed to outright lie, the more dramatic, vague or misleading the storytelling, the better the game. If you’re stumped on what to say, you can also get creative: For a secondhand sweater, a friend once described what she imagined its former owner was like and the places they might have taken it.'
    }]
    res.render('activities/index', {activities: activities})
})
app.listen(5400)