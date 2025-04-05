const express = require('express');
const multer = require('multer');
const supabase = require('../supabaseClient');
const { saveVersion } = require('../service/versionService');
const { getUser } = require('../middleware/getUser');
require('dotenv').config();

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') cb(null, true);
    else cb(new Error('Only SVG files are allowed'), false);
  }
});

router.post('/', getUser, upload.single('design'), async (req, res) => {
  const { projectId, commitMessage } = req.body;
  const userId = req.user.id;

  if (!req.file) return res.status(400).send('No file uploaded.');

  const { data: lastVersionData, error: fetchError } = await supabase
    .from('file_versions')
    .select('file_path')
    .eq('project_id', projectId)
    .order('version_number', { ascending: false })
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return res.status(500).json({ error: fetchError.message });
  }

  if (lastVersionData) {
    // Fetch and compare the contents
    const lastFileRes = await fetch(lastVersionData.file_path);
    const lastContent = await lastFileRes.text();
    const newContent = req.file.buffer.toString();

    if (lastContent === newContent) {
      return res.status(409).json({ error: 'No changes detected in SVG.' });
    }
  }

  // Upload new file
  const filename = `${Date.now()}-${req.file.originalname}`;
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(filename, req.file.buffer, {
      contentType: 'image/svg+xml',
      upsert: true
    });

  if (error) return res.status(500).json({ error: error.message });

  const { data: publicData } = supabase
    .storage
    .from(process.env.SUPABASE_BUCKET)
    .getPublicUrl(filename);

  try {
    await saveVersion(projectId, userId, publicData.publicUrl, commitMessage);
    res.status(200).json({ message: 'Upload successful', fileUrl: publicData.publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
