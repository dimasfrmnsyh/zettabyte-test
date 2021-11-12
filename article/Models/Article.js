const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = Schema({
    listComment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    name: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Article', ModelSchema)
