const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const domPurifyFunc = require('dompurify')
const { JSDOM } = require('jsdom')
domPurify = domPurifyFunc(new JSDOM().window)

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
    code: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    purifiedHTML: {
        type: String,
        required: true
    }
})

// Before making a validation on an activity create a slug from the title.
activitySchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if (this.markdown) {
        // Convert the markdown to HTML and then sanitize the HTML.
        this.purifiedHTML = domPurify.sanitize(marked(this.markdown))
    }
    next()
})

// Export the activity schema.
module.exports = mongoose.model('Activity', activitySchema)