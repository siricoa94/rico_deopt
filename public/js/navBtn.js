$(document).on('click',".navBtn", function(event){
    let id = $(this).data("id");
    console.log("this is your id " + id);
    switch (id) {
        case 'homePageBtn' :
            location.href = "/";
            break;
        case 'productsPageBtn' :
            location.href = "/products"
            break;
        case 'leaderboardPageBtn' :
            location.href = "/leaderboard"
            break;
        default:
            console.log("error");
    }
});