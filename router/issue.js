const express = require("express");

const router = express.Router();

const Issue = require("../models/issue");


// 填充数据
let fillSucessData = (data) => {
  return {
    code: 200,
    message: '操作成功',
    data: data || null
  }
}
// 填充数据
let fillErrData = (mess) => {
  return {
    code: 200,
    message: mess,
    data: null
  }
}

// 查询所有问题
router.get("/issue", (req, res) => {
  Issue.find({})
    .sort({ createTime: -1 })
    .then(issue => {
      res.json(fillSucessData(issue));
    })
    .catch(err => {
      res.json(fillErrData(err.message));
    });
});

// 查询所有问题
router.get("/issue/list", (req, res) => {
  Issue.find({},'_id classifyName createTime issueNum')
    .sort({ createTime: -1 })
    .then(issue => {
      res.json(fillSucessData(issue));
    })
    .catch(err => {
      res.json(fillErrData(err.message));
    });
});

// 问题id查询 (单条)
router.post("/issue/detail", (req, res) => {
  Issue.find({'issue._id': req.body.id})
    .then(issue => {
      let idData = null;
      issue[0].issue.every(r=>{
        if(r._id == req.body.id) {
          idData = r;
          return false;
        }
        return true;
      })
      res.json(fillSucessData(idData));
    })
    .catch(err => {
      res.json(fillErrData(err.message));
    });
});

// 分类ID查询问题
router.post("/issue/details", (req, res) => {
  Issue.find({_id: req.body.id})
    .then(issue => {
      res.json(fillSucessData(issue));
    })
    .catch(err => {
      res.json(fillErrData(err.message));
    });
});

// 添加一条问题
router.post("/issue/add", (req, res) => {
    let data = req.body;
    data.issue = JSON.parse(data.issue);
    data.issueNum = data.issue.length;
  Issue.create(data, (err, issue) => {
    if (err) {
      res.json(fillErrData(err.message));
    } else {
      res.json(fillSucessData());
    }
  });
});

// 更新
router.post("/issue/update", (req, res) => {
  let data = req.body;
  data.issue = JSON.parse(data.issue);
  data.issueNum = data.issue.length;
  Issue.findOneAndUpdate(
    { _id: data.id },
    {
      $set: {
        issue: data.issue,
        classifyName: data.classifyName,
        issueNum: data.issueNum,
        updateTime: Date.now()
      }
    }
  )
    .then(issue => {
      res.json(fillSucessData());
    }).catch(err => res.json(fillErrData(err.message)));
});

// 删除
router.post("/issue/delete", (req, res) => {
  Issue.findOneAndRemove({
    _id: req.body.id
  })
    .then(issue => {
      res.json(fillSucessData(issue));
    })
    .catch(err => res.json(fillErrData(err.message)));
});

// 搜索(标题、内容)
router.post("/issue/search", (req, res) => {
  Issue.find({
    $or: [
      {'issue.title': {'$regex': req.body.name, $options: '$i'}},
      {'issue.content': {'$regex': req.body.name, $options: '$i'}}
    ]
  })
    .then(issue => {
      let retultData = []
      issue.forEach(v=>{
        let result = v.issue.filter(r=>r.title.indexOf(req.body.name) > -1 || r.content.indexOf(req.body.name) > -1);
        retultData.push.apply(retultData,result)
      })
      res.json(fillSucessData(retultData));
    })
    .catch(err => {
      res.json(fillErrData(err.message));
    });
});
module.exports = router;

