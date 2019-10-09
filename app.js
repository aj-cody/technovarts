var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    User = require("./models/user"),
    mongoose    = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

mongoose.connect("mongodb://localhost:27017/food_kart", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "Once again Rusty wins the cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/buyer", function (req, res) {
    res.render("buyer/home");
});

//=======================
// AUTHENTICATION ROUTES
//=======================

//show register form
app.get("/buyer/register", function (req, res) {
    res.render("buyer/register");
});
//handle sign up logic
app.post("/buyer/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("buyer/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/buyer");
        })
    });
});

//show login form
app.get("/buyer/login", function (req, res) {
    res.render("buyer/login");
});
//handling login logic
app.post("/buyer/login", passport.authenticate("local", {
    successRedirect: "/buyer",
    failureRedirect: "/buyer/login"
}), function (req, res) {
});

//logout route
app.get("/buyer/logout", function (req, res) {
    req.logout();
    res.redirect("/buyer");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/buyer/login");
}


app.listen("2020", function () {
    console.log("Server has started!")
});
