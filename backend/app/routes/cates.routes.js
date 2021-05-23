// module.exports = app => {
	const cates = require("../controllers/cate.controller.js");
  
	var router = require("express").Router();
  
	// Create a new Cate
	router.post("/", cates.create);
  
	// Retrieve all Cates
	router.get("/", cates.findAll);
  
  
	// Retrieve a single Cate with id
	router.get("/:id", cates.findOne);
  
	// Update a Cate with id
	router.put("/:id", cates.update);
  
	// Delete a Cate with id
	router.delete("/:id", cates.delete);
  
	// Create a new Cate
	router.delete("/", cates.deleteAll);
  
	module.exports = router
	// app.use('/api/cates', router);
// };