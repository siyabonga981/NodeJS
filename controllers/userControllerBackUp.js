const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types;

var { User } = require("../models/user");


router.get("/:id", (req, res) => {
//   console.log(JSON.parse(req.params.id), "Request");

  User.find((err, docs) => {
    if (!err) {
    //   console.log(docs);
    //   let foundUser;

    //   for (let i = 0; i < docs.length; i++) {
    //     if (docs[i]["email"] == req.params.id) {
    //       foundUser = docs[i];
    //       break;
    //     }
    //   }

    //   if(foundUser) {
    //       res.send(foundUser);
    //   } else {
    //     return res.status(400).send(`No record with given id : ${req.params.id}`)
    //   }

    res.send(docs);
      
    } else {
      console.log(
        "Error in Retriving Users :" + JSON.stringify(err, undefined, 2)
      );
    }
  });

});

router.post("/", (req, res) => {
  var userObj = new User({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  userObj.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in User Save :" + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  User.findByIdAndUpdate(
    req.params.id,
    { $set: userObj },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in User Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
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
