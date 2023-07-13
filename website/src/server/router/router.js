const express = require('express');
const router = express.Router();

require('../DB/conn');
const User = require('../models/UserSchema')

router.get('/',(req,res)=>{
    res.send('Server Connected to FRONTEND router.js');
});

router.post('/register',async(req,res)=>{
    const {name} = req.body;
    console.log(name);

    if(!name){
        return res.status(422).json({error:"Pls fill the data"})
    }
    // User.findOne({databaseVariable : UserVariable})
    try {
        const userExist = await User.findOne({name:name});
        if(userExist){
            return res.status(422).json({error : "Name already exist"});
        }
        const user = new User({name});
        user.save().then(()=>{
            res.status(201).json({message:"SUCCESSFULL"})
        }).catch((err)=>res.status(500).json({error : "Error occured"}))
    } catch (error) {
        console.log(error);
    }
    
})


// User.findOne({name:name})
// .then((userExist)=>{
//     if(userExist){
//         return res.status(422).json({error : "Name already exist"});
//     }

//     const user = new User({name});
//     user.save().then(()=>{
//         res.status(201).json({message:"SUCCESSFULL"})
//     }).catch((err)=>res.status(500).json({error : "Error occured"}))
// }).catch((error)=>{
//     console.log(error);
// })
module.exports = router;