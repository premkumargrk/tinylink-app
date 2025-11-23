// import app from "./app.js";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// src/server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TinyLink modular server running on port ${PORT}`);
});