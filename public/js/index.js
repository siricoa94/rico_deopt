$("#credentialBtn").on("click", e =>{
    let credentails = {
        firstname: $("#firstName").val(),
        lastname: $("#lastName").val(),
        phone: $("#phoneNumber").val(),
        address: $("#streetAddress").val(),
        credit: $("#cardNumber").val(),
        userPassword: $("#password").val(),
        email: $("#email").val(),
    };
    console.log("creds "+ JSON.stringify(credentails));
    $.ajax("/api/customer", {
        type: "POST",
        data: credentails
    }).then(e => {
        console.log("credentials entered! " + credentails);
    });
});