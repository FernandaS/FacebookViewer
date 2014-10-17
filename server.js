

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var port = 8887;



app.use(session({secret: 'An awesome facebook app'}));
app.use(passport.initialize());
app.use(express());
app.use(passport.session())

passport.serializeUser(function(user, done){
	done(null, user);
});



passport.use(new FacebookStrategy({
	clientID: '302643003273292',
	clientSecret: '03cb11b3424085d11f1b21408626a567',
	callbackURL: 'http://localhost:8887/auth/facebook/callback',
}, function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
 var requireAuth = function(req, res, next){
 	console.log('is authed?', req.isAuthenticated());
 	if (req.isAuthenticated()){
 	return next();
 }
 return res.redirect('/login');
}


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	failureRedirect: '/login',
	successRedirect: '/me'
}), function(req, res){
	console.log(req.session);
});

app.get('/me', function(req, res){
	if(req.user){
		res.status(200).send(JSON.stringify(req.user));
	} else {
		res.send('Please Login')
	}
});



app.listen(port, function(){
	console.log('listening on port ' + port)
});