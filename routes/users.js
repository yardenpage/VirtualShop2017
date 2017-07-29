var express = require('express');
var moment = require('moment');
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
    var query= "UPDATE Users SET lastEntry = '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "'" +"WHERE userName = '" + userName + "'";
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
    var address = req.query.address;
    var country = req.query.country;
    var securityAnswer = req.query.securityAnswer;
    var lastEntry = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var shirts = req.query.shirts;
    var pants = req.query.pants;
    var dresses = req.query.dresses;
    var skirts = req.query.skirts;
    var underwears = req.query.underwears;

    var query1 ="INSERT INTO Users VALUES ('" + userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '" + email + "', '"+ phone + "', '" + address + "', '"+ country + "', '"+ securityAnswer+ "', '"+ lastEntry+ "')";
    db.insert(query1 ,function (answer1){
        let shirtsF=function(){
            return new Promise(function(resolve, rej){
                if(shirts=="true") {
                    var query2 = "INSERT INTO UserCategories VALUES ('" + userName + "','"+ "shirts"+ "')";
                    db.insert(query2, function (answer2) {
                        resolve(true);
                    });
                }
                else
                {
                    resolve(true);
                }
            });

        };
        let pantsF=function() {
            return new Promise(function(resolve, rej) {
                if (pants == "true") {
                    var query3 = "INSERT INTO UserCategories VALUES ('" + userName + "','" + "pants" + "')";
                    db.insert(query3, function (answer2) {
                        resolve(true);
                    });
                }
                else
                {
                    resolve(true);
                }
            });
        };
        let dressesF=function() {
            return new Promise(function(resolve, rej) {
            if (dresses == "true") {
                var query4 = "INSERT INTO UserCategories VALUES ('" + userName + "','" + "dresses" + "')";
                db.insert(query4, function (answer2) {
                    resolve(true);
                });
            }
            else{
                resolve(true);
            }

            });
        };
        let skirtsF=function() {
            return new Promise(function(resolve, rej) {
            if (skirts == "true") {
                var query4 = "INSERT INTO UserCategories VALUES ('" + userName + "','" + "skirts" + "')";
                db.insert(query4, function (answer2) {
                    resolve(true);
                });
            }
            else
            {
                resolve(true);
            }

            });
        };
        let underwearsF=function() {
            return new Promise(function(resolve, rej) {
            if (underwears == "true") {
                var query5 = "INSERT INTO UserCategories VALUES ('" + userName + "','" + "underwears" + "')";
                db.insert(query5, function (answer2) {
                    resolve(true);
                });
            }
            else{
                resolve(true);
            }

            });
        };

        shirtsF()
            .then(function(result){
                return pantsF;
            }).then(function(result){
                return dressesF;
            }).then(function(result){
                return skirtsF;
            }).then(function(result){
                return underwearsF;
            }).then(function(){
                res.send(answer1);
            });
    });

});

/* Reset password. V */
router.post('/ForgetPassword',function (req,res) {
    var userName = req.query.userName;
    var answer = req.query.answer;

    var query = "SELECT password FROM Users WHERE userName = '" + userName  + "' AND securityAnswer = '" + answer + "'";
    db.select(query,function (answer) {
            return res.send(answer);
    });
});

/* GET past Orders of user. V */
router.post('/ShowPastOrders',function (req,res) {
    var userName = req.query.userName;
    var query ="SELECT * FROM Orders WHERE userName = '"+ userName + "'";
    db.select(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });

});

/* Add a new order. V */
router.post('/AddOrder',function (req,res) {
    var id = req.query.id;
    var userName = req.query.userName;
    var orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var shipmentDate=  req.query.shipmentDate;
    var currency=  req.query.currency;
    var query = "SELECT * FROM Carts WHERE userName = '"+ userName + "'";
    var totalAmount=0;
    db.select(query,function (result1) {
        for(var i=0; i<result1.length; i++)
            totalAmount=totalAmount+result1[i].itemPrice;
        console.log(totalAmount);
        var query ="INSERT INTO Orders VALUES ('" + id + "', '"+ userName + "', '"+ orderDate + "', '"+ shipmentDate+ "', '"+  currency+ "', '"+ totalAmount+"')";
        db.insert(query,function (answer) {
            var query2 = "DELETE FROM Carts WHERE userName = '" + userName + "'";
            db.insert(query2,function (result2) {
                console.log(result2);
                res.send(result2);
            });
            console.log(answer);

        });

    });
});

