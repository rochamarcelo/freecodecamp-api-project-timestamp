var express = require('express')
var moment = require('moment')
var app = express()
app.use('/static', express.static(__dirname + '/public'))

function parseDate(date) {
    return {
        unix: date.unix(),
        natural: date.format('MMMM DD, YYYY')
    }
}
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
})
app.get('/:unix(\\d+)/', function (req, res) {
    var data = parseDate(moment.unix(+req.params.unix));
    res.send(JSON.stringify(data));
})
app.get('/:literal([a-zA-Z]*)/', function (req, res) {
    var data = parseDate(moment(req.params.literal, 'MMMM DD, YYYY'));
    res.send(JSON.stringify(data));
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})