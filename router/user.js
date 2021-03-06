const express = require("express");

const router = express.Router();

const User = require("../models/user");

const Res = require("../controllers/user");

let _user= new User();



// 添加账户
router.post('/user/add',(req,res) => {
    let data = req.body;
    User.create(data, (err, issue) => {
      Res.AddUser(res,err);
    });
})

// 登录
router.post('/login/account',(req,res) => {
  console.log(req.body)
    let data = req.body;
    User.find({user:data.user}, (err, user) => {
      Res.SignIn(req,res,err,user)
    });
})

// 查询所有用户
router.get('/user/list',(req,res) => {

  User.find({}, '_id user', (err, user) => {
    Res.getUserList(res,err,user)
  });
})

module.exports = router;