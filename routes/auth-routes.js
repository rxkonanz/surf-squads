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

authRoutes.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const profilePicture = req.file.url;
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
      password: hashPass,
      profilePicture
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

authRoutes.get('/trips/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  
  Trip.findOne({_id: req.params.id})
  .then(surfTrip => {
    var currentUserID = req.user._id;
    var theCreator = surfTrip.creator._id;
    if(String(currentUserID) == String(theCreator)){
      console.log(surfTrip);
      res.render('trip', {surfTrip: surfTrip, user: req.user, ownIt: true, joined: false});
    }
    else{
      if(surfTrip.members.includes(req.user.username)){
        res.render('trip', {surfTrip: surfTrip, user: req.user, ownIt: false, joined: true});
      }
      else {
        res.render('trip', {surfTrip: surfTrip, user: req.user, ownIt: false, joined: false});
      }
    }
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.get('/new-trip', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('new-trip');
});

authRoutes.post('/new-trip', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  
  //console.log(req.body);
  // CLOUDINARY CODE
  const imgPath = req.file.url;
  
  User.findOne({username: req.user.username})
  .then(currentUser => {
    console.log("CHEEEEECKKKK HEEEEREEEEEEEEE");
    console.log(currentUser);
    Trip.create({title: req.body.tripName, location: req.body.location, description: req.body.description, picture: imgPath, creator: currentUser, difficulty: req.body.difficulty, host: currentUser._id})
    .then(idk => {
      res.redirect('/home');
    })
    .catch(error => {
      next(error);
    })
  })
  .catch(error => {
    next(error);
  })
});

authRoutes.post('/trip/join/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.update(
    {_id:req.params.id}, 
    { $push: { members: req.user.username } }
  ).then(mod => {
    res.redirect(`back`);
  });
});

authRoutes.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('profile', {user: req.user});
});

authRoutes.get('/owned-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.find({creator: req.user})
  .then(myTrips => {
    res.render('owned-trips', {myTrips, user: req.user});
  })
  .catch(error => {
    next(error);
  })
});

authRoutes.get('/joined-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.find({members: req.user.username})
  .then(myTrips => {
    res.render('joined-trips', {myTrips, user: req.user});
  })
  .catch(error => {
    next(error);
  })
});

authRoutes.get('/surfers/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(surfer => {
    res.render('other-surfer', {surfer});
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.post('/trip/delete/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.remove({_id:req.params.id})
  .then(mod => {
    res.redirect("/home");
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.post('/trip/edit/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.findOne({_id:req.params.id})
  .then(trip => {
    res.render('edit-trip', {trip});
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.post('/edit-trip/:id', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  Trip.updateOne({_id:req.params.id}, {title: req.body.tripName, location: req.body.location, description: req.body.description, picture: imgPath, difficulty: req.body.difficulty})
  .then(response => {
    console.log("Edited Successfully");
    res.redirect('/home');
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.post('/trip/leave/:id', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  Trip.update(
    {_id:req.params.id}, 
    { $pull: { members: req.user.username } }
  ).then(mod => {
    res.redirect(`back`);
  });
});

module.exports = authRoutes;