'use strict';
module.exports = function (app) {
    var dataWarehouse = require('./controller');

    // ###### Laureates Collection ########

    app.route('/v1/datawarehouse/countOfPrizesByNationality')
        .get(dataWarehouse.count_of_prizes_by_nationality);

    app.route('/v1/datawarehouse/countOfPrizesByGender')
        .get(dataWarehouse.count_of_prizes_by_gender);

    app.route('/v1/datawarehouse/countOfPrizesByAge')
        .get(dataWarehouse.count_of_prizes_by_age);

    app.route('/v1/datawarehouse/averageAgeOfWinningFirstPrize')
        .get(dataWarehouse.average_age_of_winning_first_prize);

    app.route('/v1/datawarehouse/countOfPersonWithMultiplePrize')
        .get(dataWarehouse.count_of_person_with_multiple_prize);

    app.route('/v1/datawarehouse/countOfPersonByNumberOfPrize')
        .get(dataWarehouse.count_of_person_by_number_of_prize);

    // ###### NobelPrizes Collection ########

    app.route('/v1/datawarehouse/countOfPrizesByCategory')
        .get(dataWarehouse.count_of_prizes_by_category);

    app.route('/v1/datawarehouse/averagePrizeAmountByCategory')
        .get(dataWarehouse.average_prize_amount_by_category);

    app.route('/v1/datawarehouse/countOfPrizeByDataAwarded')
        .get(dataWarehouse.count_of_prize_by_data_awarded);

};
