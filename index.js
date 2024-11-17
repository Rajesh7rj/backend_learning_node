// require("dotenv").config();
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', (req, res) => {
    res.send('login')
  });
  
  app.get('/dashboard', (req, res) => {
    res.send('dashboard')
  });
  
  app.get('/home', (req, res) => {
    res.send('home')
  });
  


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})