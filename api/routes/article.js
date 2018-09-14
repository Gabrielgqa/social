const articleController = require('./../controllers/articleController')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    router
        .route('/articles')
        .get(articleController.index)
}