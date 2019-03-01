// routes/auth-routes.js
const express      = require("express");
const authRoutes   = express.Router();
const ensureLogin  = require("connect-ensure-login");
const passport     = require("passport");
const flash        = require("connect-flash");
const Trip         = require('../models/trip');
const uploadCloud =  require('../config/cloudinary.js');
const nodemailer = require('nodemailer');

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
      res.render('home', {user: req.user, currentTrips: trips.reverse()});
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
    var tripMembers = surfTrip.members;


    console.log("THESE ARE THE TWO THAT I AM COMPARING MFCKER");
    console.log(tripMembers);
    console.log(JSON.stringify(req.user));
    //console.log(tripMembers[0]==JSON.stringify(req.user));
    // console.log(JSON.stringify(tripMembers[0]));
    // console.log(JSON.stringify(req.user));

    if(tripMembers.length==0){
      var isEmpty = true;
    }
    else{
      var isEmpty = false;
    }

    if(String(currentUserID) == String(theCreator)){
      var ownIt = true;
    }
    else {
      var ownIt = false;
    }
    if(tripMembers.includes(JSON.stringify(req.user))){
      var joined = true;
    }
    else {
      var joined = false;
    }

    for(var i = 0; i<tripMembers.length; i++){
      var currentMember = tripMembers[i];
      if(currentMember.username == req.user.username){
        var joined = true;
        break;
      }
      var joined = false;
    }

    res.render('trip', {surfTrip, user: req.user, ownIt, joined, isEmpty});
  })
  .catch(error => {
    console.log(error);
  })
});

authRoutes.get('/new-trip', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('new-trip');
});

authRoutes.post('/new-trip', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  // CLOUDINARY CODE
  const imgPath = req.file.url;
  User.findOne({username: req.user.username})
  .then(currentUser => {
    Trip.create({title: req.body.tripName, location: req.body.location, description: req.body.description, picture: imgPath, creator: currentUser, difficulty: req.body.difficulty, airbnbLink: req.body.airbnbLink, beds:req.body.beds})
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
    { $push: { members: req.user } }
  ).then(mod => {
    res.redirect(`back`);
  });
});

authRoutes.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('profile', {user: req.user});
});

authRoutes.get('/my-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {

  Trip.find({creator: req.user})
  .then(ownedTrips => {
    var iOwn = false;
    if(ownedTrips.length>0){
      iOwn = true;
    }
    Trip.find({members: req.user})
    .then(joinedTrips => {
      var iJoined = false;
      if(joinedTrips.length>0){
        iJoined = true;
      }
      res.render('my-trips', {ownedTrips, joinedTrips, iOwn, iJoined});
    })
    .catch(error => {
      next(error);
    })
  })
  .catch(error => {
    next(error);
  })

});


authRoutes.get('/surfers/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(surfer => {
    console.log("THESE ARE THE TWO TO COMPARE");
    if(String(surfer._id)==String(req.user._id)){
      res.render('other-surfer', {surfer, myself: true});
    }
    else {
      res.render('other-surfer', {surfer, myself: false});
    }
    
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
    { $pull: { members: req.user } }
  ).then(mod => {
    res.redirect(`back`);
  });
});

authRoutes.get('/send-message/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(user => {
    res.render('send-message', {user});
  })
});

authRoutes.post('/send-message', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'robkonanz@gmail.com',
      pass: process.env.GMAILPASS
    }
  });
  
  var mailOptions = {
    from: req.body.recipient,
    to: 'robkonanz@gmail.com',
    subject: req.body.subject,
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect("/home");
  console.log(req.body);
});

module.exports = authRoutes;