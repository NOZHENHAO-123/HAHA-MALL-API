const express = require('express')
const bodyParser = require('body-parser')

const issue = require('./router/issue')
const user = require('./router/user')

const morgan = require('morgan')
const app = express()
const fs = require('fs');
const path = require('path');

const router = express.Router();

// 添加日志 记录非200状态
morgan.format('combined', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')
let accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan("combined",{stream:accessLog,skip: function (req, res) { return res.statusCode ==200 }}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yun')


let filter = (req, res, next) => {
    res.set('Content-Type',' application/json;charset=UTF-8')
    next()
    // if(req.ip.indexOf('192.168.10.217')>-1){
    //     next()
    // } else {
    //     res.json({"code":-401,"message":"没有权限","extra":null,"data":"请先登陆系统"})
    //     // next('用户无权访问')
    // }
}

app.use(filter);
// app.use('/api',issue)
app.use(issue)
app.use(user)


app.listen(3000,() => {
    console.log('app listening on port 3000.')
})