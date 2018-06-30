//sign IN
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdTyYVZe6fPNkEcW6Vw4XryNywHFRrPlk",
    authDomain: "olx-pakistan-6a8b5.firebaseapp.com",
    databaseURL: "https://olx-pakistan-6a8b5.firebaseio.com",
    projectId: "olx-pakistan-6a8b5",
    storageBucket: "",
    messagingSenderId: "216311900869"
  };
  firebase.initializeApp(config);


  console.log('Runnign!');
  let auth = firebase.auth();

document.getElementById('sign-in').addEventListener('submit', (event) => {
    event.preventDefault(); 

    console.log('Form Submitted')
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then( res => console.log(res.user))
        .catch( error => console.log(error.message));

});

auth.onAuthStateChanged( user => {
    if( user ) {
        localStorage.setItem("user_mail",user.uid);
        window.location.href = "../dashboard.html";
    } else {
        console.log('You Logged Out!');
    }
})
