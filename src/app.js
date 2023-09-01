const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const publiDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publiDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harshil kotadiya'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harshil Kotadiya'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Help me!',
        title: 'Help',
        name: 'Harshil Kotadiya'
    });
})

app.get('/weather', async (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    else {
        const data = await geocode(req.query.address);
        console.log(data);

        if (data.error) {
            return res.send(data);
        }
        else {
            const { latitude, longitude, location } = data;
            const forecastdata = await forecast(latitude, longitude);
            console.log(forecastdata);
            if (forecastdata.error) {
                return res.send(forecastdata);
            }
            else {
                return res.send({
                    forecast: forecastdata,
                    address: location
                })
            }

        }
    }


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harshil Kotadiya',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Harshil Kotadiya",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})