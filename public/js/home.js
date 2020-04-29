$.ajax("/data/customer", {
    type: "GET"
}).then(function(data) {
    console.log("here is your data: "+ data);
    console.log(data.customer);
});