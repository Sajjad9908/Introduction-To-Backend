const mongoose=require('mongoose')

const formSchema= new mongoose.Schema({
    name:{required:true,type:String},
    FathersName:{required:true,type:String},
    gender:{required:true,type:String},
    country:{required:true,type:String},
})
const UserForm=mongoose.model('UserForm',formSchema)
module.exports=UserForm;