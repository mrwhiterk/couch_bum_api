const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const passport = require('../config/passport');
const config = require('../config/config');
const { User, Skill, Listing } = require('../models/index');

router.post('/signup', (req, res) => {
  if (req.body.email && req.body.password) {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        User.create(newUser).then(user => {
          if (user) {
            var payload = {
              id: newUser.id,
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token,
              id: user.id,
            });
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        if (user.password === req.body.password) {
          var payload = {
            id: user.id,
          };
          var token = jwt.encode(payload, config.jwtSecret);
          res.json({
            token: token,
            id: user.id,
          });
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// get all users
router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

// get all users with skills
router.get('/getTravelers', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

router.get('/getMySkills/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.json(user.skills || {});
  });
});

router.get('/getListings/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.json(user.listings);
  });
});

router.get('/getUserInfo/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    const { email, username, bio, image } = user;
    let userInfo = {
      email,
      username,
      bio,
      image,
    };
    res.json(userInfo);
  });
});

router.get('/getEditFields/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    const { username, bio, image } = user;
    let userInfo = {
      username,
      bio,
      image,
    };
    res.json(userInfo);
  });
});

router.put('/updateProfile/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    const { username, bio, image } = req.body;

    user.username = username;
    user.bio = bio;
    user.image = image;

    user.save((err, team) => {
      if (err) console.log(err);
      res.json(user);
    });
  });
});

router.put('/removeSkillFromUser/:id/skill/:skillId', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    user.skills = user.skills.filter(skill => skill.id != req.params.skillId);

    user.save((err, team) => {
      if (err) console.log(err);
      res.json(user);
    });
  });
});

router.put('/removeListingFromUser/:id/listing/:listingId', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    user.listings = user.listings.filter(
      listing => listing.id != req.params.listingId
    );

    user.save((err, team) => {
      if (err) console.log(err);
      res.json(user);
    });
  });
});

router.put('/addSkillToUser/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    user.skills.push(req.body);

    user.save((err, team) => {
      if (err) console.log(err);
      res.json(user);
    });
  });
});

// get all hosts
router.get('/hosts', (req, res) => {
  User.find({ formType: 0 }).then(users => {
    res.json(users);
  });
});

// get all guests
router.get('/guests', (req, res) => {
  User.find({ formType: 1 }).then(users => {
    res.json(users);
  });
});

// get all users that are both guests and hosts
router.get('/both', (req, res) => {
  User.find({ formType: 2 }).then(users => {
    res.json(users);
  });
});

// add skill to user
router.post('/:userId/addSkill', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    Skill.create(req.body).then(skill => {
      user.skills.push(skill);

      user.save((err, user) => {
        res.json(user);
      });
    });
  });
});

// add listing to user
router.post('/addListingToUser/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    if (req.body.availability === 'yes') {
      req.body.availability = true;
    } else {
      req.body.availability = false;
    }

    Listing.create(req.body).then(listing => {
      user.listings.push(listing);

      user.save((err, user) => {
        res.json(user);
      });
    });
  });
});

// find user listing and edit by listing id
router.put('/:userId/editListing/:listingId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    const { imageUrls, address, availability, notes } = req.body;

    let listing = user.listings.find(item => item.id === req.params.listingId);

    listing.imageUrls = imageUrls;
    listing.address = address;
    listing.availability = availability;
    listing.notes = notes;

    user.save((err, booking) => {
      res.json(booking);
    });
  });
});

// get all listings
router.get('/listings', (req, res) => {
  User.find({}).then(users => {
    const allListings = [];

    users.forEach(user => {
      user.listings.forEach(listing => {
        allListings.push(listing);
      });
    });

    res.json(allListings);
  });
});

// get listing owner by listing id
router.get('/getListingOwner/:id', (req, res) => {
  User.find({}).then(users => {
    let listingOwner = {};

    users.forEach(user => {
      user.listings.forEach(listing => {
        if (listing.id === req.params.id) {
          listingOwner = user;
        }
      });
    });

    res.json(listingOwner);
  });
});

// user listing show
router.get('/getUserListing/:id', (req, res) => {
  User.find({}).then(users => {
    let showListing = {};

    users.forEach(user => {
      user.listings.forEach(listing => {
        if (listing.id === req.params.id) {
          showListing = listing;
        }
      });
    });

    res.json(showListing);
  });
});

// remove skill from user
router.delete('/:userId/removeSkill/:skillId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    user.skills = user.skills.filter(item => item.id != req.params.skillId);

    user.save((err, user) => {
      res.json(user);
    });
  });
});

// remove listing from user
router.delete('/:userId/removeListing/:listingId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(user => {
    user.listings = user.listings.filter(
      item => item.id != req.params.listingId
    );

    user.save((err, user) => {
      res.json(user);
    });
  });
});

// user show by id
router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.json(user);
  });
});

// user show by email
router.get('/findByEmail/:email', (req, res) => {
  User.findOne({ email: req.params.email }).then(user => {
    res.json(user);
  });
});

module.exports = router;
