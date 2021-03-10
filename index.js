const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

const port = 3000;

app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')));

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/news', (req,res) => {
    const search = req.query.q;
    const apiKey = `356a0ae18676408cb5163093dceeb08e`;
    const baseURL = "http://newsapi.org/v2/everything?q=" + search + "&apiKey=" + apiKey;
    console.log(baseURL);
    fetch(baseURL).then(response => {
        return response.json();
    })
    .then(data => {
        res.send(data);
    })
    .catch(e => {
        res.status(400).end();
    });
});

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});