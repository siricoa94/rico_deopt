$("#credentialBtn").on("click", e => {
    e.preventDefault();
    let auth = firebase.auth();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let phoneNumber = $("#phoneNumber").val();
    let streetAddress = $("#streetAddress").val();
    let creditAmmount = 10000;
    let userPasswordVal = $("#password").val();
    let emailVal = $("#email").val();
    let promise = auth.createUserWithEmailAndPassword(emailVal,userPasswordVal);
    promise
    .catch(e => console.log(e.message)).then(function(){
        let credentails = {
            firstname: firstName,
            lastname: lastName,
            phone: phoneNumber,
            address: streetAddress,
            credit: creditAmmount,
            userPassword: userPasswordVal,
            email: emailVal,
            userid: firebase.auth().currentUser.uid,
        };
        localStorage.setItem("user",JSON.stringify(credentails));
        let localFirstName = JSON.parse(localStorage.getItem("user"));
        console.log("local storage working: " + localFirstName.firstname);
        console.log("creds "+ JSON.stringify(credentails));
        $.ajax("/api/customer", {
            type: "POST",
            data: credentails
        }).then(e => {
            console.log("credentials entered! " + credentails);
            location.href="/home"
        });
    });  
});
$("#signIn").on("click", e => {
    e.preventDefault();
    localStorage.clear();
    var email = $("#emailLogIn").val();
    var password = $("#passwordLogIn").val();
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise
    .catch(e => console.log(e.message)).then(function(){
        $.ajax("/data/customer", {
            type: "GET"
        }).then(function(data) {
            console.log("here is your data: "+ data);
            console.log(JSON.stringify(data.customer));
            for(i = 0; i < data.customer.length; i++){
                if(data.customer[i].userid == firebase.auth().currentUser.uid){
                    let credentials = {
                        firstname: data.customer[i].firstname,
                        lastname: data.customer[i].lastname,
                        phone: data.customer[i].phone,
                        address: data.customer[i].address,
                        credit: data.customer[i].credit,
                        userPassword: data.customer[i].userPassword,
                        email: data.customer[i].email,
                        userid: firebase.auth().currentUser.uid
                    };
                    localStorage.setItem("user",JSON.stringify(credentials));
                    let localFirstName = JSON.parse(localStorage.getItem("user"));
                    console.log("local storage working: " + localFirstName.firstname);
                    console.log("creds "+ JSON.stringify(credentials));
                };
            };
        });
        location.href = "/products"
    });
    
});
$("#firstTimer").on("click", e => {
    console.log("first timer")
    document.getElementById("gettingStartedDiv").style.display = "initial";
    document.getElementById("beenHereBeforeDiv").style.display = "none";
    location.href ="#gettingStartedContainer"
});
$("#secondTimer").on("click", e => {
    console.log("second timer")
    document.getElementById("beenHereBeforeDiv").style.display = "initial";
    document.getElementById("gettingStartedDiv").style.display = "none";
    location.href ="#beenHereBeforeDiv"
});
$(".topBtn").on("click", e => {
    location.href="#welcomeDiv";
    // document.getElementById("gettingStartedDiv").style.display = "none";
    // document.getElementById("beenHereBeforeDiv").style.display = "none";
});
$(document).on('click', "#logOut", function(event){
    firebase.auth().signOut();
    localStorage.clear();
    location.href="/";
})