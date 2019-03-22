// For web server
var express = require("express"),
  path = require("path"),
  http = require("http");

// To use session
var session = require("express-session"),
  bodyParser = require("body-parser");

// To use passport
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

// For flash messge
var flash = require("connect-flash");

// For logging
var logger = require("morgan");

// express object
var app = express();

// set web server port 3000
app.set("port", process.env.PORT || 3000);

// set views directory & engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// set static files(js,css,etc) directory
app.use(express.static(path.join(__dirname, "public")));

// config session
app.use(
  session({
    secret: "secret.key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 60 seconds
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use flash message
app.use(logger("dev")); // use logging

// config LocalStrategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "passwd",
      passReqToCallback: true
    },
    function(req, username, password, done) {
      var user = {
        username: "admin",
        password: "pass"
      };

      if (username !== user.username) {
        return done(null, false, req.flash("info", "Incorrect username."));
      }
      if (password !== user.password) {
        return done(null, false, req.flash("info", "Incorrect password."));
      }
      console.log("login ok " + user.username);

      return done(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// -------------- Route  ---------------
app.get("/", function(req, res) {
  var html = "<h2> Welcome Hello Passport </h2><a href='/login'>login</a>";
  res.send(html);
});

app.get("/login", function(req, res) {
  res.render("login.ejs", { message: req.flash("info") });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/users", function(req, res) {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  var html = "<h2>  Hi ~ " + req.user.username + "</h2><a href='/logout'>Logout</a>";
  res.send(html);
});


// Start Express to listen port 
http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
