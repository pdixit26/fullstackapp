let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000; 

let pool = new pg.Pool({
	user:'pdixit',
	database: 'countries',
	password: '123456',
	host:'localhost',
	port: 5432
});
/*
pool.connect((err, db, done) =>{
	if(err){
		return console.log("pooja "+ err);
	}
	else {
		var country_name = 'Singapore';
		var continent_name = 'Asia';
		var id = 2;
	//	db.query('INSERT INTO country (country_name, continent_name, id) VALUES($1,$2,$3)', [country_name,continent_name,id], (err, table) => {
		db.query('SELECT * FROM  country', (err, table) => {
			if(err)
			{
				return console.log("dixit "+ err);
			}
			else
			{
				console.log(table.rows);
				db.end();
			}
		})
	}
});
*/
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/countries', function(req, res){
	console.log("this is GET method");
	pool.connect((err, db, done) =>{
	if(err){
		return console.log("pooja get "+ err);
	}
	else {
		
		//db.query('INSERT INTO country (country_name, continent_name, id) VALUES($1,$2,$3)', [country_name,continent_name,id], (err, table) => {
		db.query('SELECT * FROM  country', (err, table) => {
			done();
			if(err)
			{
				return console.log("dixit get "+ err);
			}
			else
			{
				console.log(table.rows);
				return res.status(400).send(table.rows);
				//db.end();
			}
		})
	}
});
})


app.post('/api/new-country', function(req, res){
	var country_name = req.body.country_name;
	var continent_name = req.body.continent_name;
	var id = req.body.id;
pool.connect((err, db, done) =>{
	if(err){
		return console.log("pooja post"+ err);
	}
	else {
		
		db.query('INSERT INTO country (country_name, continent_name, id) VALUES($1,$2,$3)', [country_name,continent_name,id], (err, table) => {
		//db.query('SELECT * FROM  country', (err, table) => {
			if(err)
			{
				return console.log("dixit "+ err);
			}
			else
			{
				console.log("DATA INSETED!!");
				db.end();
			}
		})
	}
});

})


app.listen(PORT, ()=> console.log('listening' + PORT));
