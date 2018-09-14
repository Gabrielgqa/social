const Article = require('./../models/Article')
const fs = require('fs')
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

    create: (req, res, next) => {
        let { text, title, likes, description } = req.body
        saveArticle({ text, title, likes, description: '' })
        
        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)
                else {
                    return article.addAuthor(req.body.author_id).then((_article) => {
                        return res.send(_article)
                    })
                }
                next()
            })
        }
    },

    getOne: (req, res, next) => {
        Article.findById(req.params.id)
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

    like: (req, res, next) => {
        Article.findById(req.body.article_id).then((article)=> {
            return article.like().then(()=>{
                return res.json({msg: "OK"})
            })
        }).catch(next)
    },

    comment: (req, res, next) => {
        Article.findById(req.body.article_id).then((article)=> {
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(() => {
                return res.json({msg: "OK"})
            })
        }).catch(next)
    }
}