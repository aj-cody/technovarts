var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    User = require("./models/user"),
    mongoose    = require("mongoose"),
    seedDB = require("./seed"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

var indexRoutes = require("./routes/index"),
    buyerRoutes = require("./routes/buyer"),
    sellerRoutes = require("./routes/seller");

mongoose.connect("mongodb://localhost:27017/food_kart", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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

app.use(indexRoutes);
app.use("/buyer", buyerRoutes);
app.use(sellerRoutes);

app.listen("2020", function () {
    console.log("Server has started!")
});
