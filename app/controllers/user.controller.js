const db = require("../models");
const hash = require("../config/hash.config");
const User = db.user;

//Add new user (create new account) if not exists
exports.create = (req, res) => {

    if(req.session.user){
        res.status(200).send({ msg: "Logged"});
        return;
    }

    User.find({name: req.body.name}).then(data => {
        if(data.length == 0){

            //Create new user and insert into db
            const user = new User({
                name: req.body.name,
                password: hash.encrypt(req.body.password)
            })

            user.save(user).then(status => {
                res.status(201).send({msg: "User created!"});
            }).catch(err => {
                res.status(500).send({msg: err.message});
            })
        } else {

            //If user already exists return this message
            res.status(400).send({ msg: "User already exists! Did you try to log in?" });
            return;
        }
    })
}

//Login user 
exports.login = (req, res) => {

    if(req.session.user){
        res.status(200).send({ msg: "Already logged"});
        return;
    }

    User.find({name: req.body.name}).select('+password').then(data => {
        if(data.length == 0){

            //If user already exists return this message
            res.status(400).send({ msg: "This user not exists! Did you try to create a new account?" });
            return;
        } else {
            
            //Login user 
            let user = data[0];

            if(hash.compare(req.body.password, user.password)){

                //Create session
                req.session.user = req.body.name;

                //User was logged
                res.status(200).send({ msg: "Logged"});
            } else {

                //Password doesn't match
                res.status(400).send({ msg: "Wrong username or password! Please, try again!"});
            }
        }
    })
}

//Logout user
exports.logout = (req, res) => {

    req.session.destroy();
    res.send({msg: "Logout"})
}

//List all users (except the loged one)
exports.getAll = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    User.find({name: {$ne: req.session.user}}).then(data => {

        res.status(200).send(data);
    }).catch(err => {

        res.status(500).send({msg: err.message})
    })
}

//Follow user
exports.follow = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }


    if(req.session.user == req.body.name){

        //New following cannot be the logged user
        res.status(400).send({msg: "This user doesn't exists!"});
        return;
    }

    User.find({name: req.session.user}).then(user => {
        let following = user[0].following;

        if(req.body.name in following){

            //Already following
            res.status(400).send({msg : "You're already following this user!"});
        } else {

            //Add new following to session user 
            User.updateMany({name: req.session.user}, {$push:{"following":req.body.name}}).then(follow => {

                //Add new follower to the requested user
                User.updateMany({name: req.body.name}, {$push:{"followers":req.session.user}}).then(following => {

                    res.status(200).send({msg: "You have a new following!"});
                }).catch(err => {

                    res.status(500).send({msg: err.message});
                })
            }).catch(err => {

                res.status(500).send({msg: err.message});
            })
        }
    })
}

//Unfollow user
exports.unfollow = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    User.find({name: req.session.user}).then(user => {
        let following = user[0].following;

        if(!req.body.name in following){

            //Already following
            res.status(400).send({msg : "You don't follow this user!"});
        } else {

            //Remove following from session user
            User.updateMany({name: req.session.user}, {$pull:{"following":req.body.name}}).then(follow => {

                //Remove follower from the requested user
                User.updateMany({name: req.body.name}, {$pull:{"followers":req.session.user}}).then(following => {

                    res.status(200).send({msg: "You delete a following!"});
                }).catch(err => {

                    res.status(500).send({msg: err.message});
                })
            }).catch(err => {

                res.status(500).send({msg: err.message});
            })
        }
    })
}

//Get followers
exports.getFollowers = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    User.find({name: req.body.name}).then(data => {

        if(data.length != 0){
            res.status(200).send(data[0].followers);
        } else {
            res.status(400).send({msg: "This user doesn't exists!"});
            return;
        }
    }).catch(err => {

        res.status(500).send({msg: err.message});
    })
}

//Get following
exports.getFollowing = (req, res) => {

    if(!req.session.user){
        res.status(400).send({msg: "You're not logged"});
        return;
    }

    User.find({name: req.body.name}).then(data => {
        if(data.length != 0){
            res.status(200).send(data[0].following);
        } else {
            res.status(400).send({msg: "This user doesn't exists!"});
            return;
        }
    }).catch(err => {

        res.status(500).send({msg: err.message});
    })
}