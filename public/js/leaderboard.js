$.ajax("/data/leaderboards", {
    type: "GET"
}).then(function(data) {
    let array = data.leaderboards;
    let price = array.slice(0);
    price.sort(function(a,b) {
        return a.price - b.price;
    });
    let newArray = price.reverse();
    for(i = 0; i < newArray.length; i ++){
        var rank = i + 1;
        if(rank%2 == 0){
            $("#containerInner").append("<div class='even'><div class='innerRepeatingDivClass'>"+rank+"</div><div class='innerRepeatingDivClass'>"+price[i].firstname +"</div><div class='innerRepeatingDivClass'>"+price[i].lastname +"</div><div class='innerRepeatingDivClass'>"+price[i].price +"</div></div>");
        } else if(rank == 1) {
            $("#containerInner").append("<div class='firstPlace'><div class='innerRepeatingDivClass'>"+rank+"</div><div class='innerRepeatingDivClass'>"+price[i].firstname +"</div><div class='innerRepeatingDivClass'>"+price[i].lastname +"</div><div class='innerRepeatingDivClass'>"+price[i].price +"</div></div>");
        } else {
            $("#containerInner").append("<div class='odd'><div class='innerRepeatingDivClass'>"+rank+"</div><div class='innerRepeatingDivClass'>"+price[i].firstname +"</div><div class='innerRepeatingDivClass'>"+price[i].lastname +"</div><div class='innerRepeatingDivClass'>"+price[i].price +"</div></div>");
        }
        
    };
});