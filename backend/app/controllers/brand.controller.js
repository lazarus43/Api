const db = require("../models");
const Brand = db.brands;

// Create and Save a new Brand
exports.create = (req, res) => {
	// Validate request
	if (!req.body.NameBrand) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	  }
	
	// Create a Brand
	const brand = new Brand({
	NameBrand: req.body.NameBrand,
	Description: req.body.Description,
	});

	// Save Brand in the database
	brand
	.save(brand)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the Brand."
		});
	});
};

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
	const NameBrand = req.query.NameBrand;
	var condition = NameBrand? { NameBrand: { $regex: new RegExp(NameBrand), $options: "i" } } : {};

	Brand.find(condition)
		.then(data => {
		res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving brands."
		});
	});
};

// Find a single Brand with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Brand.findById(id)
		.then(data => {
		if (!data)
			res.status(404).send({ message: "Not found Brand with id " + id });
		else res.send(data);
		})
		.catch(err => {
		res
			.status(500)
			.send({ message: "Error retrieving Brand with id=" + id });
		});
};

// Update a Brand by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
		  message: "Data to update can not be empty!"
		});
	  }
	
	  const id = req.params.id;
	
	  Brand.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot update Brand with id=${id}. Maybe Brand was not found!`
			});
		  } else res.send({ message: "Brand was updated successfully." });
		})
		.catch(err => {
		  res.status(500).send({
			message: "Error updating Brand with id=" + id
		  });
		});
};

// Delete a Brand with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

  Brand.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
        });
      } else {
        res.send({
          message: "Brand was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Brand with id=" + id
      });
    });
};

// Delete all Brands from the database.
exports.deleteAll = (req, res) => {
	Brand.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Brands were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all brands."
      });
    });
};

// Find all published Brands
