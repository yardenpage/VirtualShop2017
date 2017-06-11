var express = require('express');
var router = express.Router();
var db = require('../Dbutils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Login',function (req,res) {
    var userName = req.query.userName;
    var password = req.query.password;
    var query = "SELECT * FROM Users WHERE userName = '" + userName  + "' AND password = '" + password + "'";
    db.select(query,function (result) {
        if(result.length>0)
        {
            res.send(result[0].userName);
            console.log(result[0].userName + 'is in');
        }
        else{
            res.send("UserName or Password is wrong");
            console.log("UserName or Password is wrong");
        }
        console.log('done login!');
    });

    //update lastEntry
    var query= "UPDATE Users SET lastEntry = '" + DateTime.Now + "'" +"WHERE userName = '" + userName + "'";
    db.insert(query);

});

/* Registration to system. V */
router.post('/Registration',function (req,res) {
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
    var lastEntry = Date;
    var shirts = req.query.shirts;
    var pants = req.query.pants;
    var dresses = req.query.dresses;
    var skirts = req.query.skirts;
    var belts = req.query.belts;
    var shorts = req.query.shorts;
    var underwears = req.query.underwears;
    var hats = req.query.hats;
    var bathing_suits = req.query.bathing_suits;
    var scarfs = req.query.scarfs;

    var query ="INSERT INTO Users VALUES ('" + userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '" + email + "', '"+ phone + "', '"+ birthDay + "', '" + address + "', '"+ country + "', '"+ securityAnswer+ "', '"+ lastEntry+ "', '"+ shirts + "', '"+ pants + "', '"+ dresses + "', '"+ skirts + "', '"+ belts + "', '"+shorts + "', '"+ underwears + "', '"+hats + "', '"+ bathing_suits + "', '"+scarfs+ "')";
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
        res.send(answer);
    });
})

/* GET past Orders of user. V */
router.post('/ShowPastOrders',function (req,res) {
    var query ="SELECT * FROM Orders WHERE id = '"+ user_id + "'";
    db.select(query,function (answer) {
        console.log(answer);
    });

})

/* Add a new order. V */
router.put('/AddOrder',function (req,res) {
    var userName = req.query.userName;
    var itemId = req.query.itemId;
    var ammount = req.query.ammount;

    var query ="INSERT INTO Orders VALUES ('" + userName + "', '"+ itemId + "', '"+ ammount + "')";
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
    var lastEntry = req.query.lastEntry;
    var shirts = req.query.shirts;
    var pants=req.query.pants;
    var dresses=req.query.dresses;
    var skirts=req.query.skirts;
    var belts=req.query.belts;
    var shorts=req.query.shorts;
    var underwears=req.query.underwears;
    var hats=req.query.hats;
    var bathing_suites=req.query.bathing_suites;
    var scrafts=req.query.scrafts;

    var query ="INSERT INTO Users VALUES ('" + userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '"+ email + "', '"+ phone  +"', '"+  birthDay + "', '"+ address + "', '"+ country +  "', '"+ securityAnswer + "', '"+ lastEntry+ "', '"+ shirts +"', '"+ pants +"', '"+ dresses +"', '"+ skirts +"', '"+ belts +"', '"+ shorts +"', '"+ underwears +"', '"+ hats + "', '"+ bathing_suites +"', '"+ scrafts + "')";
    db.insert(query);
});

/* delete user by manager. V */
router.delete('/DeleteUser',function (req,res) {
    console.log(req.query);
    var userName = req.query.userName;
    var query ="DELETE FROM Users WHERE userName = '" + userName + "'";
    dataBase.insert(query);
    console.log("successfully deleted");
});

router.get('/LastEntry', function(req,res){
    var userName = req.query.userName;
    var query = "SELECT lastEntry FROM Users WHERE userName = '" + userName + "'";
    db.search(query,function(result){
        res.send(result[0].lastEntry);
        console.log(result[0].lastEntry);
    });
});

module.exports = router;
