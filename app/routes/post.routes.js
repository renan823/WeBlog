let router = require("express").Router();
const post = require("../controllers/post.controller");

//Create post
router.post("/new", post.create);

//Get all posts from a user
router.post("/posts", post.getAll);

//Create a feed for the logged user
router.get("/feed", post.feed);

module.exports = router;
