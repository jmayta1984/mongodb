use sample_mflix;

db.movies.find();

// Listar las películas que fueron estrenadas en el año 1986.
db.movies.find({year:{$eq:1986}});

// Mostrar solamente el título y año de las películas estrenas el año 2000.
db.movies.find({year:{$eq:2000}}, {title:1, year:1, _id:0});

//Listar las películas que tienen más de una nominación.
db.movies.find({"awards.nominations":{$gt:1}});

db.movies.find({"awards.nominations": {$gt:1}}, {title:1, year:1, _id:0});

// Indicar la cantidad de películas estrenadas el año 2001
db.movies.countDocuments({year:{$eq:2001}});

db.movies.find({year:2001}).count();

// Indicar la cantidad de películas estrenadas por año
// SQL: SELECT year, COUNT(*) FROM movies GROUP BY year
db.movies.aggregate([
    {$group:{_id:"$year", quantity: {$count:{}}}}
]);


// Indicar la cantidad de películas estrenadas por año a partir del año 2000
db.movies.aggregate([
    {$match:{year:{$gte:2000}}},
    {$group:{_id:"$year", quantity: {$count:{}}}}
]);


// Indicar la cantidad de películas estrenadas por año a partir del año 2000, ordenando el resultado de forma descendente de acuerdo a la cantidad de películas estrenadas
db.movies.aggregate([
    {$match:{year:{$gte:2000}}},
    {$group:{_id:"$year", quantity: {$count:{}}}},
    {$sort:{quantity:-1}}
]);


// Indicar los año en los cuales se estrenó más de 1000 películas, ordenando el resultado de forma descendente de acuerdo a la cantidad de películas estrenadas
db.movies.aggregate([
    {$group:{_id:"$year", quantity: {$count:{}}}},
    {$match:{quantity:{$gt:1000}}},
    {$sort:{quantity:-1}}
]);
