const db = require("../models");
const Post = db.post;
const User = db.user;

exports.create = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        user: req.session.user
    })

    post.save(post).then(data => {
        res.status(201).send({msg: "Post created"});
    }).catch(err => {
        res.status(500).send({msg: err})
    })
}

exports.getAll = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    Post.find({user: req.body.name}).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({msg: err})
    })
}

exports.feed = (req, res) => {
    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    User.find({name: req.session.user}).then(data => {
        let following = data[0].following[0];
        if(following.length != 0){
           
            Post.find({user: {$in: following}}).sort({createdAt: -1}).then(posts => {
                res.status(200).send(posts);
            }).catch(err => {
                res.status(500).send({msg: err})
            })
        } else {
            res.status(400).send({msg: "You follow anyone!"});
            return;
        }
    }).catch(err => {

        res.status(500).send({msg: err.message});
    })
}