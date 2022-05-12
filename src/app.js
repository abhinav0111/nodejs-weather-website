const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

// Define paths for app js
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars enine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhinav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhinav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP Page',
        name: 'Abhinav'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error: "Search Term should be given"
        })
    }
    geocode(req.query.search, (error, { long, lat } = {}) => {
        if (error != undefined) {
            res.send(error)
        }
        else {
            forecast(lat, long, (error, data) => {
                res.send({
                    Location: req.query.search,
                    Currenttemp: data.current_temp,
                    Feelslike: data.feels_like,
                    Addresss: data.location
                })
            })
        }
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "you must provide search term"
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })
// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('error', {
        errormsg: "Help article Page not found",
        name: 'Abhinav'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        errormsg: "Page not found",
        name: 'Abhinav'
    })
})
app.listen(port, () => {
    console.log("server is up on port " + port)
}) 