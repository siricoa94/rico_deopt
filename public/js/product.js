let localFirstName = JSON.parse(localStorage.getItem("user"));
console.log("local storage working: " + JSON.stringify(localFirstName));

// localStorage.setItem("price",JSON.stringify(credentails));
// let localFirstName = JSON.parse(localStorage.getItem("user"));

let localCredit = localFirstName.credit;
console.log("base credit " + localCredit);
$.ajax("/data/product", {
    type: "GET"
}).then(function(data) {
    console.log("here is your data: "+ data);
    console.log(JSON.stringify(data.product));
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
                    $("#productContainerInner").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>"+data.product[i].price+"</p><p>"+data.product[i].ammount+"</p><p>IN STOCK</p></div>").append("<button class='purchaseBtn' data-price='"+data.product[i].price+"' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
                } else {
                    $("#productContainerInner").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+"</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"'>PLACE ORDER</button>");
                };
            });
        } else {
            if(data.product[i].stock == true){
                $("#productContainerInner").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>"+data.product[i].price+"</p><p>"+data.product[i].ammount+"</p><p>IN STOCK</p></div>").append("<button class='purchaseBtn' data-price='"+data.product[i].price+"' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
                $("#productContainerInner").append("<img src='../images/"+data.product[i].productname+".png' class='productImg'>");
            } else {
                $("#productContainerInner").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+"</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>PLACE ORDER</button>");
            };
        }
    };
});
$(document).on('click',".purchaseBtn", function(event){
    let id = $(this).data("id");
    let ammountData = $(this).data("class");
    let priceData = $(this).data("price");
    console.log("dv " +priceData);
    console.log("this is the price Data! " + JSON.stringify(priceData));
    console.log("I work, here is your id: " + id + "; and ammount: "+ ammountData);
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
            console.log("Updated Credentials!");
        });
    } else if (ammountData == 1) {
        if(localCredit - priceData <= 0){
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
            }
            console.log("New Local Credents! " + JSON.stringify(newLocalCredentials));
            console.log("new Credit! "+ newCredit);
            localStorage.setItem("user",JSON.stringify(newLocalCredentials));
            let localFirstNameNew = JSON.parse(localStorage.getItem("user"));
            console.log("local storage working 2: " + JSON.stringify(localFirstNameNew));
            let newAmmount = {
                stock: 0,
                ammount: ammountData - 1
            }
            console.log("new ammount: " + newAmmount);
            $.ajax("/api/product/" + id, {
                type: "PUT",
                data: newAmmount
            }).then(e => {
                console.log("Updated Credentials!");
            });
        }
    } else {
        if(localCredit - priceData <= 0){
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
            console.log("New Local Credents! " + JSON.stringify(newLocalCredentials));
            console.log("new Credit! "+ newCredit);
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
                console.log("here is your data: "+ data);
                console.log(JSON.stringify(data.customer));
                for(i = 0; i < data.customer.length; i++){
                    if(data.customer[i].userid == localFirstName.userid){
                        let id = data.customer[i].id;
                        $.ajax("/api/customer/" + id, {
                            type: "PUT",
                            data: newLocalCredentials
                        }).then(e => {
                            console.log("Updated Credentials!");
                            location.reload();
                        });
                        
                    };
                };
            });
            $.ajax("/api/product/" + id, {
                type: "PUT",
                data: newAmmount
            }).then(e => {
                console.log("Updated Credentials!");
            });
        };
    };
    location.reload();
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
})