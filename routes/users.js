var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var csrfProtection=csrf();
var passport=require('passport');
router.use(csrfProtection);
/* GET users listing. */
router.get('/signin', function(req, res, next) {
  var message=req.flash('error');
  res.render('user/signin',{csrfToken:req.csrfToken,message:message,hasError:message.length>0});
});
router.post('/signin',passport.authenticate('local.signin',{
  successRedirect:'/users/profile',
  failureRedirect:'/users/signin',
  failureFlash:true
}))

router.get('/signup', function(req, res, next) {
  var message=req.flash('error');
  res.render('user/signup',{title:'',csrfToken:req.csrfToken,message:message,hasError:message.length>0});
});
router.get('/profile', function(req, res, next) {
  res.render('user/profile',{title:''});
});
router.post('/signup',passport.authenticate('local.signup',{
  successRedirect:'/users/profile',
  failureRedirect:'/users/signup',
  failureFlash:true

}))
module.exports = router;
