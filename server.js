var express = require('express')
var moment = require('moment')
var app = express()

app.get('/', function (req, res) {
    var data = {
        unix: null,
        natural: null
    };
    res.send(JSON.stringify(data));
})
app.get('/:unix(\\d+)/', function (req, res) {
    
    var data = {
        unix: +req.params.unix,
        natural: moment.unix(+req.params.unix).format('MMMM DD, YYYY')
    };
    res.send(JSON.stringify(data));
})
app.get('/:literal([a-zA-Z]*)/', function (req, res) {
    var date = moment(req.params.literal, 'MMMM DD, YYYY');
    var data = {
        unix: date.unix(),
        natural: req.params.literal
    };
    if (!data.unix) {
        data.natural = null;
    }
    res.send(JSON.stringify(data));
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})