// import express from "express";
// import healthRoutes from "./routes/health.routes.js";
// import linkRoutes from "./routes/link.routes.js";
// import example from './routes/example.js';

// const app = express();

// app.use(express.json());

// // Health Check Route
// app.use("/", healthRoutes);
// app.use("/",linkRoutes);
// app.use("/api", example);

// export default app;

// src/app.js
// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// // Import Routes
// const linkRoutes = require('./routes/link.routes');
// const healthRoutes = require('./routes/health.routes');
// const redirectController = require('./controllers/redirect.controller');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// // API Routes
// app.use('/healthz', healthRoutes);
// app.use('/api/links', linkRoutes);

// // Redirect Route (Root Level)
// app.get('/:code', redirectController.redirectToUrl);

// // SPA Fallback (For React-like routing on frontend)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// module.exports = app;

// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Routes
const linkRoutes = require('./routes/link.routes');
const healthRoutes = require('./routes/health.routes');
const redirectController = require('./controllers/redirect.controller');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/healthz', healthRoutes);
app.use('/api/links', linkRoutes);

// Redirect Route (Root Level)
app.get('/:code', redirectController.redirectToUrl);

// --- SPA Fallback (THE FIX IS HERE) ---
// We changed '*' to /(.*)/ because the new Express router crashes on '*'
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join( __dirname, 'public', 'index.html'));
});

module.exports = app;