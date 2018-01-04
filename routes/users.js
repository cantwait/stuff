var express = require('express');
var router = express.Router();
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find((err,obj)=>{
      if(err){
        return res.status(500).json(err);
      }    
      return res.status(200).json(obj);
  });
});

router.post('/', (req,res,next)=>{
  console.log('adding user');
  var user = new User({name: req.body.name});
  user.save((err,obj)=>{
    if(err){
      return res.status(500).json(err);
    }
    return res.status(200).json(obj);
  });
});

module.exports = router;
