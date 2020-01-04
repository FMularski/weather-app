const express = require('express')
const request = require('request')

const app = express()
const port = 5000

app.set('view engine', 'hbs')

console.log(__dirname)
app.use(express.static(__dirname + '/public'))

app.listen(port, function (error) {
    if (error)
        console.log(error)
})

const appid = require('./appid')
var city = 'Elblag'
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${appid}`

// GET /
app.get('/', function (_request, response) {

    request(url, function (error, response, body) {
        weather_json = JSON.parse(body)
        console.log(weather_json)
    });

    response.render('index')
})

app.get('/about', function (request, response) {
    response.render('about')
})