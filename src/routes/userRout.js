const { json } = require('body-parser');
const express = require('express');
const { onSnapshot } = require('../config/firebase-config');
const User = require("../config/firebase-config");
const middleware = require("../middleware/index");
// const firebase= require("firebase")


const router = express.Router();




router.post('/login', middleware.decodeToken, (req, res) => {
  const decodeValue = req.user;
  console.log(decodeValue)
})


router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data)
    const dataa = await User.add(data);

    return res.send({
      message: "user created",
      result: dataa
    })
  } catch (error) {
    console.log(error.message);

  }
})

router.delete("/delete/:doc", async (req, res) => {
  try {
    const data = await User.doc(req.params.doc).delete();

    return res.send({
      message: "user deleted",
      result: data

    })

  } catch (error) {
    return res.send({
      message: "unable to delete  DATA try again",
      error
    })

  }


})



// .doc("Q32b2s93Xt9xgOkM7uH6")

router.get("/getall", async (req, res) => {
  const users = []
  await User.get()
    .then(getData => {
      getData.docs.forEach(doc => {
        users.push(doc.data());
      })
    }).catch(error => {
      console.log(error.message);
    })
  console.log(users)
  return res.send({
    message: "getting all users",
    users
  });

});


router.patch("/update/:doc", async (req, res) => {

  try {
    const docc = req.params.doc;
    const result = await User.doc(docc).set({
      "name": req.body.name,
      "age": req.body.age
    })
    console.log(result)
    return res.send({
      message: "user updated ",
      result

    })

  } catch (error) {
    console.log(error.message)
  }

})

// pagination

router.get("/users", async (req, res) => {

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit)
  const users = [];
  const data = await User.get()
    .then(Snapshot => {
      Snapshot.docs.forEach(doc => {
        users.push(doc.data())
        console.log(doc.data());
      })
    }).catch((error) => {
      console.log(error.message);
    })
  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const results = {}
  if (endIndex < users.length) {
    results.next = {
      page: page + 1,
      limit: limit

    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit

    }
  }

  results.results = users.slice(startIndex, endIndex)
  return res.send({
    message: `limite is ${limit}`,
    results

  })

})




module.exports = router;