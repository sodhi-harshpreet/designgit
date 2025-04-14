require('dotenv').config();

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const supabaseAuth = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getUser(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = data.user;
  next();
}

router.post('/add', getUser, async (req, res) => {
  const { project_id, user_id, access_level } = req.body;

  const validLevels = ['read', 'write', 'admin'];
  if (!validLevels.includes(access_level)) {
    return res.status(400).json({ error: 'Invalid access level' });
  }

  // Check if already added
  const { data: existing } = await supabase
    .from('collaborators')
    .select('*')
    .eq('project_id', project_id)
    .eq('user_id', user_id)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: 'User is already a collaborator' });
  }

  const { data, error } = await supabase
    .from('collaborators')
    .insert([{ project_id, user_id, access_level }]);

  if (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Collaborator added', data });
});

router.get('/:project_id', getUser, async (req, res) => {
  const { project_id } = req.params;

  const { data, error } = await supabase
    .from('collaborators')
    .select('*, user:auth.users(email)')
    .eq('project_id', project_id);

  if (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
});

router.delete('/remove', getUser, async (req, res) => {
  const { project_id, user_id } = req.body;

  const { error } = await supabase
    .from('collaborators')
    .delete()
    .eq('project_id', project_id)
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Collaborator removed' });
});

module.exports = router;