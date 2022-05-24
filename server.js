
require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const methodOverride = require('method-override')
const Product = require('./models/products');
const db = mongoose.connection;

// Database Configuration
const DATABASE_URL =
	'mongodb+srv://admin:abc1234@cluster0.aftg6.mongodb.net/mongoStore?retryWrites=true&w=majority';
// Database Connection
mongoose.connect(DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,

});

// Database Connection Error/Success - optional but can be really helpful
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
// app.use(morgan('dev'))

//<--------------ROUTES------------> 

// Create
app.post('/products', (req, res) => {
	res.send('received');
});

//Read



//Update



//Delete



// App Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
