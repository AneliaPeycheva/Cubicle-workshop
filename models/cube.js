
const mongoose = require('mongoose')

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match:[/^[0-9A-Za-z\s]+$/,'Cube name is not valid'],
        minlength:5   
    },
    description: {
        type: String,
        required: true,
        match:[/^[0-9A-Za-z\s]+$/,'Cube description is not valid'],
        minlength:20, 
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        match:[/http[s]*:\/\/[\S]+/,'Image URL is not valid'],
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorId:{
        type:'ObjectId',
        ref:'User'
    }
})

CubeSchema.path('imageUrl').validate(function(url){
    return url.startsWith('http://') || url.startsWith('https://')
},'Image URL is not valid')

module.exports =mongoose.model('Cube',CubeSchema)