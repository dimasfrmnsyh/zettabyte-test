const {
    Comment
} = require('../models')

exports.create = async (req, res) => {
    try {
        const isiComment = req.body
        let comment = new Comment(isiComment)
        console.log(comment);
        await comment.save()
        return res.status(200).json({ message: 'success', comment })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}


exports.getAll = async (req, res) => {
    try {
        let data = await Comment.find()
        return res.status(200).json({ message: 'success', data })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Comment.findOne({ _id: id })
        return res.status(200).json({ message: 'success', data })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Comment.findOne({ _id: id })
        let form = {
            ...data._doc,
            ...req.body
        }
        dataUpdated = await Object.assign(data, form).save()
        return res.status(200).json({ message: 'success', dataUpdated })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Comment.findOne({ _id: id })
        data.remove();
        return res.status(200).json({ message: 'success deleting data' })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}