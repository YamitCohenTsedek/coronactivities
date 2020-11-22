const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: () => Date.now()
    }
})

// Export the activity schema.
module.exports = mongoose.model('Activity', activitySchema)