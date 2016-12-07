var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  if (req.body.username && req.body.password) {
    var user = new User({username:req.body.username});
    user.set('hashed_password', hashPW(req.body.password));
    user.save(function(err) {
      console.log(err);
      if (err){
        if (err.message.indexOf("duplicate key") !== -1) {
          res.send({success: false, message: "username unavailable"});
        }
      } else {
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'Authenticated as ' + user.username;
        res.redirect('/');
      }
    });
  } else {
    res.send({error: "missing data"});
  }
};
exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      var message = 'Username or password is incorrect';
    } else if (user.hashed_password ===
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        req.session.user = user.id;
        req.session.username = user.username;
        res.send({success: true});
      });
    }else{
      var message = 'Username or password is incorrect';
    }
    if(message){
      req.session.regenerate(function(){
        res.send({success: false, message: message});
      });
    } else if (err) {
      req.session.regenerate(function(){
        res.send({error: true});
      });
    }
  });
};
exports.getUserProfile = function(req, res) {
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};
exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.set('color', req.body.color);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
        req.session.color = req.body.color;
      }
      res.redirect('/user');
    });
  });
};
exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};
exports.findUserByID = function(id, callback) {
    console.log(id);
    User.findOne({_id: id})
    .exec(function(err, user) {
        if (user) {
            console.log(user);
        }
    })
}
exports.userExists = function(req, res) {
  User.findOne({username: req.query.username})
  .exec(function(err, user) {
    var exists = false;
    if (user) exists = true;
    res.send({exists: exists});
  });
};
