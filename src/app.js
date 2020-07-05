const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars Engine & Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Osman Umar',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Osman Umar',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Osman Umar',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address!',
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!',
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Osman Umar',
    errorMessage: "Help Article not Found!",
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Osman Umar',
    errorMessage: 'Page not found!',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
