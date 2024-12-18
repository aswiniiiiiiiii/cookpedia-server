const downloadRecipes = require('../models/downloadModel')


//add to dwonloadRecipes
exports.addToDownloadRecipeController = async(req,res)=>{
    console.log("iniside addToDownloadRecipeController");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    console.log(name,image,cuisine);
    try{
        //check recipe already in download
        const  existingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            //increment count of recipe by 1 - update
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            //add recipe to your model-insert
            const newRecipe = new downloadRecipes({
                recipeId:id,
                recipeName:name,
                recipeImage:image,
                recipeCuisine:cuisine,
                count:1,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

//get user download recipes
exports.getUserDownloadListController = async(req,res)=>{
    console.log("inside getUserDownloadListController");
    //get userid from jwtMiddleware
    const userId = req.userId
    //find documents with userIsd from model
    try{
        const allUserDownloads = await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    }catch(err){
        res.status(401).json(err)
    }
    
}
//get all download recipes
exports.getAllDownloadListController = async (req,res)=>{
    console.log("Inside getAllDownloadListController");
   
    // find documents from model
    try {
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    } catch (err) {
        res.status(401).json(err)
    }
    
}