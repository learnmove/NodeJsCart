var passport=require('passport');
var User=require('../models/user');
var LocalStrategy=require('passport-local').Strategy;
passport.serializeUser(function(user,done){   //当用户身份验证完成后，passport会将用户的_id属性存到sessoon中。当需要用到user对象时，使用_id属性从数据库获取信息。
    done(null,user._id)

});
passport.deserializeUser(function(id,done){
User.findById(id,function(err,user){
    console.log(err);
    done(null,user);
});
});
passport.use('local.signup',new LocalStrategy({  //建立策略的名字
    usernameField:'email',  //指定要用的model欄位是User的email
    passwordField:'password', //指定要用的model欄位是User的password
    passReqToCallback:true //可以有Request參數

},function(req,email,password,done){   //從req.body傳來的
    req.checkBody('email','不合法的E-mail').notEmpty().isEmail();
    req.checkBody('password','不合法的密碼').notEmpty().isLength({min:4});
    var errors=req.validationErrors();
    if(errors){
        var message=[];
        errors.forEach(function(error){
            message.push(error.msg);
        })
        
        return done(null,false,req.flash('error',message));
    }
    User.findOne({
        'email':email,

    },function(err,user){
        if(err){
    console.log(err);
            return done(err);
        }
        if(user){
            return done(null,false,{message:'EMAIL already exist'});
        }
        var newUser=new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.save(function(err,result){
            if (err){
    console.log(err);
                
                return done(err);

            }
            return done(null,result);
        })
    });
}

));
passport.use('local.signin',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    console.log(password);
    req.checkBody('password','不合法的密碼').notEmpty().isLength({min:4});
    req.checkBody('email','不合法的email').notEmpty().isEmail();
    var errors=req.validationErrors();
    var message=[];
    if(errors){
        errors.forEach(function(error){
            message.push(error.msg);
        });
        return done(null,false,req.flash('error',message));
    }
    User.findOne({'email':email},function(err,user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message:'沒有這個email'});

        }
        if(!user.ValidPassword(password)){
            return done(null,false,{message:'密碼錯誤'});

        }
        return done(null,user);

    })

}

))