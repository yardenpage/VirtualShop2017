var express = require('express');
var router = express.Router();
var db = require('../Dbutils');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* POST login. */
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
    db.insert(query,function (answer) {
        console.log(answer);
    });

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
    var lastEntry = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var shirts = req.query.shirts;
    var pants = req.query.pants;
    var dresses = req.query.dresses;
    var skirts = req.query.skirts;
    var underwears = req.query.underwears;

    var query1 ="INSERT INTO Users VALUES ('" + userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '" + email + "', '"+ phone + "', '"+ birthDay + "', '" + address + "', '"+ country + "', '"+ securityAnswer+ "', '"+ lastEntry+ "')";
    db.insert(query1 ,function (answer1){
            var query2 ="INSERT INTO UserCategorys VALUES ('" + userName + "', '"+ shirts+ "', '"+ pants+ "', '"+ dresses+ "', '"+ skirts+ "', '"+ underwears + "')";
            db.insert(query2, function (answer2) {
            });
        console.log('done registration!');
        res.send(answer1);
    });

});

/* Reset password. V */
router.post('/ForgetPassword',function (req,res) {
    var userName = req.query.userName;
    var answer = req.query.answer;

    var query = "SELECT password FROM Users WHERE userName = '" + userName  + "' AND securityAnswer = '" + answer + "'";
    db.select(query,function (answer) {
        if(answer.length>0)
        {
            console.log(answer);
            res.send(answer);
        }
        else{
            res.send("The combination of user name and answer is wrong");
            console.log("The combination of user name and answer is wrong");
        }

    });
})

/* GET past Orders of user. V */
router.post('/ShowPastOrders',function (req,res) {
    var userName = req.query.userName;
    var query ="SELECT * FROM Orders WHERE userName = '"+ userName + "'";
    db.select(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });

})

/* Add a new order. V */
router.post('/AddOrder',function (req,res) {
    var id = req.query.id;
    var userName = req.query.userName;
    var orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var shipmentDate=  req.query.shipmentDate;
    var currency=  req.query.currency;
    var query = "SELECT * FROM Carts WHERE userName = '"+ userName + "'";
    db.select(query,function (result) {
    });
    var totalAmount=0;
    for(var i=0; i<result.length; i++)
        totalAmount=totalAmount+result[0].amount;
    res.send(totalAmount);
    console.log(totalAmount);
    var query = "DELETE FROM Carts WHERE userName = = '"+ userName + "'";
    db.insert(query,function (result) {
    });
    var query ="INSERT INTO Orders VALUES ('" + id + "', '"+ userName + "', '"+ orderDate + "', '"+ shipmentDate+ "', '"+  currency+ "', '"+ totalAmount+"')";
    db.insert(query,function (answer) {
        console.log(answer);

    });
})

router.post('/AddToCart',function (req,res) {
    var userName = req.query.userName;
    var itemId = req.query.itemId;
    var ammount = req.query.ammount;

    var query ="INSERT INTO Carts VALUES ('" + userName + "', '"+ itemId + "', '"+ ammount + "')";
    db.insert(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });
})

router.post('/RemoveFromCart',function (req,res) {
    var userName = req.query.userName;
    var itemId = req.query.itemId;

    var query ="DELETE FROM Carts WHERE userName = '" + userName + "' AND itemId = '" + itemId + "'";
    db.insert(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });
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
    var pants = req.query.pants;
    var dresses = req.query.dresses;
    var skirts = req.query.skirts;
    var underwears = req.query.underwears;
    var query = "INSERT INTO Users VALUES ('" + userName + "', '" + password + "', '" + firstName + "', '" + lastName + "', '" + gender + "', '" + email + "', '" + phone + "', '" + birthDay + "', '" + address + "', '" + country + "', '" + securityAnswer + "', '" + lastEntry + "', '" + shirts + "', '" + pants + "', '" + dresses + "', '" + skirts + "', '" + underwears + "')";
    db.insert(query, function (answer) {
        db.insert(query, function (answer) {
            console.log('done adding user!');
            res.send(answer);
        });
    });
})

/* delete user by manager. V */
router.delete('/DeleteUser', function (req, res) {
    console.log(req.query);
    var userName = req.query.userName;
    var query = "DELETE FROM Users WHERE userName = '" + userName + "'";
    db.insert(query, function (answer) {
        console.log('successfully deleted!');
        res.send(answer);
    });
});

router.get('/LastEntry', function (req, res) {
    var userName = req.query.userName;
    var query = "SELECT lastEntry FROM Users WHERE userName = '" + userName + "'";
    db.search(query, function (result) {
        res.send(result[0].lastEntry);
        console.log(result[0].lastEntry);
    });
});

module.exports = router;