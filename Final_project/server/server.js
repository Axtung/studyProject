const express = require('express');
const fs = require('fs');
const cart = require('./cart');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.listen(3000, () => console.log('server started'));

app.get('/api/productIndex', (req, res) => {
    fs.readFile('server/db/productIndexUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            res.send(data)
        }
    })
});

app.get('/api/cartHeader', (req, res) => {
    fs.readFile('server/db/cartHeaderUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            res.send(data)
        }
    })
});

app.post('/api/cartHeader/', (req, res) => {
    fs.readFile('server/db/cartHeaderUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            let newCart = cart.add(JSON.parse(data), req);
            fs.writeFile('server/db/cartHeaderUrl.json', newCart, (err) => {
                if (err) {
                    res.send({result: 0, text: 'Error'})
                } else {
                    res.send({result: 1, text: 'Success'})
                }
            })
        }
    })
});

app.put('/api/cartHeader/:id', (req, res) => {
    fs.readFile('server/db/cartHeaderUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            let newCart = cart.change(JSON.parse(data), req);
            fs.writeFile('server/db/cartHeaderUrl.json', newCart, (err) => {
                if (err) {
                    res.send({result: 0, text: 'Error'})
                } else {
                    res.send({result: 1, text: 'Success'})
                }
            })
        }
    })
});

app.delete('/api/cartHeader/', (req, res) => {
    fs.readFile('server/db/cartHeaderUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            let newCart = cart.remove(JSON.parse(data), req);
            fs.writeFile('server/db/cartHeaderUrl.json', newCart, (err) => {
                if (err) {
                    res.send({result: 0, text: 'Error'})
                } else {
                    res.send({result: 1, text: 'Success'})
                }
            })
        }
    })
});

app.delete('/api/shoppingCart/', (req, res) => {
    fs.readFile('server/db/cartHeaderUrl.json', 'utf8', (err, data) => {
        if (err) {
            res.send({result: 0, text: 'Error'})
        } else {
            let newCart = cart.removeAll(JSON.parse(data), req);
            fs.writeFile('server/db/cartHeaderUrl.json', newCart, (err) => {
                if (err) {
                    res.send({result: 0, text: 'Error'})
                } else {
                    res.send({result: 1, text: 'Success'})
                }
            })
        }
    })
});