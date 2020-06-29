const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Load User model
const User = require('../../models/User');

// Load Input Validation
const validateRegisterInput = require('../../validation/user-register');
const validateLoginInput = require('../../validation/user-login');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/user/register
// @desc    Register user
// @access  Public

var storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, __dirname +'/../../uploads');
    },
    filename: (request, file, callback) => {
   
      callback(null, "User-img" + uuid.v1()+ path.extname(file.originalname))
    }
  });
  
  var upload = multer({ storage: storage })
  let file = upload.single('Avatar')
  
  router.post('/register',file, (req, res) => {
          const { errors, isValid } = validateRegisterInput(req.body);
  
          // Check Validation
          if (!isValid) {
         return res.status(400).json(errors);
           }
          let avatar = req.file.Avatar ? '/uploads/' +req.file.Avatar.filename : null
      
          User.findOne({email: req.body.email}).then(user => {
            if (user) {
                
              errors.email = 'email already Taken';
              return res.status(400).json(errors);
            } else {
             let user_id=parseInt((Math.random() * 10000), 10);
             
               User.findOne({user_id:user_id}).then(userid => {
                console.log(userid);
                if (userid) {
        
                //  errors.email = 'email already Taken';
                  return res.status(400).json('user_id already Taken');
                }else
                     console.log(userid);

              const newUser = new User({
                user_id:user_id,
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                avatar:req.file.path,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                credit_card_number: req.body.credit_card_number,
                Created_at:moment().format('L'+' '+'LTS')
              });
            //   console.log(user_id);
    
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

// @route   PUT api/user/update/:user_id
// @desc    update user by id 
// @access  public

router.put('/update/:user_id', upload.single('Avatar'), function (req, res) {
 
  User.findOne({ user_id: req.params.user_id })
     .then(user => {
       if (!user) {
         res.status(404).json('User not found');
       }else
       if(req.file){
         users = req.params.email,
         req.params.first_name,
         req.params.last_name,
         req.params.mobile_number,
         req.params.address;
         req.params.credit_card_number;
         avatar = req.file.path;
 
       User.findOneAndUpdate({user_id: req.params.user_id}
         ,{users,avatar}, {new: true},
          function (err, user) {
           res.status(200).send(user);
       });
     }else
     User.findOneAndUpdate({user_id: req.params.user_id}
       ,req.body, {new: true},
        function (err, user) {
         res.status(200).send(user);
     });
     })
 });

// @route   POST api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for resident
    if (!user) {
      errors.username = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

       // create a token
      var token = jwt.sign({ id: user._id , email: user.email , avatar: user.avatar, user_id: user.user_id}, keys.secretOrKey, {
      expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });

      }else {
        return res.status(400).json({password:'wrong password'});
      }
    });
});
});

// @route   GET api/user/current
// @desc    Return current user
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

// @route   GET api/user/all
// @desc    Get all user
// @access  Public
router.get('/all', (req, res) => {
  // const errors = {};
   User.find().sort({ name: 1 })// sort by alphabetical, descending
     .then(user => {
       if (user==0) {
         return res.status(404).json({ user: 'There are no user' });
       }
 
       res.json(user);
       
     })
     .catch(err => res.status(404).json({ user: 'There are no user' }));
 });

// @route   GET api/user/count
// @desc    Get count users
// @access  Public
 router.get('/count', (req, res) => {
  // const errors = {};
  User.countDocuments({}, function(err, usercount) {
    if (err) { return handleError(err) }
    res.json(usercount);
})     
})

// @route   GET api/user/:user_id
// @desc    Get user by user ID
// @access  Public
router.get('/:user_id', (req, res) => {
  const errors = {};
  User.find({ user_id: req.params.user_id })
    .then(user => {
      if (user==0) {
        errors.user_id = 'User not found';
        res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch(err =>
      res.status(404).json({ user: 'no user found' })
    );

});

// @route   GET api/user/search
// @desc    Get  user by email search
// @access  Public
router.get('/search/:email',function(req, res) {
 const errors = {};
User.find({ email: new RegExp(req.params.email)})
.then(user => {
  if (user==0) {
    errors.email= 'No User Found';
    res.status(404).json(errors);
  }

  res.json(user);
})
.catch(err =>
  res.status(404).json({ user: 'no user found' })
);
})

// @route   PUT api/user/update/password/:user_id
// @desc    update user password 
// @access  public
router.put('/update/password/:user_id', function (req, res) {
  const errors = {};
  User.findOne({ user_id: req.params.user_id })
    .then(user => {
      if (!user) {
        res.status(404).json('user not found');
      }else
      User.findOneAndUpdate({user_id: req.params.user_id}
        ,req.body, {new: true},
        function (err, user) {
          console.log(user.password);
          if(user.password.length<6){
            errors.password='Password must be at least 6 characters'
            res.status(404).json(errors);
          }else{
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            
            user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
                res.status(200).send(user);
            });
        });
      }
      });
    })
});

// @route   DELETE api/user/delete/:user_id
// @desc    delete user
// @access  public
router.delete('/delete/:user_id', function (req, res) { 
  User.findOne({ user_id: req.params.user_id })
  .then(user => {
    if (!user) {
      res.status(404).json('user not found');
    }else 
  User.findOneAndRemove({user_id: req.params.user_id},
  function (err) {
  if (err) return res.status(500).send("There was a problem deleting the user.");
  res.status(200).send("User was deleted.");
});
})
});

module.exports = router;