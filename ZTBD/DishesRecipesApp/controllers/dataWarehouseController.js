'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors'),
    Recipe = mongoose.model('Recipes');


exports.list_mostly_liked_dishes_by_each_age_groupe = async function (req, res) {

    let boundaries = [0, 12, 19, 30, 40, 50, 60]
    let finalResult = []
    let finalResponseIds = []
    for (let i = 0; i < boundaries.length; i++) {
        let result = await Actor.aggregate([
            {
                $unwind: "$favouriteLists"
            },
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: [0, 12, 19, 30, 40, 50, 60],
                    default: "60+",
                    output: {
                        "count": {$sum: 1},
                        "recipesIDs": {$push: "$favouriteLists"}
                    }
                }
            },
            {
                $unwind: "$recipesIDs"
            },
            {
                "$group": {
                    "_id": {
                        "age": "$_id",
                        "recipesIDs": "$recipesIDs"
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                $sort: {count: -1}
            },
            {
                $match: {
                    "_id.age": boundaries[i]
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 1
            }
        ])
        console.log(result)
        if(result.length > 0){
            let recipe = await Recipe.find({_id: result[0]._id.recipesIDs})
            finalResult.push({
                age: boundaries[i],
                recipe: recipe
            });
            finalResponseIds.push(result[0]._id.recipesIDs)
        }
        if (i === (boundaries.length -1)) {
            res.json(finalResult)
        }
    }
}

exports.list_mostly_added_to_favourite_by_each_difficulty_level = async function (req, res) {
    let result = await Actor.aggregate([
        {
            $unwind: "$favouriteLists"
        },
        {
            $group: {
                _id: "$favouriteLists",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 10
        }
    ])

    let recipeArray = []
    Array.from(result).forEach(recipeId =>
        recipeArray.push(recipeId._id)
    )
    console.log(recipeArray)
    var tempResult = Recipe.find({_id: {$in: recipeArray}})

    let finalResult = []
    for (let i = 0; i < 5; i++) {
        let temp = tempResult.where("difficultyLevel").eq(i)
        await temp
            .sort({difficultyLevel: 1})
            .limit(1)
            .lean()
            .exec(function (err, recipe) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(recipe)
                    finalResult.push({
                        id: i,
                        recipe: recipe
                    });
                    // its working :), dont judge^^
                    if (i == 4) res.json(finalResult)
                }
            })
    }

}


exports.list_mostly_added_to_shopping_list = async function (req, res) {
    let result = await Actor.aggregate([
        { // It's not mistake, we leave it here because it currently we got an array of shopping list ;)
            $unwind: "$shoppingList"
        },
        {
            $project:
                {
                    "shoppingList.ingredients": 1,
                    _id: 0
                }
        },
        {
            $unwind: "$shoppingList.ingredients"
        },
        {
            $group: {
                _id: "$shoppingList.ingredients.name",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 10
        }
    ])
    res.json(result)
};

exports.list_most_commented_recipes = async function (req, res) {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    let result = await Recipe.aggregate([
        {$unwind: {path: "$comments"}},
        {
            $group: {
                _id: "$_id",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 5
        }
    ])
    res.json(result)
};

exports.list_most_liked_recipes = async function (req, res) {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    let result = await Recipe.aggregate([
        {$unwind: {path: "$comments"}},
        {
            $match: {
                $and: [
                    {"comments.rating": {$gte: 3}}
                ]
            }
        },
        {
            $group: {
                _id: "$_id",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 5
        }
    ])
    res.json(result)
};

// we print the results with rating more or equals 3 and is in this month
exports.list_most_liked_this_week = async function (req, res) {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    let result = await Recipe.aggregate([
        {$unwind: {path: "$comments"}},
        {
            $match: {
                $and: [
                    {"comments.created": {$gte: new Date(date.toISOString())}},
                    {"comments.rating": {$gte: 3}}
                ]
            }
        },
        {
            $group: {
                _id: "$_id",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 5
        }
    ])
    res.json(result)
};

exports.list_most_commented_this_week = async function (req, res) {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    let result = await Recipe.aggregate([
        {$unwind: {path: "$comments"}},
        {$match: {"comments.created": {$lte: new Date(date.toISOString())}}},
        {
            $group: {
                _id: "$_id",
                suma: {$sum: 1}
            }
        },
        {
            $sort: {suma: -1}
        },
        {
            $limit: 5
        }
    ])
    res.json(result)
};
