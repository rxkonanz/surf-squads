const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error"), hideNavBar: true, show:'show'});
});

module.exports = router;