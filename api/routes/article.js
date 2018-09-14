const articleController = require('./../controllers/articleController')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    router
        .route('/articles')
        .get(articleController.index)

    router
        .route('/article')
        .post(multipartWare, articleController.create)

    router
        .route('/article/:id')
        .get(articleController.getOne)

    router
        .route('/article/like')
        .post(articleController.like)
}