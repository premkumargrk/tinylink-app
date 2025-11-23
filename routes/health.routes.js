// import { Router } from "express";

// const router = Router();

// // GET /healthz
// router.get("/healthz", (req, res) => {
//   res.status(200).json({
//     ok: true,
//     version: "1.0"
//   });
// });

// export default router;


// src/routes/health.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ ok: true, version: "1.0" });
});

module.exports = router;