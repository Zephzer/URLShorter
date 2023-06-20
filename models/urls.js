const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLSchema = new Schema({
    shortURL: {
        type: String,
    },
    longURL: {
        type: String,
    }
})
module.exports = mongoose.model('URL', URLSchema)