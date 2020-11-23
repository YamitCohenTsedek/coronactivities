const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: () => Date.now()
    },
    category: {
        type: String,
        required: true
    },
    targetAudience: {
        type: Object,
        required: true
    },
    designedFor: {
        type: String,
        required: true
    },
    cost : {
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
    password: {
        type: String,
        required: true
    }
})

// Export the activity schema.
module.exports = mongoose.model('Activity', activitySchema)