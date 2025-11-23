// import { Router } from "express";
// import { createShortLink } from "../controllers/link.controller.js";

// const router = Router();

// router.post("/api/links", createShortLink);

// export default router;


// src/routes/link.routes.js
const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link.controller');

router.get('/', linkController.getLinks);
router.post('/', linkController.createLink);
router.get('/:code', linkController.getLinkStats);
router.delete('/:code', linkController.deleteLink);

module.exports = router;