const app = require("express")();
const { uuidv4 } = require("uuid")
const fs = require("fs");

function sortArr(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function getpk(user) {
  const data = fs.readFileSync

app.get("/get/:url", (req,res) => {
  
})
