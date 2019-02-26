// routes/auth-routes.js
const express      = require("express");
const authRoutes   = express.Router();
const ensureLogin  = require("connect-ensure-login");
const passport     = require("passport");
const flash        = require("connect-flash");
const Trip         = require('../models/trip');
const uploadCloud =  require('../config/cloudinary.js');

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", {hideNavBar: true, show: 'show'});
});

authRoutes.post("/signup", (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "No empty fields allowed!" });
    return;
  }

  User.findOne({username})
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists", show: 'show', hideNavBar: true});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fname,
      lname,
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
  res.render("private", {user: req.user});
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

authRoutes.get("/home", (req, res, next) => {
  if (req.user) {
    Trip.find()
    .then(trips => {
      //console.log(trips);
      res.render('home', {user: req.user, currentTrips: trips});
    })
    .catch(error => {
      next(error);
    })
  } else {
      res.redirect('/login');
  }
});

authRoutes.get('/trips/:id', (req, res, next) => {
  Trip.findOne({_id: req.params.id})
  .then(surfTrip => {
    res.render('trip', {surfTrip: surfTrip, user: req.user});
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.get('/new-trip', (req, res, next) => {
  res.render('new-trip');
});

authRoutes.post('/new-trip', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  
  //console.log(req.body);
  // CLOUDINARY CODE
  const imgPath = req.file.url;
  
  Trip.create({title: req.body.tripName, location: req.body.location, description: req.body.description, picture: imgPath, creator: req.user.username, difficulty: req.body.difficulty})
    .then(idk => {
      console.log("Inserted Successfully.");
      res.redirect('/home');
    })
    .catch(error => {
      next(error);
    })
  
});

authRoutes.post('/trips/:id',  ensureLogin.ensureLoggedIn(), (req, res, next) => {
  //MONGO STUFF
  console.log(req.user)
  Trip.update(
    {_id:req.params.id}, 
    { $push: { members: req.user.username } }
  ).then(mod => {
    //res.json({backFromSERVErandDB:'yooooo'})
    res.redirect(`back`)
  });
});

authRoutes.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('profile', {user: req.user});
});

authRoutes.get('/my-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.find({members: req.user.username})
  .then(myTrips => {
    console.log("Inserted Successfully.");
    res.render('my-trips', {myTrips, user: req.user});
  })
  .catch(error => {
    next(error);
  })
});
module.exports = authRoutes;