const express=require('express')
const app=express()
const port=3000
const Name=require('./models/todoSlice');
const mongoose=require('mongoose')
const cors=require('cors')
const router=require('./router/router')





app.use(cors({
    origin:'*',
    methods:'PUT,POST,DELETE,GET',
    allowedHeaders:'Content-Type,Authorization',
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send("hello guys iam at /route")
})
app.use('',router)
app.post('/product',async(req,res)=>{
    try {
        const {name}=req.body;
    if(!name){
        return res.status(400).json({error:"task name is required"})
    }
    const newTask= new Name({name});
    await newTask.save();
        res.status(201).json({message:"task added succsessfully",task:newTask});
    } catch (error) {
        console.log("error occoured due to ",error)
    }
    

}) 
app.put('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(401).json({error:"id is not defined"}) 
        }
         const {name}=req.body
         if(!name){
            return res.status(401).json({error:"name is not required"}) 
        }
        const updatedTask=await Name.findByIdAndUpdate(id,{name})
       return res.status(201 ).json({message:" task is updtaed"})

    } catch (error) {
        
    }
})
app.delete('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(401).json({error:"id is not found"})

        }
        const Deletedid=await Name.findByIdAndDelete(id)
        return res.status(201).json({message:"id is deleted"})
    } catch (error) {
        console.log("!!!error occoured due to",error)
    }
})
const connectToDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://gulbadan128:ohxAijwNoQbm4iZu@cluster0.kudfqg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    } catch (error) {
        console.log("!!!Error occoures due to ",error)
        process.exit(1);
    }
}
connectToDB()
app.listen(port,()=>{
    console.log('hello guys')
})