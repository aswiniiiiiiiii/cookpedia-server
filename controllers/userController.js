const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const downloadRecipes = require("../models/downloadModel");

exports.addUserController = async(req,res)=>{
    console.log("inside addUserController");

    const {username,email,password,profilePic} =req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exist...Please login!!")
        }
        else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

//login
exports.loginController = async(req,res)=>{
    console.log("Inisde loginController");
    const {email,password} = req.body
    console.log(email,password);
    
    try{
        const existingEmail = await users.findOne({email})
        if(existingEmail){
            let isUserpasswordMatch = await bcrypt.compare(password,existingEmail.password)

          
            if(isUserpasswordMatch || password==existingEmail.password){
                const token = jwt.sign({userId:existingEmail._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingEmail,token})
            }else{
                res.status(404).json("Invalid Email / Password")
            }
            }
             else{
            res.status(404).json("Invalid Email / Password")

        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

// edit user
exports.editUserController = async (req,res)=>{
    console.log("Inside editUserController");
    const {profilePic} = req.body
    const userId = req.userId
    try {
        const existingUser = await users.findById({_id:userId})
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (err) {
        res.status(401).json(err)
    }
}


//get all users
exports.getAllUserController= async(req,res)=>{
    console.log("inside getAllUserController");
    try{
        const allUsers = await users.find({role:"User"}) // .skip(1)
        res.status(200).json(allUsers)
    }catch(err){
        res.status(401).json(err)
    }
}

