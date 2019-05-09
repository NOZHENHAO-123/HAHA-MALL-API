
const User = require("../models/user");
let _user= new User();
const FillData = require('../lib/utils')

// 登录
exports.SignIn = (req,res,err,user) => {
    if (err) {
        res.json(err.message);
    } else {
      if(user.length){
        //   编码比对
        _user.verifyPassword(req.body.password,user[0],function (err, isMatch) {
          if (err) {
            res.json(FillData.fillErrData(0,err.message))
          }
          if ((req.body.password, isMatch) == true) {     // 用户名和密码正确
            res.json(FillData.fillSucessData());
          } else {
            res.json(FillData.fillErrData(0,'用户名或者密码错误'))
          }
        })
      }else {
        res.json(FillData.fillErrData(0,'没有该账户'))
      }
        
    }
}
// 添加账户
exports.AddUser = (res,err) => {
    if (err) {
        if(err.code ==11000){
            res.json(FillData.fillErrData(200,'账号已存在'));
        }else {
            res.json(FillData.fillErrData(0,err.message));
        }
    } else {
        res.json(FillData.fillSucessData());
    }
}