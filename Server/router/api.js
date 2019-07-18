const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Task = require("../model/Task");

router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        User.create(req.body).then(user => {
          res.send({ status: true });
          console.log("Ви успішно зареєстровані");
        });
      } else {
        res.send({ status: false });
        console.error("Пошта вже зареєстрована");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  User.findOne(req.body)
    .then(user => {
      console.log(user);
      if (user) {
        res.send(user);
      } else {
        res.send(user);
        console.log("Ви не зареєстровані");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/create", (req, res) => {
  Task.create(req.body)
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/getTasks", (req, res) => {
  Task.find({ ownerId: req.body._id })
    .populate("ownerId")
    .exec((err, arr1) => {
      console.log(arr1);
      console.log(err);
      Task.find({ userEmailsWithAccess: { $eq: req.body.email } })
        .populate("ownerId")
        .exec((err, arr2) => {
          console.log(arr2);
          console.log(err);
          res.send(arr1.concat(arr2));
        });
    });
});

router.delete("/deleteTask/:id", (req, res) => {
  Task.deleteOne()
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.put("/editTask/:id", (req, res) => {
  console.log(req.body);
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Task.findOne({ _id: req.params.id })
        .then(task => {
          res.send(task);
        })
        .catch(err => {
          res.send("error: " + err);
        });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.put("/addUserWithAccess/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  Task.findOne({ _id: req.params.id })
    .then(task => {
      task.userEmailsWithAccess.push(req.body.email);
      Task.findByIdAndUpdate({ _id: req.params.id }, task)
        .then(() => {
          Task.findOne({ _id: req.params.id })
            .then(task => {
              res.send(task);
            })
            .catch(err => {
              res.send("error: " + err);
            });
        })
        .catch(err => {
          res.send("error: " + err);
        });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
