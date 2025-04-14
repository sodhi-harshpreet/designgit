const express = require('express');
const supabase = require('../supabaseClient');
const { getUser } = require('../middleware/getUser');

const router = express.Router();

router.get('/:projectId',getUser, async (req, res) => {
  const { projectId } = req.params;

  
  const { data, error } = await supabase
    .from('file_versions')
    .select('*')
    .eq('project_id', projectId)
    .order('version_number', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

module.exports = router;
