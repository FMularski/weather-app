const express = require('express')
const request = require('request')

const app = express()
const port = 5000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))     // to read user input from form
app.set('view engine', 'hbs')

app.listen(port, function (error) {
    if (error)
        console.log(error)
})

// GET /
app.get('/', function (_request, response) {
    response.render('index')
})

// POST /
app.post('/', function (req, res) {
    const appid = require('./appid')
    var city = req.body.city
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${appid}`

    request(url, function (error, response, body) {
        weather_json = JSON.parse(body)

        if (weather_json.cod == "200")   // city ok
        {
            /* ICONS */
            var icons_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                icons_list.push("https://openweathermap.org/img/w/" + weather_json.list[i].weather[0].icon + ".png")
            }

            /* DATES */
            var dates_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                dates_list.push(weather_json.list[i].dt_txt)
            }

            /* DESCRIPTIONS */
            var descs_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                descs_list.push(weather_json.list[i].weather[0].description)
            }

            /* MIN. TEMPERATURES */
            var min_temps_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                min_temps_list.push(weather_json.list[i].main.temp_min)
            }

            /* MAX. TEMPERATURES */
            var max_temps_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                max_temps_list.push(weather_json.list[i].main.temp_max)
            }

            /* FEEL TEMPERATURES */
            var feel_temps_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                feel_temps_list.push(weather_json.list[i].main.temp)
            }

            /* PRESSURE */
            var pressures_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                pressures_list.push(weather_json.list[i].main.pressure)
            }

            /* HUMIDITY */
            var hums_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                hums_list.push(weather_json.list[i].main.humidity)
            }

            /* WIND SPEED */
            var wind_speeds_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                wind_speeds_list.push(weather_json.list[i].wind.speed)
            }

            /* WIND DEGREES */
            var wind_degrees_list = []
            for (var i = 0; i < weather_json.cnt; i++) {
                wind_degrees_list.push(weather_json.list[i].wind.deg)
            }


            var data = {
                // simple
                city: weather_json.city.name,
                country: weather_json.city.country,
                // lists 
                icon_list: icons_list,
                date_list: dates_list,
                desc_list: descs_list,
                min_temp_list: min_temps_list,
                max_temp_list: max_temps_list,
                feel_temp_list: feel_temps_list,
                pressure_list: pressures_list,
                hum_list: hums_list,
                wind_speed_list: wind_speeds_list,
                wind_deg_list: wind_degrees_list,
                // for validation
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
