const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const URL = require('./models/urls')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  URL.deleteMany({}, (error, result) => {
    if(error) {
      console.log(error)
    }
  })
})
     