let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);
//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('c');
});
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['localStorageService','UserService','$scope' , '$http' , '$window',function (localStorageService,UserService,$scope, $http, $window) {
    let vm = this;
    vm.userService = UserService;

    let getHotFive = function ($window)
    {
        return new Promise(function (resolve, reject)
        {
            vm.url = "http://localhost:3000/items/Hot5Products";
            $http.get(vm.url).then(function (response) {
                vm.HotProducts = response.data;
                if (vm.HotProducts.length>0)
                {
                    resolve (true);
                }
                else reject(false);
                console.log(vm.HotProducts);
            }, function (errResponse) {
                console.error('Error while fetching products');
            });
        })
    }

    vm.getNewItems = function ($window)
    {
        getHotFive().then(function(){})
        setTimeout (function(){
            vm.url = "http://localhost:3000/items/NewProducts";
            $http.get(vm.url).then(function (response) {
                vm.NewProducts = response.data;
                console.log(vm.NewProducts);
            }, function (errResponse) {
                console.error('Error while fetching products');
            });
        },1500);
    }

    vm.Login=function()
    {
        $scope.userName="guest"
        var userInStorage =  decodeURIComponent(document.cookie);
        if(userInStorage!="")
        {
            vm.userService.isLoggedIn = true;
            vm.userName=userInStorage.substring(2,userInStorage.indexOf("="));
            $scope.userName=vm.userName;
            var date = new Date();
            var dateString = date.toString();
            dateString = dateString.substring(0, dateString.indexOf("G"));
            UserService.lastLogin = dateString;
        }
    }

    vm.addToCart = function (id, name, category, size, color, price, img) {
        alert("add to cart " + id);
        var userInStorage =  decodeURIComponent(document.cookie);
        var userName=userInStorage.substring(2,userInStorage.indexOf("="));
        var params = {
            "userName": userName,
            "itemId": id,
            "itemName": name,
            "itemColor": color,
            "itemSize": size,
            "itemCategory": category,
            "itemPrice": price,
            "itemPicture": img
        };
        $http({
            url: "http://localhost:3000/users/AddToCart",
            method: "POST",
            params:  params
        }).then(function (response) {
        });
    }

}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('logoutController', ['localStorageService','UserService','$scope' , '$window',function (localStorageService,UserService,$scope, $window) {
    let vm = this;
    vm.userService = UserService;
    vm.Logout=function()
    {
        vm.userService.isLoggedIn=false;
        localStorageService.cookie.clearAll();
        localStorageService.clearAll();
        $window.alert('User logout successfully');
        window.location.href="#/";
    }
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['localStorageService','UserService', '$location', '$window', '$http',
function(localStorageService, UserService, $location, $window, $http) {
        let self = this;
        self.user = {username: '', password: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    $window.alert('You are logged in');
                    var name = "c" + self.user.username + "=";
                    getCookie(name, $window , localStorageService , self.user.username , self.user.password);
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('login has failed');
                })
            }
        };

        self.pas = {username: '',answer: ''};
        self.restorePassword= function(){
            console.log(self.pas);
            var param={
                "userName": self.pas.username,
                "answer": self.pas.answer
            }
            $http({
                url: "http://localhost:3000/users/ForgetPassword",
                method: "POST",
                params:  param
            }).then(function (response) {
                var data = response.data;
                console.log(data);
                if (data.length > 0) {
                    alert("Your Password is: "+data[0].password);
                } else {
                    alert("Answer is Wrong");
                }
            });

        }
    }]);

