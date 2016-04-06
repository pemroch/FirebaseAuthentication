var fire = require( 'firebase' );
var firebaseRef = new Firebase( /* your firebase url */ );
var express = require( 'express' );
var app = express();
var port = process.env.PORT || 8080;

// Configuration
app.configure( function() {
  app.use( express.static( __dirname + '/public' ) );
  app.use( express.bodyParser() ); 							
});

// Routes
app.post( '/api/createAccount', function( req, res ) {
  // creates a user with email and password requested from from client from /public/App/UI/CreateAccount/createAccount.js
  firebaseRef.createUser({
    email: req.body.email,
    password: req.body.password
  }, function( error, userData ) {
    if ( error ) {
      // if unsuccessful, an error message will be returned to be displayed to the client.
      res.json({ error: error.message });
    } else {
      // if successful, a success object is retuned to the client and a new entry 
      // with the company name is added to the database under a user specific UID.
      firebaseRef.child( userData.uid ).child( 'company' ).set( req.body.company );
      res.json({ success: true });
    }
  });
});

app.post( '/api/adminReady', function( req, res ) {
  // location of the user specific information ( will contain the company name set when the user was created )
  var access = firebaseRef.child( req.body.data )
  access.once( 'value', function( dataSnapshot ) {
    // once this information is accessed an object is returned to the client with the data ( company name )
    res.json({ success: true, company: dataSnapshot.val().company });
  });  
});

//app.listen( port );
app.listen( port );
