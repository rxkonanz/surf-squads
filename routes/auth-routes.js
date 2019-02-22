// routes/auth-routes.js
const express      = require("express");
const authRoutes   = express.Router();
const ensureLogin  = require("connect-ensure-login");
const passport     = require("passport");
const flash        = require("connect-flash");
const Trip         = require('../models/trip');

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", {hideNavBar: true, show: 'show'});
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "No empty fields allowed!" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists", show: 'show', hideNavBar: true});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong", show: 'show'});
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error"), hideNavBar: true, show:'show'});
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

authRoutes.get("/home", (req, res, next) => {
  if (req.user) {
    Trip.find()
    .then(trips => {
      console.log(trips);
      res.render('home', { user: req.user, currentTrips: trips});
    })
    .catch(error => {
      next(error);
    })
  } else {
      res.redirect('/login');
  }
});

authRoutes.get('/trips/:id', (req, res, next) => {
  console.log(req.params.id);
  Trip.findOne({_id: req.params.id})
  .then(surfTrip => {
    res.render('trip', {surfTrip})
    console.log(movie);
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.get('/new-trip', (req, res, next) => {
  res.render('new-trip');
});

authRoutes.post('/new-trip', (req, res, next) => {
  console.log(req.body);
  Trip.create({title: req.body.tripName, location: req.body.location, picture: req.body.imageLink, creator: "robkonanz@gmail.com", difficulty: req.body.difficulty})
  .then(idk => {
    console.log("Inserted Successfully.");
    res.redirect('/home');
  })
  .catch(error => {
    next(error);
  })
});

module.exports = authRoutes;