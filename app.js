const express = require('express')
const request = require('request')

const app = express()
const port = 5000

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))     // to read user input from form

app.listen(port, function (error) {
    if (error)
        console.log(error)
})

const appid = require('./appid')

// GET /
app.get('/', function (_request, response) {
    response.render('index')
})

// POST /
app.post('/', function (req, res) {
    var city = req.body.city
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appid}`

    request(url, function (error, response, body) {
        weather_json = JSON.parse(body)
        console.log(weather_json)
    })

    res.render('index', { city })
})

// GET /about
app.get('/about', function (request, response) {
    response.render('about')
})