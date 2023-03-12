const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    url: `mongodb+srv://renantrofino:${process.env.DB_KEY}@cluster0.3qaiaxz.mongodb.net/?retryWrites=true&w=majority`
}