// imports
require ('dotenv').config();
const express = require('express');
const mongooose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
mongooose.connect(process.env.DB_URI);
const db = mongooose.connection;
db.on('error',(err) => console.log(err));
db.once('open',() =>console.log("connected to the database"));

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("uploads"));
app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false,
}));
// Session Message Handler
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})



// set Template Engine
app.set('view engine', 'ejs');

// route prefix
app.use("", require("./routes/routes"));



// ON HOST
app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
});