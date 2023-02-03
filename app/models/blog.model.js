module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      category: String,
      //image: [{ type: Blob }],
      content: [{ type: String }],
      signature: [{ type: String }],
      reviewed: Boolean,
      approved: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const blob = mongoose.model("blog", schema);
  return blob;
};
