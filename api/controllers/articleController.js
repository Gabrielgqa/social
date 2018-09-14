const Article = require('./../models/Article')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')
module.exports = {
    index: (req, res, next) => {
        Article.find(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article)=> {
            if (err)
                res.send(err)
            else if (!article)
                res.send(404)
            else
                res.send(article)
            next()            
        })
    },
}