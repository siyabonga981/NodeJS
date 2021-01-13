const { request } = require("express");
const express = require("express");
let router = express.Router();

let { User } = require("../models/user.js");

var ObjectID = require("mongoose").Types.ObjectID;
var ObjectID = require('mongodb').ObjectID;
// => localhost:3000/employees/
router.get('/', (req, res) => {
  User.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving user :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving user :' + JSON.stringify(err, undefined, 2)); }
  });
});

// post user data into db
router.post("/", (req, res) => {
  var userObj = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  userObj.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Saving new User :" + JSON.parse(err, undefined, 2));
    }
  });
});

// update user data in db
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  User.findByIdAndUpdate(req.params.id, { $set: userObj }, { new: true }, (err, doc) =>{
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in updating user :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
});

// delete user data in db
router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in User Delete :" + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
