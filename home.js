const app = require("express")()
const { v4 } = require("uuid")
const fs = require("fs");
const EasyAES = require("easy-aes");
const axios = require("axios")

function sortArr(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function getpk(user) {
  const data = fs.readFileSync("./users.json").toString();
  return data[user]
}

function updatepk(user) {
  const data = fs.readFileSync("./users.json").toString();
  data[user] = Array(15).fill(0).map(value => v4()).join("")
  return data
}
  

app.get("/get/:user/:url", (req,res) => {
  updatepk(req.params.user);
  const pk = getpk(req.params.user);
  const aes = new EasyAES(pk);
  
  let sorted = Object.fromEntries(sortArr(Object.entries(req.query)))
  sorted = Object.fromEntries(
    Object.entries(sorted)
      .map(data => {
        return data.map(entry => aes.decrypt(String(entry)))
      })
   )
  
  const out = "?" + new URLSearchParams(sorted).toString();
  res.send(out)
  
})
