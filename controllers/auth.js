const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs')

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

// bcrypt.compareSync('the plan text password from the user', hashedPassword)
// bcryot.compareSync returns true or false

  console.log(req.session)


//we can add any property you want to the session
// and as soon as you do that it is saved to the store

  req.session.loggedIn = true;   // we are setting our session
  req.session.username = req.body.username; //and keeping track of our user
  res.redirect('/articles');
})


//
router.post('/register', (req, res, next) => {

  // first we are going to hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // lets create a object for our db entry;
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash

  // lets put the password into the database
  User.create(userDbEntry, (err, user) => {
    console.log(user)

    // lets set up the session in here we can use the same code we created in the login
    req.session.username = user.username;
    req.session.logged   = true;
    res.redirect('/authors')
  });

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
