const mongoose = require('mongoose')

const issueSchema = mongoose.Schema({
    classifyName: String,   // 分类名称
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    issue: [                // 问题描述
        {
            title: String,
            content: String
        }
    ],
    issueNum:  {
        type: Number,
        default: 0
    }
    
}, { collection: 'mallsIssue'})

//导出model模块
const Issue = module.exports = mongoose.model('issue', issueSchema);


