const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')
const amazon = require('amazon-product-api')  //requireing amazon api library.
const router = express.Router()



const knex = require('knex')({ //establish connection between knex and bookshelf.
    client: 'pg',
    connection: { 
        database: 'capstone_cart',
        user: '',
        password: ''
    }
})


const bookshelf = require('bookshelf')(knex) 

const Item = bookshelf.Model.extend({ //Schema and model 
    tableName: 'cart'
})


app.use((req, res, next) => {  // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//CREATE
app.post ('/cart', (req, res) => {
    let newItem = new Item ({
        title: req.body.title,
        price: req.body.price,
    })
    newItem.save() //save added task to databse table.
        .then((item) => {
            res.json(item.attributes)//attributes comes from the data, check with console.log(req.body). these are the actual task keys that are needed.
        })
})

// READ 
app.get('/cart', (req, res) => {
    Item.fetchAll()
        .then(self => {
            res.send(self.models.map(item => item.attributes))
            //res.json(self.models.map(item => item.attributes))
        })
})

 
//DELETE
app.post('/clear', (req, res) => {
    console.log(req.body.id)
    Item.where({ id: req.body.id })
        .destroy()
        .then((item) => {
            Item.fetchAll()
                .then(self => {
                    console.log('oh wow')
                    res.json(self.models.map(item => item.attributes))
                })
        })

})


var client = amazon.createClient({
    awsId: "AKIAJE3K4IVF6OV4VKPQ",
    awsSecret: "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",
    awsTag: "2018030a-20",
    locale: 'CA',
});

 
//FEATURED ITEMS 

app.get('/featuredData', (req, res) => {
    req.query.searchIndex
    client.itemSearch({
        searchIndex: 'All',
        responseGroup: 'ItemAttributes,Images,Offers,Reviews',
        keywords: 'fair trade, organic, granola',
        domain: 'webservices.amazon.ca',
    }).then(function (results) {
        res.json(results);
    }).catch(function (err) {
        console.log(err);
    });
})

//SEARCH REQUEST

app.get('/searchData', (req, res) => {
    console.log(req.query.keyword)
    let userInput = req.query.keyword
    req.query.searchIndex
    client.itemSearch({
        searchIndex: 'All',
        responseGroup: 'ItemAttributes,Images,Offers,Reviews',
        keywords: userInput.split(' ').join(', '),
        domain: 'webservices.amazon.ca'
    }).then(function (results) {
        res.json(results);
    }).catch(function (err) {
        console.log(err);
    });
})



//Display by Category

app.get('/products/:category', (req, res) => {
    const category = req.params.category
    let result = []
    console.log(category)
    switch (category) {
        case 'baby':
            result =
                client.itemSearch({
                    searchIndex: 'Baby',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'organic',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'beauty':
            result =
                client.itemSearch({
                    searchIndex: 'Beauty',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'organic makeup',
                    IncludeReviewSummary: true,
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'health':
            result =
                client.itemSearch({
                    searchIndex: 'HealthPersonalCare',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'organic, supplement',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'grocery':
            result =
                client.itemSearch({
                    searchIndex: 'Grocery',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'organic, food',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'kitchen':
            result =
                client.itemSearch({
                    searchIndex: 'Kitchen',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'eco friendly',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
        case 'pets':
            result =
                client.itemSearch({
                    searchIndex: 'PetSupplies',
                    responseGroup: 'ItemAttributes,Images,Offers,Reviews',
                    keywords: 'organic, eco',
                    domain: 'webservices.amazon.ca'
                }).then(function (results) {
                    res.json(results);
                }).catch(function (err) {
                    console.log(err);
                });
            break
            default:
            console.log('Error, Page does not exist')
    }
})






app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`)
})