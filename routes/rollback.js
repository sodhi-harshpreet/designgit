const express = require('express');
const supabase = require('../supabaseClient');
const { saveVersion } = require('../service/versionService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { projectId, rollbackToUrl } = req.body;

  if (!projectId || !rollbackToUrl) {
    return res.status(400).json({ error: 'projectId and rollbackToUrl are required.' });
  }

  try {
    await saveVersion(projectId, rollbackToUrl);
    res.status(200).json({ message: 'Rollback successful. Version restored.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
