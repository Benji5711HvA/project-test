const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
 
const uri = process.env.MONGODB_URI;

const users = [
    {
        username: "Benji5711",
        password: "asdfghjkl"
    }
];

app.use(express.static('static'));




app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})

app.get("/", home)
app.get("/detail", toonDetail)

app.get("/register", showRegister)
app.post("/register", handleRegister)

app.get("/login", showLogin)
app.post("/login", handleLogin)

app.get("/dashboard", dashboard)



function home(req, res) {
    res.send('Hello world')
}

function toonDetail(req, res) {
    let movie = {
        title: "Shawshank!!!!!!!!",
        description: "Dit is een film. Hallo",
    };

    res.render("detail", { data: movie });
}


function showRegister(req, res) {
  res.render("pages/register");
}


function handleRegister(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password
  });

  console.log(users);

  res.redirect("/login");
}


function showLogin(req, res) {
  res.render("pages/login");
}


function handleLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(function(u) {
    return u.username === username;
  });

  if (user && user.password === password) {
    res.redirect("/dashboard");
  } else {
    res.send("Login mislukt");
  }
}


function dashboard(req, res) {
  res.send("Welkom op je dashboard");
}