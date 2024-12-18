const recipeController = require('../controllers/recipeController')
const express = require('express')
const testimonyController = require('../controllers/testimonyController')
const router= new express.Router()
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middelwares/jwtMiddleware')
const downloadRecipeControllers = require('../controllers/downloadRecipeController')
const saveRecipeController = require('../controllers/saveRecipeController')

//all-recipes
router.get("/all-recipes",recipeController.getAllRecipeController)
//add-testimony
router.post("/add-testimony",testimonyController.addTestimonyController)
//register
router.post("/register",userController.addUserController)
//login
router.post("/login",userController.loginController)
//getarecipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)
//related-recipes
router.get("/related-recipes",jwtMiddleware,recipeController.realtedRecipeController)
//download-recipe
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipeControllers.addToDownloadRecipeController)
//save-recipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addToSaveCollection)
//get-user-recipe
// router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getuserSavedRecipeController)
router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getuserSavedRecipeController)

//delete recipe
// router.delete("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeSavedRecipeController)
//delete user saved recipe
router.delete('/save-recipes/:id/remove',jwtMiddleware,saveRecipeController.removeSaveRecipeController)

//get user download recipes
router.get("/user-downloads",jwtMiddleware,downloadRecipeControllers.getUserDownloadListController)

// edit-user
router.post('/user/edit',jwtMiddleware,userController.editUserController)
module.exports = router

//get all-users
router.get("/all-users",jwtMiddleware,userController.getAllUserController)
//get all-download-list
router.get("/download-list",jwtMiddleware,downloadRecipeControllers.getAllDownloadListController)
//get-testimony
router.get("/all-feedback",jwtMiddleware,testimonyController.getAllFeedbackController)
//update-testimony
router.get('/feedback/:id/update',jwtMiddleware,testimonyController.updateFeedbackStatusController)
//get-approved-testmony
router.get('/all-approve-feedack',testimonyController.getAllApprovedRequest)
//add recipes
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)
//edit recipes
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.updateRecipeController)
//delete recipes
router.delete("/recipes/:id/remove",jwtMiddleware,recipeController.removeRecideCoontroller)
