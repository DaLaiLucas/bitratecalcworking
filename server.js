const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.engine('.ejs', require('ejs').__express);
app.set('view engine','ejs');

const port = 3000;
app.listen(port, function() {
	console.log('listening to port ' + port);
});

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});


app.post('/calculate', function(req, res){
	// Werte aus Formular holen
	const bitrate = parseFloat(req.body["bitrate"]);
	const duration = parseFloat(req.body["duration"]);
	
	// einfaches Error-Handling, prüfen, ob die Eingabne gültig sind
	// besserer Weg: siehe express-validator 
	// https://github.com/ctavan/express-validator
	if(isNaN(bitrate) || isNaN(duration)){
		
		res.render('error', {
			'bitrate': req.body["bitrate"],
			'duration': req.body["duration"]
		});
	}
	
	else {
		const result = bitrate * duration;
		res.render('result', {
			'bitrate': bitrate,
			'duration': duration,
			'result': result
		});
	}
});