// src/controllers/redirect.controller.js
const pool = require('../config/db');

exports.redirectToUrl = async (req, res, next) => {
  const { code } = req.params;
  
  // Ignore static assets if they slip through
  if (code.includes('.')) return next();

  try {
    const result = await pool.query('SELECT * FROM links WHERE code = $1', [code]);
    
    if (result.rows.length === 0) {
        // If not found in DB, pass to next middleware (which serves index.html for SPA)
        return next(); 
    }

    const link = result.rows[0];

    // Async click increment
    pool.query('UPDATE links SET clicks = clicks + 1, last_clicked_at = NOW() WHERE code = $1', [code]);

    res.redirect(302, link.url);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};