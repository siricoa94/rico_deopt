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
                    $("#productContainer").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>"+data.product[i].price+"</p><p>"+data.product[i].ammount+"</p><p>IN STOCK</p></div>").append("<button class='purchaseBtn' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
                } else {
                    $("#productContainer").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+"</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"'>PLACE ORDER</button>");
                };
            });
        } else {
            if(data.product[i].stock == true){
                $("#productContainer").append("<div class='productCard'><p>"+data.product[i].productname+"</p><p>"+data.product[i].price+"</p><p>"+data.product[i].ammount+"</p><p>IN STOCK</p></div>").append("<button class='purchaseBtn' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>BUY NOW</button>");
            } else {
                $("#productContainer").append("<div class='productCardOutStock'><p class='productInfo'>"+data.product[i].productname+"</p><p class='productInfo'>"+data.product[i].price+"</p><p class='productInfo'>"+data.product[i].ammount+"</p><p class='productInfo'>OUT OF STOCK</p></div>").append("<button class='restockBtn' data-id='"+data.product[i].id+"' data-class='"+data.product[i].ammount+"'>PLACE ORDER</button>");
            };
        }
    };
});
$(document).on('click',".purchaseBtn", function(event){
    let id = $(this).data("id");
    let ammountData = $(this).data("class");
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
    } else {
        let newAmmount = {
            stock: 1,
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