// import { createLinkSchema } from "../utils/validators.js";
// import { createShortLinkService } from "../services/link.service.js";

// export async function createShortLink(req, res, next) {
//   try {
//     const body = await createLinkSchema.validate(req.body);

//     const newLink = await createShortLinkService(body);

//     return res.status(201).json(newLink);

//   } catch (err) {
//     if (err.status) {
//       return res.status(err.status).json({ error: err.message });
//     }
//     next(err);
//   }
// }


// src/controllers/link.controller.js
const pool = require('../config/db');
const { validateCode, generateCode } = require('../utils/validators');

// GET /api/links
exports.getLinks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/links
exports.createLink = async (req, res) => {
  const { url, code } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  let shortCode = code || generateCode();

  if (!validateCode(shortCode)) {
    return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });
  }

  try {
    // Check duplicate
    const existing = await pool.query('SELECT code FROM links WHERE code = $1', [shortCode]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Code already in use' });
    }

    // Insert
    const result = await pool.query(
      'INSERT INTO links (url, code) VALUES ($1, $2) RETURNING *',
      [url, shortCode]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// GET /api/links/:code (Stats)
exports.getLinkStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links WHERE code = $1', [req.params.code]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Link not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

// DELETE /api/links/:code
exports.deleteLink = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM links WHERE code = $1 RETURNING *', [req.params.code]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Link not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};