const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Load User model
const Admin = require('../../models/Admin');

// Load Input Validation
const validateRegisterInput = require('../../validation/admin-register');
const validateLoginInput = require('../../validation/admin-login');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Admins Works' }));

// @route   POST api/admin/register
// @desc    Register admin
// @access  Public
  
  router.post('/register', (req, res) => {
          const { errors, isValid } = validateRegisterInput(req.body);
  
          // Check Validation
          if (!isValid) {
         return res.status(400).json(errors);
           }
      
          Admin.findOne({username: req.body.username}).then(admin => {
            if (admin) {
                
              errors.username = 'Username already Taken';
              return res.status(400).json(errors);
            } else {
             let admin_id=parseInt((Math.random() * 10000), 10);
             
               Admin.findOne({admin_id:admin_id}).then(adminid => {
                console.log(adminid);
                if (adminid) {
        
                  errors.admin_id = 'admin_id already Taken';
                  return res.status(400).json(errors);
                }else
                console.log(adminid);

              const newUser = new Admin({
                admin_id:admin_id,
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                Created_at:moment().format('L'+' '+'LTS')
              });
            //   console.log(admin_id);
    
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              }); 
            });
            }
          });
        });

// @route   PUT api/admin/update/:admin_id
// @desc    update admin by id 
// @access  public

router.put('/update/:admin_id', function (req, res) {
 
    Admin.findOne({ admin_id: req.params.admin_id })
    .then(user => {
      if (!user) {
        res.status(404).json('Admin not found');
      }else
      if(!req.body){
        users = req.params.username,
        req.params.first_name,
        req.params.last_name,

      Admin.findOneAndUpdate({admin_id: req.params.admin_id}
        ,{users}, {new: true},
         function (err, user) {
          res.status(200).send(user);
      });
    }else
    Admin.findOneAndUpdate({admin_id: req.params.admin_id}
      ,req.body, {new: true},
       function (err, user) {
        res.status(200).send(user);
    });
    })
});

// @route   POST api/admin/login
// @desc    Login admin / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const username = req.body.username;
    const password = req.body.password;
  
    // Find user by username
    Admin.findOne({ username }).then(user => {
      // Check for user
      if (!user) {
        errors.username = 'Admin not found';
        return res.status(404).json(errors);
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
  
         // create a token
        var token = jwt.sign({ id: user._id , username: user.username}, keys.secretOrKey, {
        expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
  
        }else {
          return res.status(400).json({password:'wrong password'});
        }
      });
  });
  });

// @route   GET api/admin/current
// @desc    Return current admin
// @access  Private
router.get(
    '/current',
    (req, res) => {
      
      var token = req.headers['x-access-token'];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      
      jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200).send(decoded);
      });
    }
  );

// @route   GET api/admin/all
// @desc    Get all admin
// @access  Public
router.get('/all', (req, res) => {
    // const errors = {};
     Admin.find().sort({ name: 1 })// sort by alphabetical, descending
       .then(admin => {
         if (!admin) {
           return res.status(404).json({ admin: 'There are no admin' });
         }
   
         res.json(admin);
       })
       .catch(err => res.status(404).json({ admin: 'There are no admin' }));
   });

// @route   GET api/admin/:admin_id
// @desc    Get admin by admin ID
// @access  Public
router.get('/:admin_id', (req, res) => {
     const errors = {};
    Admin.find({ admin_id: req.params.admin_id })
    .then(admin => {
        if (admin==0) {
        errors.admin_id = 'Admin Not Found';
        res.status(404).json(errors);
        }

        res.json(admin);
    })
    .catch(err =>
        res.status(404).json({ admin: 'no admin found' })
    );
});

// @route   GET api/admin/search
// @desc    Get  admin by username search
// @access  Public
router.get('/search/:username',function(req, res) {
    const errors = {};
   Admin.find({ username: new RegExp(req.params.username)})
   .then(admin => {
     if (admin==0) {
       errors.username= 'No Admin Found';
       res.status(404).json(errors);
     }
   
     res.json(admin);
   })
   .catch(err =>
     res.status(404).json({ admin: 'no admin found' })
   );
   })

// @route   PUT api/admin/update/password/:admin_id
// @desc    update admin password 
// @access  public
router.put('/update/password/:admin_id', function (req, res) {
    const errors = {};
    
    Admin.findOne({ admin_id: req.params.admin_id })
    .then(admin => {
    if (!admin) {
        res.status(404).json('admin not found');
    }
    else
    Admin.findOneAndUpdate({admin_id: req.params.admin_id}
        ,req.body, {new: true},
        function (err, admin) {
          console.log(admin.password);
          if(admin.password.length<6){
            errors.password='Password must be at least 6 characters'
            res.status(404).json(errors);
          }else{
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) throw err;
            admin.password = hash;
            
            admin
                .save()
                .then(admin => res.json(admin))
                .catch(err => console.log(err));
                res.status(200).send(admin);
            });
        });
      }
      });

});
  });

// @route   DELETE api/admin/delete/:admin_id
// @desc    delete admin
// @access  public
router.delete('/delete/:admin_id', function (req, res) { 
    Admin.findOne({ admin_id: req.params.admin_id })
    .then(admin => {
      if (!admin) {
        res.status(404).json('admin not found');
      }else 
    Admin.findOneAndRemove({admin_id: req.params.admin_id},
    function (err) {
    if (err) return res.status(500).send("There was a problem deleting the admin.");
    res.status(200).send("admin was deleted.");
  });
  })
  });

module.exports = router;