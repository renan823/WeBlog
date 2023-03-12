module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
            name: {type: String, required: true},
            password: {type: String, required: true, select: false},
            followers: [[String]],
            following: [[String]]
        },
        { timestamps: true }
      )
    );
    return User;
};