const express = require('express');
const { mediaAction } = require('../lib/input');

const router = express.Router();

router.post('/:action', async (req, res) => {
  try {
    await mediaAction(req.params.action);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
