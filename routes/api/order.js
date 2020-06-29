const express = require('express');
const router = express.Router();
const moment = require('moment');

// Load User model
const User = require('../../models/User');
const Order = require('../../models/Order');
const { default: Orders } = require('../../client/src/views/components/order/Orders');

// @route   POST api/order/add
// @desc    order
// @access  Public
// router.post('/add', (req, res) => {
//   User.findById(req.body.user)
//     .then((foundUser) => {
//       foundUser.orders = foundUser.orders.concat(req.body.order);
//       foundUser.save(() => res.end());
//     });
// });

// @route   POST api/order/add
// @desc    add order
// @access  Public
router.post('/add',(req, res) => {
  User.findById(req.body.owner)
    .then((owner) => {
      if (!owner) {
            
       // errors.name = 'error';
        return res.status(400).json('User Not Found');
    } else {
      let order_id=parseInt((Math.random() * 100000000), 10);
      const newOrder = new Order({
        //newOrder
       order_id:order_id,
        owner:req.body.owner,
        owner_id:req.body.owner_id,
        Created_at:moment().format('L'+' '+'LTS'),
        products:{
        product: req.body.product,
        quantity: req.body.quantity,
      }
        });
            newOrder
            .save()
            .then(owner => res.json(owner))
            .catch(err => console.log(err));
            // User.findById(req.body.owner)
            // .then((foundUser) => {
            //   foundUser.orders = foundUser.orders.concat([newOrder.products,newOrder.totalPrice]
            //     );
            //   foundUser.save(() => res.end());
            // });
      }
    });
});

// @route   GET api/order/
// @desc    get all orders
// @access  Public
router.get('/',  (req, res, next) => {
  Order.find()
  .populate('products.product')
  .populate('owner')
  .exec((err, orders) => {
    if (err) {
      res.json({
        success: false,
        message: "Couldn't find your order"
      });
    } else {
      res.json({
        orders:orders
      });
    }
  });
});

// @route   GET api/order/:owner_id
// @desc    get order by user_id
// @access  Public
router.get('/:owner_id', (req, res, next) => {
  const errors = {};
  Order.find({ owner_id: req.params.owner_id })
    .populate('products.product')
    .populate('owner')
    .exec((err, orders) => {
      if (orders==0) {
        errors.owner_id = 'Order Not Found';
        res.status(404).json(errors);
        
      } else {
        res.json({
          orders: orders
        });
      }
    });
});

// @route   GET api/order/orders/:order_id
// @desc    get order by user_id
// @access  Public
router.get('/orders/:order_id', (req, res, next) => {
  const errors = {};
  Order.find({ order_id: req.params.order_id })
    .populate('products.product')
    .populate('owner')
    .exec((err, orders) => {
      if (orders==0) {
        errors.order_id = 'Order Not Found';
        res.status(404).json(errors);
        
      } else {
        res.json({
          orders: orders
        });
      }
    });
});

// @route   GET api/order/count
// @desc    Get count orders
// @access  Public
router.get('/order/count', (req, res) => {
  // const errors = {};
  Order.countDocuments({}, function(err, ordercount) {
    if (err) { return handleError(err) }
    res.json(ordercount);

})     
})

// @route   DELETE api/order/delete/:order_id
// @desc    delete order
// @access  public
router.delete('/delete/:order_id', function (req, res) { 
  Order.findOne({ order_id: req.params.order_id })
  .then(order => {
    if (!order) {
      res.status(404).json('order not found');
    }else 
  Order.findOneAndRemove({order_id: req.params.order_id},
  function (err) {
  if (err) return res.status(500).send("There was a problem deleting the order.");
  res.status(200).send("order was deleted.");
});
})
});


module.exports = router;