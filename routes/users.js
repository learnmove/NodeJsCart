var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var csrfProtection=csrf();
var passport=require('passport');
var Loggin=require('../config/routeProtection')
router.use(csrfProtection);
/* GET users listing. */
router.get('/signin', Loggin.notLoggin, function(req, res, next) {
  var message=req.flash('error');
  res.render('user/signin',{csrfToken:req.csrfToken,message:message,hasError:message.length>0});
});
router.post('/signin', Loggin.notLoggin,passport.authenticate('local.signin',{
  successRedirect:'/users/profile',
  failureRedirect:'/users/signin',
  failureFlash:true
}))

router.get('/signup', Loggin.notLoggin,function(req, res, next) {
  var message=req.flash('error');
  res.render('user/signup',{title:'',csrfToken:req.csrfToken,message:message,hasError:message.length>0});
});
router.get('/profile',Loggin.isLoggin, function(req, res, next) {
  res.render('user/profile',{title:''});
});
router.post('/signup', Loggin.notLoggin,passport.authenticate('local.signup',{
  successRedirect:'/users/profile',
  failureRedirect:'/users/signup',
  failureFlash:true

}))
router.get('/logout',function(req,res,next){
  req.logout();
  res.redirect('/');
})
module.exports = router;
