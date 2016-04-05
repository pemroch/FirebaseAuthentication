var fire = require( 'firebase' );
var firebaseRef = new Firebase( 'https://githubsamples.firebaseio.com/' );
var express = require( 'express' );
var app = express();
var port = process.env.PORT || 8080;

//Configuration
app.configure( function() {
  app.use( express.static( __dirname + '/public' ) );
  app.use( express.bodyParser() ); 							
});

//Routes
app.post( '/api/createAccount', function( req, res ) {
  firebaseRef.createUser({
    email: req.body.email,
    password: req.body.password
  }, function( error, userData ) {
    if ( error ) {
      res.json({ error: error.message });
    } else {
      firebaseRef.child( userData.uid ).child( 'company' ).set( req.body.company );
      res.json({ success: true });
    }
  });
});

app.post( '/api/adminReady', function( req, res ) {
  var access = firebaseRef.child( req.body.data )
  access.once( 'value', function( dataSnapshot ) {
    res.json({ success: true, uid: req.body.data, company: dataSnapshot.val().company });
  });  
});

//app.listen( port );
app.listen( port );