function getCookie(cname , $window , localStorageService , username, password) {
    let cookie = "";
    var name = cname;
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            cookie = c.substring(name.length, c.length);
        }
    }
    if (cookie == "")
    {
        if (localStorageService.cookie.set(username, password), 2)
        {
            window.location.reload();
        }
        else
            $window.alert('cookie was failed in adding to Storage');
    }
    else
        $window.alert('cookie already added');
}
//-------------------------------------------------------------------------------------------------------------------
app.controller('registerController', ['openPageService', '$location', '$window', '$http',
    function(openPageService, $location, $window, $http) {
        let self = this;
        self.user = {userName: '', password: '', firstName: '', lastName: '', gender: '', email: '', phone: '', address: '', country: '', securityAnswer: '', shirts: '', pants: '', dresses: '', skirts: '', underwears: ''};

        self.register = function() {
            if(self.user.shirts=="")
                self.user.shirts="false";
            else
                self.user.shirts="true";
            if(self.user.pants=="")
                self.user.pants="false";
            else
                self.user.pants="true";
            if(self.user.dresses=="")
                self.user.dresses="false";
            else
                self.user.dresses="true";
            if(self.user.skirts=="")
                self.user.skirts="false";
            else
                self.user.skirts="true";
            if(self.user.underwears=="")
                self.user.underwears="false";
            else
                self.user.underwears="true";
            console.log(self.user);
            var parameters={
                "userName": self.user.userName,
                "password": self.user.password,
                "firstName":self.user.firstName,
                "lastName": self.user.lastName,
                "gender": self.user.gender,
                "email": self.user.email,
                "phone": self.user.phone,
                "address": self.user.address,
                "country": self.user.country,
                "securityAnswer": self.user.securityAnswer,
                "shirts": self.user.shirts,
                "pants": self.user.pants,
                "dresses": self.user.dresses,
                "skirts": self.user.skirts,
                "underwears": self.user.underwears
            }
            console.log(parameters);


            $http({
                url: "http://localhost:3000/users/Registration",
                method: "POST",
                params:  parameters
            }).then(function (response) {
                var data = response.data;
                console.log('2');
                if (data.rows > 0) {
                    alert("Registration success");
                    openPageService.openPage('/login');
                } else {
                    alert("There was a problem, please try again");
                }
            });
        };
    }]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('AboutController', ['$http', 'CityModel' , '$window', function($http, CityModel, $window) {

}]);

app.factory('openPageService', function ($location) {
    return {
        openPage: function (url) {
            $location.path(url);
        }
    }
});
app.controller('cartController', ['localStorageService','$http', '$window', function(localStorageService, $http, $window) {
    let vm = this;
    vm.color="all";
    vm.size="all";
    vm.isOrder=false;

    var x=Math.floor((Math.random() * 10000) + 1);
    var userInStorage =  decodeURIComponent(document.cookie);
    var userName=userInStorage.substring(2,userInStorage.indexOf("="));
    var parameters= {
        "userName": userName
    }
    vm.getUserCart = function()
    {
        $http({
            url: "http://localhost:3000/users/DisplayCart",
            method: "POST",
            params:  parameters
        }).then(function (response) {
            vm.ProductsByRec = response.data;
            var i= vm.ProductsByRec.length-1;
            vm.sum=0;
            while(i>=0){
                vm.sum = vm.sum + vm.ProductsByRec[i].itemPrice;
                i=i-1;
            }
            console.log(vm.sum);
        }, function (errResponse) {
            console.error('Error while fetching products');
        });
    }
    var parameters2= {
        "id": x,
        "userName": userName,
        "shipmentDate": new Date().toISOString().slice(0, 19).replace('T', ' '),
        "currency": "Dollar"
    }
    vm.buyCart = function () {
        $http({
            url: "http://localhost:3000/users/AddOrder",
            method: "POST",
            params: parameters2
        }).then(function (response) {
            alert("Purchasing success");
            vm.getProductsByRec();
        }, function (errResponse) {
            console.error('Error while fetching products');
        });
    }

    vm.removefromCart = function (itemId) {
        alert("remove from cart item with " + itemId);
        var userInStorage =  decodeURIComponent(document.cookie);
        var userName=userInStorage.substring(2,userInStorage.indexOf("="));
        var params = {
            "userName": userName,
            "itemId": itemId
        };
        $http({
            url: "http://localhost:3000/users/RemoveFromCart",
            method: "POST",
            params:  params
        }).then(function (response) {
            vm.getProductsByRec();
        });

    }

    vm.getProductsByRec = function()
    {
        if(vm.color=="all" && vm.size=="all"){
            vm.getUserCart();
        }
        else {
            var userInStorage = decodeURIComponent(document.cookie);
            var userName = userInStorage.substring(2, userInStorage.indexOf("="));

            var parameter = {
                "userName": userName,
                "searchColor": vm.color,
                "searchSize": vm.size
            };
            console.log(vm.color);
            console.log(vm.size);
            var urlad = "";
                if (vm.size == "all")
                    urlad = "http://localhost:3000/items/SearchProductsByColor";
                else {
                    if (vm.color == "all")
                        urlad = "http://localhost:3000/items/SearchProductsBySize";
                    else {
                        urlad = "http://localhost:3000/items/SearchProductsBySizeAndColor";
                    }
                }
                $http({
                    url: urlad,
                    method: "POST",
                    params: parameter
                }).then(function (response) {
                    vm.ProductsByRec = response.data;
                    console.log(vm.ProductsByRec);
                });

        }
    }

    vm.openWindow = function(itemId, itemName, itemCategory, itemSize, itemColor, itemPrice, imgclothe)
    {
        var Window1 =$window.open("", "DetailsWindow", "width=600, height=600");
        Window1.document.write("<head><link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheets/style.css\"></head><body><div class='details'><br><h2 class=details>Details about product with id "+ itemId+ ":</h2><br><p class=details>Item name: " + itemName +"</p>  <p class=details>Item category: "+ itemCategory + "</p> <p class=details>Item size: "+ itemSize + "</p> <p class=details> item color: " + itemColor + "</p><p class=details> item price: "+ itemPrice+"</p> <p>item picture:  <br> <img width='200px' height='200px' src="+ imgclothe+"  /></p></div></body> ");
    }
    vm.openOrderWindow=function(userName, id, orderDate, shipmentDate, currency, totalAmount)
    {
        var Window2 =$window.open("", "DetailsWindow", "width=600, height=650");
        Window2.document.write("<head><link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheets/style.css\"></head><body><div class='details'><br><h2 class=details>Details about order with id "+ id+ ":</h2><br><p class=details>Username: " + userName +"</p>  <p class=details>Order Date: "+ orderDate + "</p> <p class=details>Shipment Date: "+ shipmentDate + "</p> <p class=details> Currency: " + currency + "</p><p class=details> Total Amount: "+ totalAmount+"</p> <img src='img/shoppingBags.jpg'> </div></body> ");
    }

    vm.previousOrders = function()
    {
        vm.isOrder=true;
        $http({
            url: "http://localhost:3000/users/ShowPastOrders",
            method: "POST",
            params:  parameters
        }).then(function (response) {
            vm.PastOrders = response.data;
        }, function (errResponse) {
            console.error('Error while fetching products');
        });
    }

}]);

//-------------------------------------------------------------------------------------------------------------------
app.controller('ProductsController', ['localStorageService','UserService','$scope' , '$http' , '$window',function (localStorageService,UserService,$scope, $http, $window) {
    let vm = this;
    vm.userService = UserService;
    vm.category="all";

    let getAllProducts = function()
    {
     return new Promise(function (resolve, reject) {
     vm.url = "http://localhost:3000/items/AllProducts";
     $http.get(vm.url).then(function (response) {
         vm.ProductsByCategory = response.data;
     console.log(vm.ProductsByCategory);
     }, function (errResponse) {
     console.error('Error while fetching products');
     });
     })
    }

    vm.getRecommendedProducts = function()
    { getAllProducts().then
        setTimeout (function() {
            var userInStorage = decodeURIComponent(document.cookie);
            if (userInStorage != "") {
                vm.userService.isLoggedIn = true;
                vm.userName = userInStorage.substring(2, userInStorage.indexOf("="));
                var userName = vm.userName;
                var parameters = {"user": userName};
                $http({
                    url: "http://localhost:3000/items/RecommendedProducts",
                    method: "POST",
                    params: parameters
                }).then(function (response) {
                    var data = response.data;
                    vm.RecommendedProducts = response.data;
                });
            }
            else  $window.alert('user not found');
        },1500);
    }

    vm.getProductsByCategory = function()
    {

        var parameter = {"category": vm.category};
        if (vm.category=="all")
        {
            getAllProducts();
        }
        else{
        $http({
            url: "http://localhost:3000/items/ProductsByCategory",
            method: "POST",
            params:  parameter
        }).then(function (response) {
            vm.ProductsByCategory = response.data;
            console.log(vm.ProductsByCategory);
        });
        }
    }

    vm.addToCart = function (id, name, category, size, color, price, img) {
        alert("add to cart " + id);
        var userInStorage =  decodeURIComponent(document.cookie);
        var userName=userInStorage.substring(2,userInStorage.indexOf("="));
        var params = {
            "userName": userName,
            "itemId": id,
            "itemName": name,
            "itemColor": color,
            "itemSize": size,
            "itemCategory": category,
            "itemPrice": price,
            "itemPicture": img
        };
        $http({
            url: "http://localhost:3000/users/AddToCart",
            method: "POST",
            params:  params
        }).then(function (response) {
        });
    }

}]);
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;
    var userInStorage =  decodeURIComponent(document.cookie);
    if(userInStorage!="")
    {
        service.userName=userInStorage.substring(2,userInStorage.indexOf("="));
    }
    else{
        service.userName= "Guest";
    }
    service.login = function(user) {
        return $http.post('http://localhost:3000/users/Login', user)
            .then(function(response) {
                let token = response.data;
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.username,
                    'lastLogin' : user.lastLogin
                };
                service.userName=user.username;
                service.isLoggedIn = true;
                return Promise.resolve(response);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    return service;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "mainController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: 'registerController'
        })
        .when("/Products", {
            templateUrl : "views/Products.html",
            controller: 'ProductsController'
        })
        .when("/About", {
            templateUrl : "views/About.html",
            controller: 'AboutController'
        })
        .when("/Logout", {
            templateUrl : "views/Logout.html",
            controller: 'logoutController'
        })
        .when("/Cart", {
            templateUrl : "views/Cart.html",
            controller: 'cartController'
        })
        .otherwise({redirect: '/',
        });
}]);
//-------------------------------------------------------------------------------------------------------------------