const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');

require('./db/db');

// set up our session
// we set up our sessions as middleware

app.use(session({
  secret: 'this is a random secret string that you make up',
  //resave is a property that we want to set to false typically because we dont
  // want to force save something we don't want

  resave: false, // only save when this session object has been modified

  saveUninitialized: false // this is useful for login sessions
  // we only want to save when we modify the session
}))

// Set up middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

//custom middleware to check sessions

app.use((req, res, next) => {
  //click to see if they are logged
  // calling next will send them to the route they were going to
  // so one of your controllers

  //look at the request object for information about where it is coming from
  next()
  //if they are not logged in, you can redirect them wherever you want
})



const authorsController = require('./controllers/authors.js');
const articlesController = require('./controllers/articles.js');
const userController    = require('./controllers/auth.js');

// set up controller routes
app.use('/authors', authorsController);
app.use('/articles', articlesController);
app.use('/auth', userController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
