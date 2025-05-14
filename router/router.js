const express=require('express')
const router= express.Router()
const UserForm=require('../models/formModel')

router.use(express.urlencoded({ extended: true }));
router.get('/about',(req,res)=>{
    res.send('<h1>Hello this is router about </h1>')
})
router.get('/contactus',(req,res)=>{
    res.send("<h1>this is ContactUs Route </h1>")
})
router.post('/submitform',async(req,res)=>{
    try {
         const {name,FathersName,gender,country}=req.body
  if(!name || !FathersName || !gender || !country){
    return res.status(404).json({error:"!!!error data note received"})
  }
  
  const userdata=new UserForm({name,FathersName,gender,country})
  await userdata.save()
  res.status(201).json({message:"data recieved SuccsessFully"})
    } catch (error) {
        console.log("error Occoured due to",error)
    }
 
})
router.get('/form', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <form action="/submitform" method="post">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" placeholder="Enter your name" /><br/>
      
      <label for="F_name">Father's Name:</label>
      <input type="text" name="FathersName" id="F_name" placeholder="Enter your father's name" /><br/>

      <label>Gender:</label>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female<br/>

      <label for="country">Country:</label>
      <select name="country">
        <option value="Pakistan">Pakistan</option>
        <option value="India">India</option>
        <option value="China">China</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Iran">Iran</option>
      </select><br/><br/>

      <button type="submit">Submit</button>
    </form>
  `);
});

module.exports=router