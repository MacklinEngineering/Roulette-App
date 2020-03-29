module.exports = function(app, passport, db) {

  // normal routes ===============================================================

    // Main game page =
      app.get('/', function(req, res) {
          res.render('index.ejs');
      });
   // Game page ===========================

      app.get('/game', function(req, res) {
        res.render('game.ejs');
    });

      // Owner's page =========================
      app.get('/bank', isLoggedIn, function(req, res) {
        console.log(req.user, "property")
        if(req.user.local.email === 'owner@roulette'){
          db.collection('bank').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('profile.ejs', {
              user : req.user,
              bank: result,
              messages: []
            })
          })
        }else{
          res.redirect('/game')
        }
      });


      // LOGOUT ==============================
      app.get('/logout', function(req, res) {
          req.logout();
          res.redirect('/');
      });


        //FORM: owner inputs bank amt
      app.post('/bank', (req, res) => {
        db.collection('bank').remove()            //req.body ---> bankAmt:2000000
        db.collection('bank').save({bankAmt: 1000000 , wins:0 ,loses:0}, (err, result) => {     //bank amount ---> req.body.bankAmt
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/bank')                       /// redirect to owner page
        })
      })



      // handles house's wins or losses
      app.put('/bank', (req, res) => {
        // req.body ---> betMult: 10  , betAmt: 200 , housewins: true/false
        // console.log(req.body.houseWins)
        // console.log(req.body.betMult)
        // console.log(req.body.betAmt)
          const {betMult, betAmt} = req.body     //destructuring grab [roperties and assign variables]
            if( req.body.houseWins === true){                       // if housewins: true
             db.collection('bank').updateOne({},{
                 $inc: {
                    bankAmt:betAmt,
                    wins: 1
                }
              })
              .then(function(){
                res.sendStatus(200)
              })
            }else{
                                                       // add (betAmt* betMult) to bankAmt                                                           // update win to +1
              db.collection('bank').updateOne({},{
                $inc: {

                   bankAmt: - (betAmt * betMult),
                   loses: 1
               }                                               // if housewins: false                                                  // sub (betAmt* betMult) to bankAmt                                                     // update lose to +1
            })
            .then(function(){
              res.sendStatus(200)
            })
          }

        })



                                                                                    //  if housewins: false
                                                                                    //     sub (betAmt* betMult) to bankAmt
                                                                                    //     update lose to +1


                                                                                    //redirect back /game



        // db.collection('messages').findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        //   $set: {
        //     thumbUp:req.body.thumbUp + 1
        //   }
        // }, {
        //   sort: {_id: -1},
        //   upsert: true
        // }, (err, result) => {
        //   if (err) return res.send(err)
        //   res.send(result)
        // })

      // app.delete('/messages', (req, res) => {
      //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
      //     if (err) return res.send(500, err)
      //     res.send('Message deleted!')
      //   })
      // })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

      // locally --------------------------------
          // LOGIN ===============================
          // show the login form
          app.get('/login', function(req, res) {
              res.render('login.ejs', { message: req.flash('loginMessage') });
          });

          // process the login form
          app.post('/login', passport.authenticate('local-login', {
              successRedirect : '/bank', // redirect to the secure profile section
              failureRedirect : '/login', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));

          // SIGNUP =================================
          // show the signup form
          app.get('/signup', function(req, res) {
              res.render('signup.ejs', { message: req.flash('signupMessage') });
          });

          // process the signup form
          app.post('/signup', passport.authenticate('local-signup', {
              successRedirect : '/bank', // redirect to the secure profile section
              failureRedirect : '/signup', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

      // local -----------------------------------
      app.get('/unlink/local', isLoggedIn, function(req, res) {
          var user            = req.user;
          user.local.email    = undefined;
          user.local.password = undefined;
          user.save(function(err) {
              res.redirect('/profile');
          });
      });

  }

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/');
  }
