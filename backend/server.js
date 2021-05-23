const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");
const app = express();
const db = require("./app/models");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



db.mongoose.connect( db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

const items_router = require("./app/routes/items.routes")
app.use('/api/items',items_router)
//----
const bills_router = require("./app/routes/bills.routes")
app.use('/api/bills', bills_router)
//---
const brands_router = require("./app/routes/brands.routes")
app.use('/api/brands', brands_router)
//---
const cates_router = require("./app/routes/cates.routes")
app.use('/api/cates', cates_router)
//---
const auth_router = require("./app/routes/auth.routes")
app.use('/api/auth', auth_router)
//require('./app/routes/auth.routes')(app);
//---
//require('./app/routes/users.routes')(app);
const user_router = require("./app/routes/users.routes")
app.use('/api/test', user_router)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;
//initial() function helps us to create 3 important rows in roles collection.
function initial() {
  Role.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}