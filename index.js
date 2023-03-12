const express = require("express");
const app = express();
const session = require('express-session');
const db = require("./app/models");

//.env config
const dotenv = require('dotenv');
dotenv.config();

//express config
app.set('trust proxy', 1) 
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "afyg4t2u8t9u5bg4lwrgnt",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes config
app.use(require("./app/routes/user.routes"));
app.use(require("./app/routes/post.routes"));

//db config
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected!");
}).catch(err => {
    console.log("DB not connected!");
    console.log(err);
    process.exit();
})

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("running on port ", port);
})