router.post('/AddToCart',function (req,res) {
    var userName = req.query.userName;
    var itemName = req.query.itemName;
    var itemId = req.query.itemId;
    var itemColor = req.query.itemColor;
    var itemSize = req.query.itemSize;
    var itemCategory = req.query.itemCategory;
    var itemPrice = req.query.itemPrice;
    var itemPicture = req.query.itemPicture;
        var query ="INSERT INTO Carts VALUES ('" + userName + "', '"+ itemId+ "', '"+itemName+ "', '"+ itemSize+ "', '"+itemColor+ "', '"+itemCategory+ "', '"+ itemPrice +"', '"+ itemPicture+"')";
        db.insert(query,function (answer) {
            console.log(answer);
            res.send(answer);
        });


});

router.post('/DisplayCart',function (req,res) {
    var userName = req.query.userName;
    var query ="SELECT * FROM Carts WHERE userName = '" + userName + "'";
    db.select(query,function (answer) {
            console.log(answer);
            res.send(answer);
    });


});

router.post('/RemoveFromCart',function (req,res) {
    var userName = req.query.userName;
    var itemId = req.query.itemId;

    var query ="DELETE FROM Carts WHERE userName = '" + userName + "' AND itemId = '" + itemId + "'";
    db.insert(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });
});


/* GET users listing. V */
router.get('/ListUsers',function (req,res) {
    var query = "SELECT * FROM Users";
    db.select(query,function (answer) {
        console.log(answer);
        res.send(answer);
    });

});

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
    var address = req.query.address;
    var country = req.query.country;
    var securityAnswer = req.query.securityAnswer;
    var lastEntry = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var shirts = req.query.shirts;
    var pants = req.query.pants;
    var dresses = req.query.dresses;
    var skirts = req.query.skirts;
    var underwears = req.query.underwears;

    var query1 ="INSERT INTO Users VALUES ('" + userName + "', '"+ password + "', '"+ firstName + "', '"+ lastName + "', '"+ gender + "', '" + email + "', '"+ phone + "', '" + address + "', '"+ country + "', '"+ securityAnswer+ "', '"+ lastEntry+ "')";
    db.insert(query1 ,function (answer1){
        if(shirts) {
            var query2 = "INSERT INTO UserCategories VALUES ('" + userName + "', shirts')";
            db.insert(query2, function (answer2) {
                res.send(answer2);
            });
        }
        if(pants) {
            var query3 = "INSERT INTO UserCategories VALUES ('" + userName + "', pants')";
            db.insert(query3, function (answer2) {
                res.send(answer2);
            });
        }
        if(dresses) {
            var query4 = "INSERT INTO UserCategories VALUES ('" + userName + "', dresses')";
            db.insert(query4, function (answer2) {
                res.send(answer2);
            });
        }
        if(skirts) {
            var query4 = "INSERT INTO UserCategories VALUES ('" + userName + "', skirts')";
            db.insert(query4, function (answer2) {
                res.send(answer2);
            });
        }
        if(underwears) {
            var query5 = "INSERT INTO UserCategories VALUES ('" + userName + "', underwears')";
            db.insert(query5, function (answer2) {
                res.send(answer2);
            });
        }
    });


});

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

router.post('/LastEntry', function (req, res) {
    var userName = req.query.userName;
    var query = "SELECT lastEntry FROM Users WHERE userName = '" + userName + "'";
    db.select(query, function (result) {
        res.send(result[0]);
    });
});

module.exports = router;