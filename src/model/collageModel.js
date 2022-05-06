const mongoose = require('mongoose')

const collageschema = mongoose.Schema({
    name: { 
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    }, 
    fullName: {
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    logoLink: {
        type:String,
        required:true,
        trim:true   
    }, 
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true})

const collageModel = new mongoose.model('Collage',collageschema)
module.exports = collageModel
