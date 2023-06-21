const mongoose = require('mongoose')
const Url = require('../urls')

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
    Url.create({ shortURL: 'https://www.youtube.com/', longURL:'http://localhost:3000/pz2ve'})
    console.log('done')
})