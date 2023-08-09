const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'chris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'chris'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'chris'
    })
})
app.get('/weather', (req, res) => {
    geocode(req.query.address, (err, { longtitude, latitude, location } = {}) => {
        if (err) {
            return res.send({ error: err })
        }
        forecast(longtitude, latitude, (error, forecastdata) => {

            if (forecastdata) {
                return res.send({
                    location: location,
                    forecast: forecastdata
                })
            }
            res.send({
                error: error
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ba'
    })
})

app.listen(port, () => {
    console.log('server is starting')
})