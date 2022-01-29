'use strict';

var mongoose = require('mongoose'),
    Laureates = mongoose.model('Laureates'),
    NobelPrizes = mongoose.model('Prizes');

// ######################################
// ###### Laureates Collection ##########
// ######################################

// http://localhost:3000/v1/datawarehouse/countOfPrizesByNationality
exports.count_of_prizes_by_nationality = async function (req, res) {
    let result = await Laureates.aggregate([
        {$unwind: "$nobelPrizes"},
        {
            $group: {
                _id: "$birth.place.country.en",
                sum: {$sum: 1},
            }
        },
        {
            $sort: {sum: -1}
        }
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/countOfPrizesByGender
exports.count_of_prizes_by_gender = async function (req, res) {
    let result = await Laureates.aggregate([
        {$unwind: "$nobelPrizes"},
        {
            $group: {
                _id: "$gender",
                sum: {$sum: 1},
            }
        },
        {
            $sort: {sum: -1}
        },
        {
            $limit: 100
        }
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/countOfPrizesByAge
exports.count_of_prizes_by_age = async function (req, res) {
    let result = await Laureates.aggregate([
        {$unwind: "$nobelPrizes"},
        {
            $project: {
                _id: 1,
                "birthYear": { $convert: {
                        input:  { $substr: [ "$birth.date", 0, 4 ] }, to: "int",
                        onError:{$concat:["Could not convert ", {$toString:"$birth.date"}, " to type integer."]},
                        onNull: 0
                    } },
                "awardYear": { $convert: {
                        input:  "$nobelPrizes.awardYear", to: "int",
                        onError:{$concat:["Could not convert ", {$toString:"$nobelPrizes.dateAwarded"}, " to type integer."]},
                        onNull: 0
                    } },
                "gender": 1
            }
        },
        {
            $addFields: {
                age: {$subtract: [ "$awardYear", "$birthYear"] },
            }
        },
        {
            $group: {
                _id: '$age',
                count: {$sum: 1},
            }
        },
        {
            $sort: {count: -1}
        }
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/averageAgeOfWinningFirstPrize
exports.average_age_of_winning_first_prize = async function (req, res) {
    let result = await Laureates.aggregate([
        {
            $project: {
                _id: 1,
                "birthYear": { $convert: {
                        input:  { $substr: [ "$birth.date", 0, 4 ] }, to: "int",
                        onError:{$concat:["Could not convert ", {$toString:"$birth.date"}, " to type integer."]},
                        onNull: 0
                    } },
                "awardYear": { $convert: {
                        input:  { $first: "$nobelPrizes.awardYear" }, to: "int",
                        onError:{$concat:["Could not convert ", {$toString:"$nobelPrizes.dateAwarded"}, " to type integer."]},
                        onNull: 0
                    } },
            }
        },
        {
            $addFields: {
                age: {$subtract: [ "$awardYear", "$birthYear"] },
            }
        },
        {
            $group: {
                _id: '_id',
                avgAge: {$avg: "$age"},
            }
        },
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/countOfPersonWithMultiplePrize
exports.count_of_person_with_multiple_prize = async function (req, res) {
    let result = await Laureates.aggregate([
        {
            $project: {
                _id: 1,
                countOfPrize: {$size: "$nobelPrizes"}
            }
        },
        {
            $match: {
                countOfPrize : { $gt: 1 }
            }
        },
        {
            $group: {
                _id: "_id",
                count : { $sum: 1}
            }
        }
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/countOfPersonByNumberOfPrize
exports.count_of_person_by_number_of_prize = async function (req, res) {
    let result = await Laureates.aggregate([
        {
            $project: {
                _id: 1,
                countOfPrize: {$size: "$nobelPrizes"}
            }
        },
        {
            $group: {
                _id: "$countOfPrize",
                count : { $sum: 1}
            }
        }
    ])
    res.json(result)
}

// ######################################
// ###### NobelPrizes Collection ########
// ######################################

// http://localhost:3000/v1/datawarehouse/countOfPrizesByCategory
exports.count_of_prizes_by_category = async function (req, res) {
    let result = await NobelPrizes.aggregate([
        {
            $group: {
                _id: "$category.en",
                sum: {$sum: 1},
            }
        },
        {
            $sort: {sum: -1}
        }
    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/averagePrizeAmountByCategory
exports.average_prize_amount_by_category = async function (req, res) {
    let result = await NobelPrizes.aggregate([
        {
            $group: {
                _id: "$category.en",
                avgOfPrizeAmount: {$avg: "$prizeAmount"},
                avgOfPrizeAmountAdjusted: {$avg: "$prizeAmountAdjusted"}
            }
        },
        {
            $sort: {avgOfPrizeAmount: -1}
        }

    ])
    res.json(result)
}

// http://localhost:3000/v1/datawarehouse/countOfPrizeByDataAwarded
exports.count_of_prize_by_data_awarded = async function (req, res) {
    let result = await NobelPrizes.aggregate([
        {
            $project: {
                _id: 1,
                "dateAwarded": { $convert: {
                        input:  { $substr: [ "$dateAwarded", 0, 4 ] }, to: "int",
                        onError:{$concat:["Could not convert ", {$toString:"$birth.date"}, " to type integer."]},
                        onNull: 0
                    } },
            }
        },
        {
            $group: {
                _id: "$dateAwarded",
                sum: {$sum: 1},
            }
        },
        {
            $sort: {_id: -1}
        }
    ])
    res.json(result)
}
