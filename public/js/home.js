let localFirstName = JSON.parse(localStorage.getItem("user"));
console.log("local storage working: " + localFirstName.firstname);
let newCred = localFirstName.credit
let newID = localFirstName.userid

$.ajax("/data/customer", {
    type: "GET"
}).then(function(data) {
    console.log("here is your data: "+ data);
    console.log(JSON.stringify(data.customer));
    for(i = 0; i < data.customer.length; i++){
        if(data.customer[i].userid !== localFirstName.userid){
            console.log("Finding Matches!");
        } else {
            $("#containerHomeInner").append("<div id='userContentDiv'><p>"+data.customer[i].firstname+"</p><p>"+data.customer[i].lastname+"</p><p>"+data.customer[i].phone+"</p><p>"+data.customer[i].address+"</p><p>$"+data.customer[i].credit+"</p><p>"+data.customer[i].email+"</p><p>"+data.customer[i].userPassword+"</p></div><div><button id='updateBtn' data-id='"+data.customer[i].id+"'>update</button></div>");
        };
    };
});
$(document).on('click',"#updateBtn", function(event) {
    let id = $(this).data("id");
    console.log("this button's id: "+id);
    $("#updateContainer").append("<fieldset><legend>Credential Update</legend><input id='newFirstName' placeholder='First Name'><input id='newLastName' placeholder='Last Name'><input id='newEmailAddress' placeholder='Email Address'><input id='newPhoneNumber' placeholder='Phone Number'><input id='newStreetAddress' placeholder='Street Address'><input id='newPassword' placeholder='Password'><button id='newCredentialBtn' data-id='"+id+"'>submit</button></fieldset>");
});
$(document).on('click',"#newCredentialBtn", function(event){
    let id = $(this).data("id");
    console.log("New Credentials button's id: "+id);
    let newCredentails = {
        firstname: $("#newFirstName").val(),
        lastname: $("#newLastName").val(),
        phone: $("#newPhoneNumber").val(),
        address: $("#newStreetAddress").val(),
        credit: newCred,
        userPassword: $("#newPassword").val(),
        email: $("#newEmailAddress").val(),
        userid: newID,
    };
    localStorage.setItem("user",JSON.stringify(newCredentails));
    let localFirstName = JSON.parse(localStorage.getItem("user"));
    console.log("local storage working: " + localFirstName);
    console.log("this is namefirst "+newCredentails);
    $.ajax("/api/customer/" + id, {
        type: "PUT",
        data: newCredentails
    }).then(e => {
        console.log("Updated Credentials!");
        location.reload();
    });
});
