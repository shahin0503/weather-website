const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shaniii'
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Arfeeee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page',
        title: 'Weather App',
        name: 'Arhin'
    })
})


// app.get('/help', (req, res) => {

//     res.send([{
//         name: 'Shahin',
//         age: 23
//     },{name: 'sarah'}
// ])
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>This is about page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
       return res.send({
        error: 'you must provide a address term'
       })
    }

    geocode(req.query.address, (error,{latitute, longitute, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitute, longitute,(error,forecastData) =>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     location: 'vadodara',
    //     forecast: 45,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arhin',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arhin',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000')
})


