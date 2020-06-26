const mongoose = require('mongoose')

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match:[/^[0-9A-Za-z\s]+$/,'Accessory name is not valid'],
        minlength:5  
    },
    description: {
        type: String,
        required: true,
        match:[/^[0-9A-Za-z\s]+$/,'Accessory description is not valid'],
        minlength:20,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        match:[/http[s]*:\/\/[\S]+/,'Accessory image URL is not valid'],
        required: true
    },
   
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
})

AccessorySchema.path('imageUrl').validate(function(url){
    return url.includes('http') || url.include('https')
},'Image URL is not valid')

module.exports =mongoose.model('Accessory',AccessorySchema)