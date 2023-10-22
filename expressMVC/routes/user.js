var express = require('express');
var router = express.Router();
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')

const user = [
  {
    email: '123@gmail.com',
    password: '123'
  }
]

const KEY = 'jan'
 
// 註冊
router.post('/signout', async(req, res, newValue)=>{
  const { email, password } = req.body

  // 確認使用者
  const hasUser = user.find((item)=>item.email === email)
  if(hasUser){
    return res.status(400).send({
      message: 'email 已註冊'
    })
  }

  // 加密密碼
  const hashpassword = await bcrypt.hash(password, 10)

  // 資料儲存
  user.push({
    email,
    password: hashpassword
  })

  console.log(user, 'user')

  // // 回應
  res.status(201).send({
    message: '註冊成功',
  })
})

// 登入
router.post('/login', async(req, res, newValue)=>{
  const { email, password } = req.body

  // 確認使用者
  const hasUser = user.find((item)=>item.email === email)
  console.log(hasUser, 'hasUser')
  if(!hasUser){
    res.status(401).send({
      message: 'email 尚未註冊'
    })
  }

  // 密碼驗證
  if(!(await bcrypt.compare(password, hasUser.password))){
    return  res.status(401).send({
      message: '密碼錯誤 請再試一次'
    })
  }
  // jwt 簽章
  const token = jwt.sign({
    email,
    password: user.password
  }, KEY)

  console.log(token, 'token');

  // 回應
  res.send({
    message: '登入成功',
    token
  })
})

// 驗證用戶(同時取得用戶資料)
router.get('/profile', (req, res, newValue)=>{
  const token = req.headers['authorization']

  // 驗證是否有送 token
  if(!token){
    res.status(401).send({
      message: '尚未登入'
    })
  }

  // 驗證使用者
  jwt.verify(token, KEY, (err, user)=>{
    if(err){
      res.status(401).send({
        message: '驗證 token 錯誤'
      })
    }
  })

  res.send({
    message: '驗證成功',
    user
  })
})

module.exports = router;