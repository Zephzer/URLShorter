const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const URL = require('./models/urls')
let longurl = ''

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
    longurl = ''
    longurl += req.body.url
    if (!req.body.url) {
        res.redirect('/nourl')
    }
    // 判斷是否已有相同的長網址被存入資料庫
    else{
        URL.find({ longURL: longurl }, (error, urls) => {
            if (urls.length === 0) {
                // 生成隨機的短代碼
                const shortCode = Math.random().toString(36).substr(2, 5)
                // 構建縮短網址
                const shorturl = "http://localhost:3000/" + shortCode
                return URL.create({ shortURL:shorturl, longURL:longurl })
                    .then(() => res.redirect('/show'))
                    .catch(error => console.log(error))
            }
            else {
                res.redirect('/show')
            }
        })
    }
})

app.get('/nourl',(req, res) => {
    res.render('nourl')
})

app.get('/show', (req, res) => {
    URL.find({ longURL: longurl })
        .lean()
        .then(url => res.render('show', { url: url[0] }))
        .catch(error => console.log(error))
})

app.get('/:short', (req, res) => {
    const Shorturl = 'http://localhost:3000' + req.url
    console.log(Shorturl)
    URL.find({ shortURL: Shorturl }, (error, urls) => {
        if(urls){
            console.log(urls)
            res.redirect(`${urls[0].longURL}`)
        }
    })
})

app.listen(3000, () => {
    console.log(`App is running on http://localhost:3000`)
})