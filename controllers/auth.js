const express = require('express');
const router = express.Router();
const User = require('../models/users');

//first things first we need a log in view


// we are now gonna set up a basic login route
router.get('/', (req, res) => {

    res.render('auth/login.ejs', {
        message: req.session.message
    });

})

router.post('/login', (req, res) => {
  //req.session is available on every single request from the client
  //our session is availble in the following
  console.log(req.session)


//we can add any property you want to the session
// and as soon as you do that it is saved to the store

  req.session.loggedIn = true;   // we are setting our session
  req.session.username = req.body.username; //and keeping track of our user



  res.redirect('/articles');
})


//log out

router.get('/logout', (req, res) =>{

  req.session.destroy((err) =>{
    if(err) {
      res.send('errpr destroying session')
    } else {
      res.redirect('/auth')
    }
  })
})

module.exports = router;
