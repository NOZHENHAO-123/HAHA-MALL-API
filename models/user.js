const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');


var Schema = mongoose.Schema;
const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        index: { unique: true }
    },   // 用户名
    password: String,   // 密码
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
    
}, { collection: 'user'})


userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();    //产生密码hash当密码有更改的时候(或者是新密码)
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
         //  结合salt产生新的hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // 使用hash覆盖明文密码
            user.password = hash;
            next();
        });
    });
})
// 校验密码
userSchema.methods.verifyPassword = function(pass,savePass, cb) {
    bcrypt.compare(pass, savePass.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
//导出model模块
const User = module.exports = mongoose.model('user', userSchema);


