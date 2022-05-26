//requie dependencies 
const express = require('express')
const Product = require('../models/products')
const productSeed = require('../models/productSeed')
//require router
const router = express.Router();


/////////////////////////////////INDEX//////////////////////////
router.get('/', (req, res) => {
    Product.find({},(error, allProducts) => {
        res.render('index.ejs',{product:allProducts});
    })
});

//////////////////////////////////NEW////////////////////////////
router.get("/new", (req, res) => {
    res.render("new.ejs");
  });
//////////////////////////////////DELETE/////////////////////////
router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, deletedProducts) => {
        // res.send({ success: true });
        res.redirect('/products')
      });
    });

//////////////////////////////////UPDATE/////////////////////////
router.put("/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updatedProduct) => {
      res.redirect(`/products/${req.params.id}`)
    }
  )
})



/////////////////////////////////CREATE////////////////////////////
router.post('/', (req, res) => {
    if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

	Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
	});
});
//////////////////////////////////EDIT//////////////////////////////

router.get("/:id/edit", (req, res) => {
    console.log(req.params);
    const products1 = Product.find((item) => {
      return item.id === req.params.id;
    });
    res.render("edit.ejs", {
      index: products1.id,
      product:products1,
    });
  });


/////////////////////////////////SHOW///////////////////////////////

router.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render("show.ejs", {
        product: foundProduct,
      });
    });
  });
  

/////////////////////////////////CREATE/////////////////////////
router.get("/", (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render("index.ejs", { products: allProducts });
  });
});

////////////////////////// Product Seed Route ///////////////////
router.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, allProducts) => {});

  Product.create(
    productSeed,

    (error, data) => {
      res.redirect("/products");
    }
  );
});

//export the router object using module.exports
module.exports = router;