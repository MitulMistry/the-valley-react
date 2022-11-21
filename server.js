var express = require('express'); // https://github.com/heroku/node-js-getting-started/blob/master/index.js
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 8080)); // gets port from environment or else defaults to 8080

app.use(express.static(path.join(__dirname, 'build'))); // read files from this folder

// Have all get routes send the index.html file (for client side
// routing with React Router)
app.get('/*', function (req, res) {
  // res.render('index.html');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.get('*', function (req, res) { // This wildcard method (catch-all) handles all other requests - keep on bottom
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   // res.redirect('/');
//   // res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});