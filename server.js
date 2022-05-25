require("dotenv").config();

// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const methodOverride = require("method-override");
const Product = require("./models/products");
const productSeed = require("./models/productSeed");
const db = mongoose.connection;

// Database Configuration
const DATABASE_URL =
  "mongodb+srv://admin:abc1234@cluster0.aftg6.mongodb.net/mongoStore?retryWrites=true&w=majority";
// Database Connection
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Connection Error/Success - optional but can be really helpful
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev'))

//<--------------ROUTES------------>

// Create //
app.get("/products", (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render("index.ejs", { products: allProducts });
  });
});

// Product Seed Route //
app.get("/products/seed", (req, res) => {
  Product.deleteMany({}, (error, allProducts) => {});

  Product.create(
    productSeed,

    (error, data) => {
      res.redirect("/products");
    }
  );
});
// Read //

// New //
app.get("/products/new", (req, res) => {
  res.render("new.ejs",);
});

// Show //
app.get("/products/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      products: foundProduct,
    });
  });
});

// Update //

// Edit //

app.get("/products/:id/edit", (req, res) => {
  console.log(req.params);
  const products1 = products.find((item) => {
    return item.id === req.params.id;
  });
  res.render("edit.ejs", {
    index: products1.id,
    Product:products1,
  });
});
// Delete //
app.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, deletedProducts) => {
        // res.send({ success: true });
        res.redirect('/products')
      });
    });

// App Listener //
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
