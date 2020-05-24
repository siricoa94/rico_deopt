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
$(document).on('click', "#logOut", function(event){
    firebase.auth().signOut();
    localStorage.clear();
    location.href="/";
});
$("#menuBtn").on("click", e => {
    let value = document.getElementById("navDisplayContainer").style.display;
   if (value == "initial") {
        document.getElementById("navDisplayContainer").style.display = "none";
        document.body.style.overflow = "initial";
   } else {
        document.getElementById("navDisplayContainer").style.display = "initial";
        location.href = "#navDisplayContainer";
        document.body.style.overflow = "hidden";
   }
});
$("#returnBtn").on("click", e => {
    let value = document.getElementById("navDisplayContainer").style.display;
   if (value == "initial") {
        document.getElementById("navDisplayContainer").style.display = "none";
        document.body.style.overflow = "initial";
   } else {
        document.getElementById("navDisplayContainer").style.display = "initial";
        document.body.style.overflow = "hidden";
   }
});