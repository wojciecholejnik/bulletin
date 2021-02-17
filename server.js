const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products.routes');
const formidable = require('express-formidable');
const uniqid = require('uniqid');


// start express server
const app = express();
const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});


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

app.use('/api', productsRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})






module.exports = server;