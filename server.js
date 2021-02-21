const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products.routes');
const formidable = require('express-formidable');
const uniqid = require('uniqid');
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./config/passport');

const adminEmail = 'wojciecholejnik5@gmail.com';


const app = express();

// init session mechanism
app.use(session({ secret: 'anything' }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// connect to DB
const dbURI = 'mongodb+srv://wwwojtasss:wwwojtasss@cluster0.bpoyn.mongodb.net/BulletinDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


// add middleware
app.use(cors());
app.use(formidable({uploadDir: './public/uploads/'}, [ {
  event: 'fileBegin', // on every file upload...
  action: (req, res, next, name, file) => {
    const fileName = uniqid() + '.' + file.name.split('.')[ 1 ];
    file.path = __dirname + '/public/uploads/photo_' + fileName; // ...move the file to public/uploads with unique name
  }
},
]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

// routes
app.use('/api', productsRoutes);
app.use('/auth', require('./routes/auth.routes'));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/');
  }
);
app.get('/users', function(req, res, next) {
   req.user ? res.json({
     email: req.user.emails[0].value,
     name: req.user.name.givenName,
     role: req.user.emails[0].value === adminEmail ? 'admin' : 'user',
     avatar: req.user.photos[ 0 ].value, 
   }) : res.json({
     email: null,
     name: null,
     avatar: null,
     role: 'notLogged',
   });
 });
 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
