var express = require('express');
var router = express.Router();
var db = require('../Dbutils');

var user_id;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Login',function (req,res) {
    var userName = req.query.userName;
    var password = req.query.password;
    var query = "SELECT * FROM Users WHERE userName = '" + userName  + "' AND password = '" + password + "'";
    db.select(query,function (result) {
        console.log('done login!');
    });

});

/* Registration to system. V */
router.post('/Registration',function (req,res) {
    var id = req.query.id;
    var userName = req.query.userName;
    var password = req.query.password;
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var gender = req.query.gender;
    var email = req.query.email;
    var phone = req.query.phone;
    var birthDay = req.query.birthDay;
    var address = req.query.address;
    var country = req.query.country;
    var securityAnswer = req.query.securityAnswer;

    var query ="INSERT INTO Users VALUES ('" + id + "', '"+ userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '" + email + "', '"+ phone + "', '"+ birthDay + "', '" + address + "', '"+ country + "', '"+ securityAnswer + "')";
    db.insert(query ,function (answer){
        console.log('done registration!');
    });
});

/* Reset password. V */
router.post('/ForgetPassword',function (req,res) {
    var userName = req.query.userName;
    var answer = req.query.answer;

    var query = "SELECT password FROM Users WHERE userName = '" + userName  + "' AND securityAnswer = '" + answer + "'";
    db.select(query,function (answer) {
        console.log(answer);
    });
})

/* GET past Orders of user. V */
router.get('/ShowPastOrders',function (req,res) {
    user_id='1';
    var query ="SELECT * FROM Orders WHERE id = '"+ user_id + "'";
    db.select(query,function (answer) {
        console.log(answer);
    });

})

/* Add a new order. V */
router.put('/AddOrder',function (req,res) {
    var itemId = req.query.itemId;
    var ammount = req.query.ammount;

    var query ="INSERT INTO Orders VALUES ('" + user_id + "', '"+ itemId + "', '"+ ammount + "')";
    db.insert(query);
    console.log("done!");
})

/* GET users listing. V */
router.get('/ListUsers',function (req,res) {
    var query = "SELECT * FROM Users";
    db.select(query,function (answer) {
        console.log(answer);
    });

})

//bonus part
/* Add user by manager. V */
router.post('/AddUser',function (req,res) {
    var id = req.query.id;
    var userName = req.query.userName;
    var password = req.query.password;
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var email = req.query.email;
    var phone = req.query.phone;
    var country = req.query.country;
    var address = req.query.address;
    var gender = req.query.gender;
    var birthDay = req.query.birthDay;
    var securityAnswer = req.query.securityAnswer;
    var shirts = req.query.shirts;
    var pants=req.query.pants;
    var dresses=req.query.dresses;
    var skirts=req.query.skirts;
    var belts=req.query.belts;
    var shorts=req.query.shorts;
    var underwars=req.query.underwars;
    var hats=req.query.hats;
    var bathing_suites=req.query.bathing_suites;
    var scrafts=req.query.scrafts;

    var query ="INSERT INTO Users VALUES ('" + id + "', '"+ userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ email + "', '"+ phone + "', '"+ country + "', '"+ address + "', '"+ gender + "', '"+ birthDay + "', '"+ securityAnswer + "', '"+ shirts +"', '"+ pants +"', '"+ dresses +"', '"+ skirts +"', '"+ belts +"', '"+ shorts +"', '"+ underwars +"', '"+ hats + "', '"+ bathing_suites +"', '"+ scrafts + "')";
    db.insert(query);
});

/* delete user by manager. V */
router.delete('/DeleteUser',function (req,res) {
    console.log(req.query);
    var id = req.query.id;
    var query ="DELETE FROM Users WHERE id = '" + id + "'";
    dataBase.insert(query);
    console.log("successfully deleted");
});
module.exports = router;
