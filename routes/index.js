var express = require('express');
var router = express.Router();
var Product=require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
Product.find({},function(err,products){
  var proChunk=[];
  var chunksize=3;
  for(var index=0;index<products.length;index+=chunksize){
  proChunk.push(products.slice(index,index+chunksize));
  }
  res.render('index', { title: 'Express' ,products:proChunk[0],paystatus:req.flash('paystatus')});

});
});

module.exports = router;
