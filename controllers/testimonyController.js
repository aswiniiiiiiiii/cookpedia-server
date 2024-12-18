const testimonials = require('../models/testimonyModel')


//add testimony
exports.addTestimonyController = async(req,res)=>{
    console.log("inside addTestimonyController");

    const {name,email,message}=req.body
    console.log(name,email,message);

    try{
        const newTestimony = new testimonials({
            name,email,message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
    
}

// get all feedback
exports.getAllFeedbackController = async (req,res)=>{
    console.log("Inside getAllFeedbackController");
    try {
        allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

// feedback status update
exports.updateFeedbackStatusController = async (req,res)=>{
    console.log("Inside updateFeedbackStatusController");
    // get feedback id from url parameter
    const {id} = req.params
    // get status of feedback from url query
    const status = req.query.status
    // update status of feedback with given id
    try {
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    } catch (err) {
        res.status(401).json(err)
    }    
}

//get all approved request
exports.getAllApprovedRequest = async(req,res)=>{
    console.log("inside getAllApprovedRequest");
    try{
        allApprovedfeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedfeedbacks)
    }catch (err) {
        res.status(401).json(err)
    } 
    
}