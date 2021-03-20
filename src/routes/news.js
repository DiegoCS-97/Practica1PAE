const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/', (req,res) => {
    const search = req.query.q;
    console.log(req.query.q);
    const apiKey = '356a0ae18676408cb5163093dceeb08e';
    const baseURL = 'http://newsapi.org/v2/everything?q='  + search + '&apiKey=' + apiKey;
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

module.exports = router;

