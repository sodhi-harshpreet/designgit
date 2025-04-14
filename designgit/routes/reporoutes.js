const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const { getUser } = require('../middleware/getUser');

router.post('/', getUser, async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: 'Project title is required' });

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        owner_id: userId,
        title
      }
    ])
    .select() // returns the inserted row

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: 'Project created successfully', project: data[0] });
});

module.exports = router;
