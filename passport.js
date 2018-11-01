app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login'
    }));

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// used to deserialize the user
  passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE id = '+id, (err, rows) => {
      done(err, rows[0]);
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    // find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
    function (req, email, password, done) {
      if(!email || !password) {
        return done(null, false);
      }
      salt = salt+''+password;
      const encPass = crypto.createHash('sha1').update(salt).digest('hex');
      const dbpass = rows[0].password;
      if(!(dbpass == encPass)) {
        return done(null, false);
      }
      connection.query(`INSERT INTO users (email, password) values (${email}, ${encPass})`)
      return done(null, rows[0]);
    }
  ));

  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form
      connection.query('SELECT * FROM users WHERE email = ' + email, (err, rows) => {
        if(err) return done(err);
        // if the user is found but the password is wrong
        if(!rows.length) return done(null, false, req.flash('loginMessage', 'No user found.'));
        if(!(rows[0].password == password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password!')); // req.flash is the way to set flashdata using connect-flash
        // all is well, return successful user
        return done(null, rows[0]);
      });
  }));
