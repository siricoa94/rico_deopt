var firebaseConfig = {
    apiKey: "AIzaSyD4iKY2SgbthAyCskwmfl4o4pr5YWuofeI",
    authDomain: "rico-depot.firebaseapp.com",
    databaseURL: "https://rico-depot.firebaseio.com",
    projectId: "rico-depot",
    storageBucket: "rico-depot.appspot.com",
    messagingSenderId: "361604551990",
    appId: "1:361604551990:web:554597bf3626ad29c64f97"
};
  // Initialize Firebase
firebaseInit = firebase.initializeApp(firebaseConfig);

firebaseInit.auth().onAuthStateChanged( user => {
    if (user) {
        console.log("user signed in: " + user.uid);
        if(window.location.pathname == "/"){
            location.href = "/home";
        } else {
            console.log(user);
        };
    } else if (window.location.pathname !== "/") {
        console.log("Your not supposed to be here");
        location.href = "/";
    } else {
        console.log("no user");
    }
});