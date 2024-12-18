const saveRecipes = require('../models/saveRecipeModel')


//add to collectio
exports.addToSaveCollection = async(req,res)=>{
    // console.log("inside addToSaveCollection");
    const {id} = req.params
    const userId = req.userId
    const {name,image} = req.body
    try{
        //checking the recipe already existing
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userId})
        //if existing
        if(existingRecipe){
            res.status(406).json("Selected Recipe is aleady in your Collection..Please add Another!!")
        }else{
            //add to save collection
            const newRecipe = new saveRecipes({
                recipeId:id,name,image,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//user recipe collection get - authorised user
exports.getuserSavedRecipeController = async(req,res)=>{
    console.log("inisde getuserSavedRecipeController");
    //get userId to get user recipe collectgion
    const userId = req.userId
    try{
        const userRecipeCollection = await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }catch(err){
        res.status(401).json(err)
    }
    
}


//remove save recipe - authorised user
// exports.removeSavedRecipeController =async(req,res)=>{
//     console.log("inside removeSavedRecipeController");
//     //1.get item _id to be removed from the req params
//     const {id} = req.params
//     //2.remove item from collection using findByIdand
    
//     try{
//         const removeSavedRecipe = await saveRecipes.findByIdAndDelete({_id:id})
//         res.status(200).json(removeSavedRecipe)
//     }catch(err){
//         res.status(406).json(err)
//     }
    
// }
exports.removeSaveRecipeController = async (req,res)=>{
    console.log("Inside removeSaveRecipeController");
    // 1. get item _id to be removed from req params
    const {id} = req.params
    // 2. remove item from collection using findByIdAndDelete
    try {
        const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)
    } catch (err) {
        res.status(200).json(err)
    }
}