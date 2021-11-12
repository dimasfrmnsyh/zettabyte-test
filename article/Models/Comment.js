const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = Schema({
    isiComment: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Comment', ModelSchema)
