module.exports = mongoose => {
	var schema = mongoose.Schema(
	  {
		NameItem: String,
		Description: String,
		Price: Number,
		Caterogy: String,
		Brand: String,
	  },
	  { timestamps: true }
	);
  
	schema.method("toJSON", function() {
	  const { __v, _id, ...object } = this.toObject();
	  object.id = _id;
	  return object;
	});
  
	const Item = mongoose.model("item", schema);
	return Item;
};