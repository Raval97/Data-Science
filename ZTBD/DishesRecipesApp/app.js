const express = require('express');
bodyParser = require('body-parser');
const app = express();
const port = 3000;

var actorModel = require('./models/actorModel');
var categoryModel = require('./models/categoryModel');
var createdRecipesModel = require('./models/createdRecipesModel');
var favouriteListModel = require('./models/favouriteListModel');
var ingredientsModel = require('./models/ingredientsModel');
var quantityModel = require('./models/quantityModel');
var recipeModel = require('./models/recipeModel');
var shoppingListModel = require('./models/shoppingListModel');
var stepModel = require('./models/stepModel');
var commentModel = require('./models/commentModel');

var mongoose = require('mongoose');
var mongoDBHostname = process.env.mongoDBHostname || "localhost";

var mongoDBPort = process.env.mongoDBPort || "27017";

var mongoDBName = process.env.mongoDBName || "RecipesDB";

var mongoDBURI = 'mongodb://'+mongoDBHostname+':'+mongoDBPort+"/"+mongoDBName;

mongoose.connect(mongoDBURI, {
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 10,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true
});

console.log('Connecting to ... ');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var actorRoutes = require('./routes/actorRoutes');   
actorRoutes(app);
var IngredientsRoutes = require('./routes/IngredientsRoutes');   
IngredientsRoutes(app);
var categoryRoutes = require('./routes/categoryRoutes');   
categoryRoutes(app);
var commentRoutes = require('./routes/commentRoutes');   
commentRoutes(app);
var createdRecipesRoutes = require('./routes/createdRecipesRoutes');   
createdRecipesRoutes(app);
var favouriteListRoutes = require('./routes/favouriteListRoutes');   
favouriteListRoutes(app);
var quantityRoutes = require('./routes/quantityRoutes');   
quantityRoutes(app);
var recipeRoutes = require('./routes/recipeRoutes');   
recipeRoutes(app);
var shoppingListRoutes = require('./routes/shoppingListRoutes');   
shoppingListRoutes(app);
var stepRoutes = require('./routes/stepRoutes');   
stepRoutes(app);
var dataWarehouse = require('./routes/dataWarehouse');
dataWarehouse(app);

mongoose.connection.on("open", function(err,conn){
    app.listen(port,function(){
        console.log('Recipe API server started out ');
    });
})

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});
