module.exports = mongoose => {
	var schema = mongoose.Schema(
	  {
		Name: String,
		Description: String

	  },
	  { timestamps: true }
	);
  
	schema.method("toJSON", function() {
	  const { __v, _id, ...object } = this.toObject();
	  object.id = _id;
	  return object;
	});
  
	const Cate = mongoose.model("cate", schema);
	return Cate;
};