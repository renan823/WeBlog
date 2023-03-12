const crypto = require("bcryptjs");
const hash = {};

hash.encrypt = (password) => {
    const salt = crypto.genSaltSync();
    return crypto.hashSync(password, salt);
}

hash.compare = (password1, password2) => {
    return crypto.compareSync(password1, password2);
}

module.exports  = hash;