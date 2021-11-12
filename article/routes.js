const express = require('express')
const router = express.Router()

const articleController = require('./Controllers/articleControllers')
const commentController = require('./Controllers/commentController')

module.exports = function routes(app) {
    app.use('/api', router)
    router.get('/article', articleController.getAll)
    router.get('/article2', articleController.getAllUsingFind)
    router.post('/article', articleController.create)
    router.put('/article/:id', articleController.update)
    router.get('/article/:id', articleController.getOne)
    router.delete('/article/:id', articleController.delete)
    router.get('/comment', commentController.getAll)
    router.post('/comment', commentController.create)
    router.put('/comment/:id', commentController.update)
    router.delete('/comment/:id', commentController.delete)
    router.get('/comment/:id', commentController.getOne)

}