let localFirstName = JSON.parse(localStorage.getItem("user"));
console.log("local storage working: " + JSON.stringify(localFirstName));

// localStorage.setItem("price",JSON.stringify(credentails));
// let localFirstName = JSON.parse(localStorage.getItem("user"));

let localCredit = localFirstName.credit;
console.log("base credit " + localCredit);
$.ajax("/data/product", {
    type: "GET"
}).then(function(data) {
    // console.log("here is your data: "+ data);
    // console.log(JSON.stringify(data.product));
    for(i = 0; i < data.product.length; i++){
        let newState = {
            stock: false,
            ammount: data.product[i].ammount
        };
        if(data.product[i].ammount == 0 && data.product[i].stock == true){
            console.log("new State is: "+newState)
            $.ajax("/api/product/" + data.product[i].id, {
                type: "PUT",
                data: newState
            }).then(e => {
                if(data.product[i].stock == true){
                    $("#productContainerInner").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>Price: $"+data.product[i].price+".00</p><p>IN STOCK: "+data.product[i].ammount+"</p></div>").append("<button class='purchaseBtn' data-price='"+data.product[i].price+"' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
                    $("#productContainerInner").append("<img src='../images/"+data.product[i].productname.toLowerCase()+".png' class='productImg'>");
                } else {
                    $("#productContainerInner").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+".00</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"'>PLACE ORDER</button>");
                    $("#productContainerInner").append("<img src='../images/"+data.product[i].productname.toLowerCase()+".png'  class='productImg'>");
                };
            });
        } else {
            if(data.product[i].stock == true){
                $("#productContainerInner").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>Price: $"+data.product[i].price+".00</p><p>IN STOCK: "+data.product[i].ammount+"</p></div>").append("<button class='purchaseBtn' data-price='"+data.product[i].price+"' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
                $("#productContainerInner").append("<img src='../images/"+data.product[i].productname.toLowerCase()+".png' class='productImg'>");
            } else {
                $("#productContainerInner").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+".00</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>PLACE ORDER</button>");
                $("#productContainerInner").append("<img src='../images/"+data.product[i].productname.toLowerCase()+".png' class='productImg'>");
            };
        }
    };
});
$(document).on('click',".purchaseBtn", function(event){
    let id = $(this).data("id");
    let ammountData = $(this).data("class");
    let priceData = $(this).data("price");
    if(ammountData == 0){
        alert("Out of stock!");
        let newAmmount = {
            stock: 0,
            ammount: 0
        }
        console.log("new ammount: " + newAmmount);
        $.ajax("/api/product/" + id, {
            type: "PUT",
            data: newAmmount
        }).then(e => {
            console.log("Updated Credentials! 1");
        });
    } else if (ammountData == 1) {
        if(localCredit - priceData < 1){
            alert("Out of Money!");
        } else {
            let newCredit = localCredit - priceData;
            let newLocalCredentials = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                phone: localFirstName.phone,
                address: localFirstName.address,
                credit: newCredit,
                userPassword: localFirstName.userPassword,
                email: localFirstName.email,
                userid: localFirstName.userid
            }
            // console.log("New Local Credents! " + JSON.stringify(newLocalCredentials));
            // console.log("new Credit! "+ newCredit);
            localStorage.setItem("user",JSON.stringify(newLocalCredentials));
            let localFirstNameNew = JSON.parse(localStorage.getItem("user"));
            console.log("local storage working 2: " + JSON.stringify(localFirstNameNew));
            let newAmmount = {
                stock: 0,
                ammount: ammountData - 1
            }
            $.ajax("/data/customer", {
                type: "GET"
            }).then(function(data) {
                console.log("here is your data: "+ data);
                console.log(JSON.stringify(data.customer));
                for(i = 0; i < data.customer.length; i++){
                    if(data.customer[i].userid == localFirstName.userid){
                        let id = data.customer[i].id;
                        $.ajax("/api/customer/" + id, {
                            type: "PUT",
                            data: newLocalCredentials
                        }).then(e => {
                            console.log("Updated Credentials! 3");
                        });
                        
                    };
                };
            });
            console.log("new ammount: " + newAmmount);
            $.ajax("/api/product/" + id, {
                type: "PUT",
                data: newAmmount
            }).then(e => {
                console.log("Updated Credentials! 5");
            });
            let purchaseHistData = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                phone: localFirstName.phone,
                address: localFirstName.address,
                email: localFirstName.email,
                userid: localFirstName.userid,
                price: priceData,
                purchaseday: today
            }
            console.log("purchase HISTORY!!! "+ purchaseHistData);
            $.ajax("/api/purchasehist/", {
                type: "POST",
                data: purchaseHistData
            }).then(e => {
                console.log("Updated Credentials! 4");
            });
            let leaderboardsData = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                userid: localFirstName.userid,
                price: priceData,
            };
            $.ajax("/data/leaderboards", {
                type: "GET"
            }).then(function(data) {
                console.log("here is your data: "+ JSON.stringify(data));
                console.log(JSON.stringify(data.leaderboards));
                let comparisonArray = [];
                console.log("leaderboard ID: " + data.leaderboards);
                console.log("local ID: " + localFirstName.userid);
                console.log("leaderboard DatA: " + JSON.stringify(leaderboardsData));
                for(i=0; i < data.leaderboards.length; i++){
                    comparisonArray.push([i]);
                    console.log("comparison ARRAY!: " + comparisonArray);
                    if(data.leaderboards[i].userid === localFirstName.userid){
                        let id = data.leaderboards[i].id;
                        let newPrice = priceData + data.leaderboards[i].price; 
                        let newLeaderboardsData = {
                            firstname: localFirstName.firstname,
                            lastname: localFirstName.lastname,
                            userid: localFirstName.userid,
                            price: newPrice,
                        }
                        console.log("user found!");
                        $.ajax("/api/leaderboards/" + id, {
                            type: "PUT",
                            data: newLeaderboardsData
                        }).then(e => {
                            console.log("leaderboard Updated!");
                            location.reload();
                        });
                        break;
                    } else if (data.leaderboards[i].userid !== localFirstName.userid && data.leaderboards.length == comparisonArray.length) {
                        console.log("no user found!");
                        $.ajax("/api/leaderboards/", {
                            type: "POST",
                            data: leaderboardsData
                        }).then(e => {
                            console.log("leaderboard Updated!");
                            location.reload();
                        });
                    } else {
                        console.log("Searching!");
                    };
                };
            });
        };
    } else {
        if(localCredit - priceData < 1){
            alert("Out of Money!");
        } else {
            let newCredit = localCredit - priceData;
            let newLocalCredentials = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                phone: localFirstName.phone,
                address: localFirstName.address,
                credit: newCredit,
                userPassword: localFirstName.userPassword,
                email: localFirstName.email,
                userid: localFirstName.userid
            };
            // console.log("New Local Credents! " + JSON.stringify(newLocalCredentials));
            // console.log("new Credit! "+ newCredit);
            localStorage.setItem("user",JSON.stringify(newLocalCredentials));
            let localFirstNameNew = JSON.parse(localStorage.getItem("user"));
            console.log("local storage working 2: " + JSON.stringify(localFirstNameNew));
            let newAmmount = {
                stock: 1,
                ammount: ammountData - 1
            };
            console.log("new ammount: " + newAmmount);
            $.ajax("/data/customer", {
                type: "GET"
            }).then(function(data) {
                // console.log("here is your data: "+ data);
                // console.log(JSON.stringify(data.customer));
                for(i = 0; i < data.customer.length; i++){
                    if(data.customer[i].userid == localFirstName.userid){
                        let id = data.customer[i].id;
                        $.ajax("/api/customer/" + id, {
                            type: "PUT",
                            data: newLocalCredentials
                        }).then(e => {
                            console.log("Updated Credentials!");
                        });
                        
                    };
                };
            });
            $.ajax("/api/product/" + id, {
                type: "PUT",
                data: newAmmount
            }).then(e => {
                // console.log("Updated Credentials!");
            });
            let purchaseHistData = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                phone: localFirstName.phone,
                address: localFirstName.address,
                email: localFirstName.email,
                userid: localFirstName.userid,
                price: priceData,
                purchaseday: today
            };
            // console.log("purchase HISTORY!!! "+ JSON.stringify(purchaseHistData));
            $.ajax("/api/purchasehist/", {
                type: "POST",
                data: purchaseHistData
            }).then(e => {
                // console.log("Updated Credentials!");
            });
            let leaderboardsData = {
                firstname: localFirstName.firstname,
                lastname: localFirstName.lastname,
                userid: localFirstName.userid,
                price: priceData,
            };
            $.ajax("/data/leaderboards", {
                type: "GET"
            }).then(function(data) {
                console.log("here is your data: "+ JSON.stringify(data));
                console.log(JSON.stringify(data.leaderboards));
                let comparisonArray = [];
                console.log("leaderboard ID: " + data.leaderboards);
                console.log("local ID: " + localFirstName.userid);
                console.log("leaderboard DatA: " + JSON.stringify(leaderboardsData));
                for(i=0; i < data.leaderboards.length; i++){
                    comparisonArray.push([i]);
                    console.log("comparison ARRAY!: " + comparisonArray);
                    if(data.leaderboards[i].userid === localFirstName.userid){
                        let id = data.leaderboards[i].id;
                        let newPrice = priceData + data.leaderboards[i].price; 
                        let newLeaderboardsData = {
                            firstname: localFirstName.firstname,
                            lastname: localFirstName.lastname,
                            userid: localFirstName.userid,
                            price: newPrice,
                        }
                        console.log("user found!");
                        $.ajax("/api/leaderboards/" + id, {
                            type: "PUT",
                            data: newLeaderboardsData
                        }).then(e => {
                            console.log("leaderboard Updated!");
                            location.reload();
                        });
                        break;
                    } else if (data.leaderboards[i].userid !== localFirstName.userid && data.leaderboards.length == comparisonArray.length) {
                        console.log("no user found!");
                        $.ajax("/api/leaderboards/", {
                            type: "POST",
                            data: leaderboardsData
                        }).then(e => {
                            console.log("leaderboard Updated!");
                            location.reload();
                        });
                    } else {
                        console.log("Searching!")
                    };
                };
            });
        };
    };
});
$(document).on('click',".restockBtn", function(event){
    let id = $(this).data("id");
    let ammountData = $(this).data("class");
    console.log("I work, here is your id: " + id + " ammount: " + ammountData);
    let newAmmount = {
        stock: 1,
        ammount: 10
    }
    $.ajax("/api/product/" + id, {
        type: "PUT",
        data: newAmmount
    }).then(e => {
        console.log("Updated Credentials!");
    });
    location.reload();
});
$(document).on('click', "#logOut", function(event){
    firebase.auth().signOut();
    localStorage.clear();
    location.href="/";
});

let today = new Date();
let date = ""+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"";