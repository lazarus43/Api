const db = require("../models");
const Cate = db.cates;

// Create and Save a new Cate
exports.create = (req, res) => {
	// Validate request
	if (!req.body.Name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	  }
	
	// Create a Cate
	const cate = new Cate({
	Name: req.body.Name,
	Description: req.body.Description,
	});

	// Save Cate in the database
	cate
	.save(cate)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the Cate."
		});
	});
};

// Retrieve all Cates from the database.
exports.findAll = (req, res) => {
	const Name = req.query.Name;
	var condition = Name ? { Name: { $regex: new RegExp(Name), $options: "i" } } : {};

	Cate.find(condition)
		.then(data => {
		res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving cates."
		});
	});
};

// Find a single Cate with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Cate.findById(id)
		.then(data => {
		if (!data)
			res.status(404).send({ message: "Not found Cate with id " + id });
		else res.send(data);
		})
		.catch(err => {
		res
			.status(500)
			.send({ message: "Error retrieving Cate with id=" + id });
		});
};

// Update a Cate by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
		  message: "Data to update can not be empty!"
		});
	  }
	
	  const id = req.params.id;
	
	  Cate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot update Cate with id=${id}. Maybe Cate was not found!`
			});
		  } else res.send({ message: "Cate was updated successfully." });
		})
		.catch(err => {
		  res.status(500).send({
			message: "Error updating Cate with id=" + id
		  });
		});
};

// Delete a Cate with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

  Cate.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cate with id=${id}. Maybe Cate was not found!`
        });
      } else {
        res.send({
          message: "Cate was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cate with id=" + id
      });
    });
};

// Delete all Cates from the database.
exports.deleteAll = (req, res) => {
	Cate.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cates were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cates."
      });
    });
};

// Find all published Cates
