exports.isLoggin=function (req,res,next){
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/users/signin');
    }
}
exports.notLoggin=function (req,res,next){
    if(!req.isAuthenticated()){
      next();
    }else{
      res.redirect('/users/profile');
    }
}