var express=require('express');
var router=express.Router();
var Cart=require('../models/cart');
var Product=require('../models/product');
router.get('/add-to-cart/:id',function(req,res){
    var id=req.params.id;
    var cart=new Cart(req.session.cart?req.session.cart:{});
    Product.findById(id,function(err,product){
        if(err){
            return res.redirect('/');

        }
        cart.add(product,product._id);
        req.session.cart=cart;
        res.redirect('/');
    });
});``
router.get('/clear',function(req,res){
req.session.cart=null;
        res.redirect('/');

});
router.get('/delete/:productid',function(req,res){
    var productid=req.params.productid;
    var cart=new Cart(req.session.cart);
    cart.delete(productid);
        req.session.cart=cart;
    
    res.redirect('/');
})
router.get('/checkout',function(req,res){
    res.render('product/checkout');
})
router.post('/checkout',function(req,res){
    var sourceToken=req.body.stripeToken;
    console.log(req.body);
    var totalPrice=req.body.price;
var stripe = require("stripe")(
  "sk_test_Vpudp2J0VbNb4WaGY5quvG0M"
);

stripe.charges.create({
  amount: totalPrice,
  currency: "usd",
  source: sourceToken, // obtained with Stripe.js
  description: "Charge for mia.johnson@example.com"
} , function(err, charge) {
    if(err ){
        req.flash('paystatus',err.message); 
        console.log(err);
    console.log(req.body);
    res.redirect('/');
        
        
}else{
    req.flash('paystatus','成功付款');
    req.session.cart=null;
    res.redirect('/');
}

});
});
module.exports=router;