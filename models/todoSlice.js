const mongoose=require('mongoose');

const newSchema=new mongoose.Schema({
    name:{required:true,type:String},
    date:{required:true,type:Date,default:Date.now

    }
})
const Name=mongoose.model('Name',newSchema)
module.exports =Name