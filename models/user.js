const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9]+$/,'Username is not valid'],
        minlength:5      
    },
    password:{
        type:String,
        required:true
    } 
})

module.exports=mongoose.model('User',userSchema)