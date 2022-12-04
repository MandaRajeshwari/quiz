const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


var exp = require('express')  
var ap = exp()
let alert = require('alert');
ap.get('/kwizz', function(req, res){
  res.sendFile(__dirname  +  "/webpage.html")
})
ap.get('/login', function(req, res){
  res.sendFile(__dirname + "/login.html");
})
ap.get('/signup', function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

ap.get('/signupsubmit', function (req, res) {  
    db.collection('todo').add({
    name:req.query.Name,
    email:req.query.mail,
    password : req.query.password1,
    PhNo: req.query.mobileNo,
    })
    res.sendFile(__dirname + "/login.html");
})
ap.get('/loginsubmit', function(req, res){
    var flag = false;
    db.collection('todo').where('email', '==', req.query.username).where('password', '==', req.query.password).get().then(function(docs){
      docs.forEach((doc) => {
        flag = true;
        res.sendFile(__dirname + "/dashboard.html");
      })
      if(!flag){
       res.sendFile(__dirname + "/login.html");
       alert("Invalid Credentials");
      }
    })
})
ap.get('/dashboardsubmit', function(req, res){
  res.sendFile(__dirname + "/instructions.html");
})

ap.get('/subjects', function(req, res){
  res.sendFile(__dirname + "/subjects.html");
})

ap.get('/exit', function(req, res){
  res.sendFile(__dirname + "/webpage.html");
})

ap.get('/cssquiz', function(req, res){
  res.sendFile(__dirname + "/cssquiz.html");
})

ap.get('/cquiz', function(req, res){
  res.sendFile(__dirname + "/cquiz.html");
})

ap.get('/cppquiz', function(req, res){
  res.sendFile(__dirname + "/cppquiz.html");
})

ap.get('/javaquiz', function(req, res){
  res.sendFile(__dirname + "/javaquiz.html");
})

ap.get('/htmlquiz', function(req, res){
  res.sendFile(__dirname + "/htmlquiz.html");
})

ap.listen(5000, function () {  
  console.log('Example app listening on port 5000!')  
})