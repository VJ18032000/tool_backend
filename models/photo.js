const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false,
        default:null
    }
},{timestamps: true})

module.exports = mongoose.model('Img', imgSchema)