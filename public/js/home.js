$.ajax("/data/customer", {
    type: "GET"
}).then(function(data) {
    console.log("here is your data: "+ data);
    console.log(JSON.stringify(data.customer));
    for(i = 0; i < data.customer.length; i++){
        $("#container").append("<div><button id='updateBtn' data-id='"+data.customer[i].id+"'>update</button></div>");
    };
});
$(document).on('click',"#updateBtn", function(event) {
    let id = $(this).data("id");
    console.log("this button's id: "+id);
    $("#updateContainer").append("<fieldset><legend>Credential Update</legend><input id='newFirstName' placeholder='First Name'><input id='newLastName' placeholder='Last Name'><input id='newEmailAddress' placeholder='Email Address'><input id='newPhoneNumber' placeholder='Phone Number'><input id='newStreetAddress' placeholder='Street Address'><input id='newCardNumber' placeholder='Card Number'><input id='newPassword' placeholder='Password'><button id='newCredentialBtn' data-id='"+id+"'>submit</button></fieldset>");
});
$(document).on('click',"#newCredentialBtn", function(event){
    let id = $(this).data("id");
    console.log("New Credentials button's id: "+id);
    let newCredentails = {
        firstname: $("#newFirstName").val(),
        lastname: $("#newLastName").val(),
        phone: $("#newPhoneNumber").val(),
        address: $("#newStreetAddress").val(),
        credit: $("#newCardNumber").val(),
        userPassword: $("#newPassword").val(),
        email: $("#newEmailAddress").val(),
    };
    console.log("this is namefirst "+newCredentails);
    $.ajax("/api/customer/" + id, {
        type: "PUT",
        data: newCredentails
    }).then(e => {
        console.log("Updated Credentials!");
        location.reload();
    });
});
