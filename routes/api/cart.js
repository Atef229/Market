const express = require('express');
const router = express.Router();

// Load User model
const Cart = require('../../models/Cart');
const User = require('../../models/User');

// @route   GET api/cart/test
// @desc    Tests cart route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Cart Works' }));

// @route   POST api/order/add
// @desc    order
// @access  Public
router.post('/add',  (req, res) => {
    const user = req.body.user;
    const user_id = req.body.user_id;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };
  
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              user_id: user_id,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              })
              .exec()
              .then(() => res.end());
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.end());
          }
        } else {
          Cart.create({
            user: user,
            user_id:user_id,
            items: [item]
          })
            .then(() => res.end());
            // User.findById(req.body.user)
            // .then((foundUser) => {
            //   foundUser.orders = foundUser.orders.concat([item]
            //     );
            //   foundUser.save(() => res.end());
            // });
        }
      });
  });
  
// @route   GET api/cart/all
// @desc    Get all cart
// @access  Public
  router.get('/all/:_id', (req, res) => {
    Cart.findOne({ user: req.params._id })
    .populate('items.product')
    .populate('user')
    .exec((err, cart) => {
      if (!cart) {
        return res.send(null);
      }
  
      res.send(cart);
    });
  });
  
// @route   PUT api/cart/update
// @desc    update cart by id 
// @access  public
  router.put('/update',  (req, res) => {
    Cart.findById(req.body.cartId)
      .then((foundCart) => {
        foundCart.items = foundCart.items.filter((item) => item._id != req.body.itemId);
        foundCart.save(() => res.end());
      });
  });

// @route   DELETE api/cart/delete/
// @desc    delete cart
// @access  public
  router.delete('/delete', (req, res) => {
    Cart.findByIdAndRemove(req.query.id)
      .then(() => res.end())
      .catch((err) => res.send(err));
  });

module.exports = router;