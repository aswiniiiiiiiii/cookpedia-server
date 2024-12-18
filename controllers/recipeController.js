const recipes = require('../models/recipeModel')

//get all recipes
exports.getAllRecipeController = async (req, res) => {
    // console.log("Inside getAllRecipeController");

    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }
    catch (err) {
        res.status(4001).json(err)
    }
}

//getRecipe - authorised user
exports.getARecipeController = async (req, res) => {
    console.log("inside getARecipeController");
    //get dynamic values from url
    const { id } = req.params

    try {
        const recipeDetails = await recipes.findById({ _id: id })
        res.status(200).json(recipeDetails)
    } catch (err) {
        res.status(401).json(err)
        console.log(err);

    }
}

//related recipe
exports.realtedRecipeController = async (req, res) => {
    console.log("inside realtedRecipeController");
    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(allRelatedRecipes)
    } catch (err) {
        res.status(401).json(er)
    }
}

//addRecipe
exports.addRecipeController = async (req, res) => {
    console.log("Inside addRecipeController");
    //1.get all data from req..body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    try {
        //2.check recipe already in model : name
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            //3.else recipe already exist
            res.status(406).json("Recipe already exist in our collection!! Add Another!!")
        }
        else {
            //4.if recipe not in model then insert the recipe
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch (err) {

    }


}

//update recipe
exports.updateRecipeController = async (req, res) => {
    console.log("inside updateRecipeController");
    //get id of recipe should be updated
    const {id} = req.params
    //get update details from req.body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    //find recip name is already exist
    try {
        //update recipe - findbyidandUpdate
        const updateRecipe = await recipes.findByIdAndUpdate({ _id: id }, {
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
        }, { new: true })
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    } catch (err) {

    }
}

//delete recipe
exports.removeRecideCoontroller = async(req,res)=>{
    console.log("inside removeRecideCoontroller");
    const {id} = req.params
    //remove recipe from model - findByIdandDelete
    try{
    
        const removeRecipe = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}