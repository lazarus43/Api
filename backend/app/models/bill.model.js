module.exports = mongoose => {
	var schema = mongoose.Schema(
	  {
		Merchant: String,
        NameItem: String,
        Quantity: Number,
		Description: String,
        Price: Number,
        PaymentMethod:String,
	  },
	  { timestamps: true }
	);
	schema.method("toJSON", function() {
	  const { __v, _id, ...object } = this.toObject();
	  object.id = _id;
	  return object;
	});
  
	const Bill = mongoose.model("bill", schema);
	return Bill;
};