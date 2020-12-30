 const express = require("express");
 const bcrypt = require("bcryptjs");
 const router = express.Router();
 const User = require("../model/User");
 const dotenv = require("dotenv");
 const jwt = require("jsonwebtoken");

 router.get('/', (req,res)=>{
    res.send("<h1> User Router Get Request....</h1>");
 })
//    API http://localhost:8000/user/register
//    method : post 
//    fields: name, email, password

router.post('/register',async(req,res)=>{
    
    try {   
        let { name , email, password } = req.body;
        console.log(email)
        let user = await User.findOne({email:email});
        console.log(user);
        if(user){
         return res.status(401).json({error: "user already existed"});
             }
        let salt = await bcrypt.genSaltSync(10);
        password = await bcrypt.hash(password,salt);

        user = new User({name , email , password});
        user = await user.save();
        res.status(200).json({ result : "Registred successful"})
    } 
    
    catch (err){
    if(err)throw err;
    res.status(500).json({error:"Server error"});
    }  
      
 });
 
//  http://localhost:8000/user/login
// login API;
// mathod:post 
// fields : email, password

router.post("/login",async (req,res) =>{
    try{
    // console.log('inside Login')
    let{ email ,password} = req.body;
    // console.log(email)
    let user = await User.findOne({ email:email });
    if(!user){
        return res.status(401).json({ error : "user not registred" });
    }
    let result = await bcrypt.compare(password,user.password);
    if(!result){
        return res.status(401).json({
            status : "Password not match!"
        });
    }

    let payload = {
        user :{
            email : user.email          
        },
    
    };
    jwt.sign(payload , process.env.S_KEY, (err,token) =>{
        if (err) throw err;
        res.status(200).json({
            status : "login Successfull",
            token: token,
        });
    })
}
catch (err){
    if(err)throw err;
    res.status(500).json({error:"Server error"});
    }  
}); 

router.get("/all",(req,res)=>{});

module.exports = router;