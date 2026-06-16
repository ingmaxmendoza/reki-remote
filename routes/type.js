const express = require('express');
const { typeText } = require('../lib/input');

const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || text.length === 0) {
    return res.status(400).json({ error: 'text is required' });
  }
  try {
    await typeText(text);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
