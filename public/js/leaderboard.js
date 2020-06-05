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
            $("#containerInner").append("<div class='even'><div class='innerRepeatingDivClass'>Rank: "+rank+"</div><div class='innerRepeatingDivClass'>Name First: "+price[i].firstname +"</div><div class='innerRepeatingDivClass'>Name Last: "+price[i].lastname +"</div><div class='innerRepeatingDivClass'>Score: "+price[i].price +"!</div></div>");
        } else if(rank == 1) {
            $("#containerInner").append("<div class='firstPlace'><div id='firstPlaceTitle'><p>FIRST PLACE</p></div><div class='innerRepeatingDivClass'>Rank: "+rank+"</div><div class='innerRepeatingDivClass'>Name First: "+price[i].firstname +"</div><div class='innerRepeatingDivClass'>Name Last: "+price[i].lastname +"</div><div class='innerRepeatingDivClass'>Score: "+price[i].price +"!</div></div>");
        } else {
            $("#containerInner").append("<div class='odd'><div class='innerRepeatingDivClass'>Rank: "+rank+"</div><div class='innerRepeatingDivClass'>Name First: "+price[i].firstname +"</div><div class='innerRepeatingDivClass'>Name Last: "+price[i].lastname +"</div><div class='innerRepeatingDivClass'>Score: "+price[i].price +"!</div></div>");
        }
        
    };
});