module.exports = mongoose => {
    const Post = mongoose.model(
      "post",
      mongoose.Schema(
        {
            title: {type: String, required: true},
            text: {type: String, required: true},
            user: {type: String, required: true}
        },
        { timestamps: true }
      )
    );
    return Post;
};