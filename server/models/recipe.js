const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeTitle: {type: String, required: true},
    description: {type: String, required: true},
    ingredients: [{name: String, quatity: Number, required: true }],
    servings: {type: Number, required: true},
    cookingTime: {type: String, required: true},
    prepationProcedure: {type: String, required: true},
    recipePhoto: {type: String, required: true},
    recipeOwner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}

})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = {Recipe}