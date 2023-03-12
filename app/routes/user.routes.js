let router = require("express").Router();
const user = require("../controllers/user.controller");
  
//Create new user
router.post("/create", user.create);

//User login
router.post("/login", user.login);

//User logout
router.get("/logout", user.logout);

//Get all users (except the logged one)
router.get("/users", user.getAll)

//Get followers
router.post("/followers", user.getFollowers)

//Get following
router.post("/following", user.getFollowing)

//Follow
router.post("/follow", user.follow);

//Unfollow
router.post("/unfollow",user.unfollow);

module.exports = router;
