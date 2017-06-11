/**
 * Created by Dell on 6/3/2017.
 */
var express = require('express');
var router = express.Router();
var dataBase = require('../Dbutils');

/* GET items listing. V */
router.get('/', function(req, res, next) {
    res.send('respond with a resource items');
});

/* GET all products . V */
router.get('/AllProducts', function(req, res, next) {
    console.log(req.query);
    var query = "SELECT * FROM Items";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET top 5 items .  V */
router.get('/Hot5Products',function (req,res) {
    console.log(req.query);
    var query= "SELECT * FROM Items WHERE hot = '" + 1 + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
})

/* GET all the new products from the LAST MONTH. V */
router.get('/NewProducts', function(req, res) {
    var TodayDate = new Date();
    var month = TodayDate.getMonth()+1;
    var year = TodayDate.getFullYear();
    var query = "SELECT * FROM Items WHERE month = "+ month +" AND year = " + year;
    dataBase.select(query,function (result)
    {
        res.send(result);
    });
});

/* GET products by category . V  ?????????????????*/
router.get('/ProductsByCategory', function(req, res) {
    console.log(req.query);
    var category = req.query.categoty;
    var query= "SELECT * FROM Items WHERE category = '" + category + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET products sorted by . V */
router.get('/SortProducts', function(req, res) {
    console.log(req.query);
    var sorted = req.query.sorted;
    var query= "SELECT * FROM Items ORDER BY "+sorted+" ASC";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET recommended products . V */
router.get('/RecommendedProducts', function(req, res) {
    console.log(req.query);
    var id = req.query.id;
    var query = "SELECT * FROM Items WHERE category IN ( SELECT category FROM Orders WHERE user_id = '" + id + "' ) ";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET items by name . V */
router.get('/SearchProductsByName', function(req, res) {
    console.log(req.query);
    var searchBy = req.query.searchBy;
    var query= "SELECT * FROM Items WHERE name = '" + searchBy + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET items by color . V  */
router.get('/SearchProductsByColor', function(req, res) {
    console.log(req.query);
    var searchBy = req.query.searchBy;
    var query= "SELECT * FROM Items WHERE color = '" + searchBy + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* GET items by size . V  */
router.get('/SearchProductsBySize', function(req, res) {
    console.log(req.query);
    var searchBy = req.query.searchBy;
    var query= "SELECT * FROM Items WHERE size = '" + searchBy + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* Get if product available . V */
router.get('/IsProductAvailable', function(req, res) {
    console.log(req.query);
    var id = req.query.id;
    var query= "SELECT * FROM Items WHERE id = '" + id + "' AND quantity > '" + 0 + "'";
    dataBase.select(query,function (result) {
        res.send(result);
    });
});

/* POST - delete product . V  */
router.post('/DeleteProduct', function(req, res) {
    console.log(req.query);
    var id = req.query.id;
    var query ="DELETE FROM Items WHERE id = '" + id + "'";
    dataBase.insert(query ,function (answer){
        console.log('deleted succesfully!');
        res.send(answer);
    });
});

/* POST - Add product to db . V  */
router.post('/AddProduct', function(req, res) {
    var itemId = req.query.itemId;
    var itemName=req.query.itemName;
    var itemSize=req.query.itemSize;
    var itemColor=req.query.itemColor;
    var itemQuantity=req.query.itemQuantity;
    var itemPrice = req.query.itemPrice;
    var itemHot = req.query.itemHot;
    var category = req.query.category;
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;
    var query ="INSERT INTO Items VALUES ('" + itemId + "', '"+ itemName + "', '"+ itemSize + "', '"+ itemColor + "', '"+ itemQuantity + "', '"+ itemPrice + "', '"+ itemHot + "', '"+ category + "', '"+ day + "', '"+ month + "', '"+ year + "')";
    dataBase.insert(query ,function (answer){
        console.log('added succesfully!');
        res.send(answer);
    });
});

/* PUT - update the stock . V  */
router.put('/UpdateStock', function(req, res) {
    console.log(req.query);
    var id = req.query.id;
    var quantity = req.query.quantity;
    var query= "UPDATE Items SET quantity = '" + quantity + "'" +"WHERE id = '" + id + "'";
    dataBase.insert(query ,function (answer){
        console.log('updated succesfully!');
        res.send(answer);
    });
});

module.exports = router;