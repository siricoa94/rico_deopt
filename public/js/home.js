$.ajax("/data/customer", {
    type: "GET"
}).then(function(data) {
    console.log("here is your data: "+ data);
    console.log(JSON.stringify(data.customer));
    for(i = 0; i < data.customer.length; i++){
        $("#container").append("<div><button id='updateBtn' data-id='"+data.customer[i].id+"'>update</button></div>");
    };
});
let credentails = {
    firstname: $("#firstName").val(),
    lastname: $("#lastName").val(),
    phone: $("#phoneNumber").val(),
    address: $("#streetAddress").val(),
    credit: $("#cardNumber").val(),
    userPassword: $("#password").val(),
    email: $("#email").val(),
};
$("#credentialBtn").on("click", e =>{
    $.ajax("/api/customer", {
        type: "POST",
        data: credentails
    }).then(e => {
        console.log("credentials entered! " + credentails);
    });
});
$(document).on('click',"#updateBtn", function(event) {
    let newCredentails = {
        firstname: $("#firstName").val(),
        lastname: $("#lastName").val(),
        phone: $("#phoneNumber").val(),
        address: $("#streetAddress").val(),
        credit: $("#cardNumber").val(),
        userPassword: $("#password").val(),
        email: $("#email").val(),
    };
    let id = $(this).data("id");
    console.log("this button's id: "+id);
    console.log("this is namefirst "+newCredentails);
    $.ajax("/api/customer/" + id, {
        type: "PUT",
        data: newCredentails
    }).then(e => {
        console.log("Updated Credentials!");
    });
});