const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const URL = require('./models/urls')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    URL.find()
       .lean()
       .then(() => res.render('index'))
       .catch(error => console.log(error))
})

app.post('/shorten', (req, res) => {
    const longURL = req.body.url
    // 生成隨機的短代碼
    const shortCode = Math.random().toString(36).substr(2, 6)
    // 構建縮短網址
    const shortURL = "http://localhost:3000/" + shortCode
    return URL.create({ shortURL, longURL })
        .then(() => res.redirect('/show'))
        .catch(error => console.log(error))
})

app.get('/show', (req, res) => {
    URL.find({ longURL: '321' })
       .lean()
       .then(url => res.render('show', { url: url[0] }))
       .catch(error =>  console.log(error))
})

app.listen(3000, () => {
    console.log(`App is running on http://localhost:3000`)
})