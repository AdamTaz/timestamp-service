var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;

var app = express();
console.log(__dirname);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getdate/:date', (req,res) => {
    let dateParam = new Date(+req.params.date || req.params.date);
    let dateJSON = {"unix": dateParam.getTime(), "natural": dateParam.toDateString()};
    if (isNaN(dateJSON.unix)) {
        dateJSON.unix = null;
        dateJSON.natural = null;
    }
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end(JSON.stringify(dateJSON));

});

app.all('*', function (req, res) {
    res.writeHead(404, {"Content-Type":"text/plain"});
    res.end("Oops! That page doesn't exist here"); 
 });



app.listen(port);
