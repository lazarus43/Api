// module.exports = app => {
	const bills = require("../controllers/bill.controller.js");
  
	var router = require("express").Router();
  
	// Create a new Bill
	router.post("/", bills.create);
  
	// Retrieve all Bills
	router.get("/", bills.findAll);
  
  
	// Retrieve a single Bill with id
	router.get("/:id", bills.findOne);
  
	// Update a Bill with id
	router.put("/:id", bills.update);
  
	// Delete a Bill with id
	router.delete("/:id", bills.delete);
  
	// Create a new Bill
	router.delete("/", bills.deleteAll);
  
	module.exports = router
	// app.use('/api/bills', router);
// };