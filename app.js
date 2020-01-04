const express = require('express')
const app = express()
const port = 5000

app.set('view engine', 'hbs')

console.log(__dirname)
app.use(express.static(__dirname + '/public'))

app.listen(port, function (error) {
    if (error)
        console.log(error)
})

// GET /
app.get('/', function (request, response) {
    response.render('index')
})

app.get('/about', function (request, response) {
    response.render('about')
})