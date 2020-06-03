$.ajax("/data/purchasehist", {
    type: "GET"
}).then(function(data) {
    for(i = 0; i < data.purchasehist.length; i++){
        if(data.purchasehist[i].userid !== localFirstName.userid){
            console.log("Finding Matches!");
        } else {
            $("#purchaseHistInfoDisplay").append("<div class='userPurchaseDiv'><p>"+data.purchasehist[i].firstname+"</p><p>"+data.purchasehist[i].lastname+"</p><p>"+data.purchasehist[i].phone+"</p><p>"+data.purchasehist[i].address+"</p><p>"+data.purchasehist[i].email+"</p><p>"+data.purchasehist[i].purchaseday+"</p><p>"+data.purchasehist[i].price+"</p></div>");
        };
    };
});