const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const User = require('../models/users');
const homeuser = require('../models/homeusers');
const multer = require('multer');
const fs = require('fs');

// image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+" _"+Date.now()+"_"+file.originalname);
    },
});

// image upload home

var upload = multer({
    storage:storage,
}).single("image");

// Insert an user into the database
router.post('/add',upload,(req, res) => {
    const user = new homeuser({
        name: req.body.name,
        price: req.body.price,
        // qty: req.body.qty,
        image: req.file.filename,
    });
    // user.save();res.redirect('/');
    user.save()
  .then(() => {
    req.session.message = {
      type: 'success',
      message: 'Item added successfully!',
    };
    res.redirect('/add');
  })
  .catch(error => {
    console.log(user);
    console.log(upload);
    res.json({ message: error.message, type: 'danger' });
  });
});

// Index 
router.get('/',(req, res) => {
    homeuser.find().exec()
    .then(homeuser => {
        res.render('index', { title: 'Home Page', homeuser: homeuser });
    })
    .catch(error => {
        res.json({ message: error.message });
    });

});

router.get('/addtocart/:id',upload,(req, res) => {
    let id = req.params.id;
    homeuser.findById(id)
    .then(homeuser => {
        if (!homeuser) {
            res.redirect('/');
        } else {
                const user = new User({
                    name: homeuser.name,
                    price: homeuser.price,
                    qty: 1,
                    image: homeuser.image,
                });
                // user.save();res.redirect('/');
                user.save()
              .then(() => {
                req.session.message = {
                  type: 'success',
                  message: 'Item added successfully!',
                };
                res.redirect('/');
              })
              .catch(error => {
                res.json({ message: error.message, type: 'danger' });
              });
        }
    })
    .catch(err => {
        console.error(err); // Handle error appropriately
        res.redirect('/');
    });
    
});

router.get('/add',(req, res) => {
    res.render('add_items',{title:"Add Items"});
});

// Cart Page
router.get('/cartpage',(req, res) => {
    User.find().exec()
    .then(users => {
        res.render('cart_page', { title: 'Cart Page', users: users });
    })
    .catch(error => {
        res.json({ message: error.message });
    });

});

router.get('/delete',(req, res) => {
    homeuser.find().exec()
    .then(homeuser => {
        res.render('delete_item', { title: 'Delete Page', homeuser: homeuser });
    })
    .catch(error => {
        res.json({ message: error.message });
    });

}); 

// Edit an user route
router.get('/edit/:id',(req, res) => {
    let id = req.params.id;
    User.findById(id)
    .then(user => {
        if (!user) {
            res.redirect('/cartpage');
        } else {
            res.render('edit_items', {
                title: 'Edit Item',
                user: user,
            });
        }
    })
    .catch(err => {
        console.error(err); // Handle error appropriately
        res.redirect('/cartpage');
    });
});

// Update an user route
router.post('/update/:id',upload,(req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, {
        qty: req.body.qty,
    })
    .then(result => {
        if (!result) {
            res.json({ message: 'Item not found', type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Item Updated Successfully',
            };
            console.log(result);
            res.redirect('/cartpage');
        }
    })
    .catch(err => {
        console.error(err); // Handle error appropriately
        res.json({ message: err.message, type: 'danger' });
    });    
});

// Delete user route
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndDelete(id)
    .then(result => {
        if (!result) {
            res.json({ message: 'Item not found' });
            return;
        }
        req.session.message = {
            type: 'success',
            message: 'Item deleted successfully',
        };
        res.redirect('/cartpage');
    })
    .catch(err => {
        console.error(err); // Handle error appropriately
        res.json({ message: err.message });
    });
});

// Delete admin route
router.get('/admin/delete/:id', (req, res) => {
    let id = req.params.id;
    homeuser.findByIdAndDelete(id)
    .then(result => {
        if (!result) {
            console.log(result.image);
            res.json({ message: 'Item not found' });
            return;
        }

        if (result.image != '') {
            try {
                fs.unlinkSync('./uploads/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'success',
            message: 'Item deleted successfully',
        };
        res.redirect('/delete');
    })
    .catch(err => {
        console.error(err); // Handle error appropriately
        res.json({ message: err.message });
    });
});

module.exports = router;