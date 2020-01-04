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
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${appid}`

    request(url, function (error, response, body) {
        weather_json = JSON.parse(body)
        console.log(weather_json)

        if (weather_json.cod == "200")   // city ok
        {
            var data = {
                code: weather_json.cod,
                city: weather_json.city.name,
                country: weather_json.city.country,
                list: weather_json.list,
                msg: null,
                valid_city: true
            }
        }
        else if (weather_json.cod == "400") {   // user entered nothing
            var data = {
                msg: "Nothing to search.",
                valid_city: false
            }
        }
        else if (weather_json.cod == "404") {   // city not found
            var data = {
                msg: "Sorry, city not found :(",
                valid_city: false
            }
        }
        else {                                  // other error
            var data = {
                msg: weather_json.message,
                valid_city: false
            }
        }

        res.render('index', data)
    })

})

// GET /about
app.get('/about', function (request, response) {
    response.render('about')
})