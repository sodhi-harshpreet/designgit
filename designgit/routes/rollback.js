const express = require('express');
const supabase = require('../supabaseClient');
const { saveVersion } = require('../service/versionService');
const { getUser } = require('../middleware/getUser');

const router = express.Router();

router.post('/', getUser, async (req, res) => {
  const { projectId, versionNumber } = req.body;
  const userId = req.user.id;

  //Get the version to roll back to
  const { data: oldVersion, error } = await supabase
    .from('file_versions')
    .select('*')
    .eq('project_id', projectId)
    .eq('version_number', versionNumber)
    .single();

  if (error || !oldVersion) {
    return res.status(404).json({ error: 'Version not found.' });
  }

  const fileRes = await fetch(oldVersion.file_path);
  const buffer = await fileRes.arrayBuffer();

  const filename = `${Date.now()}-rollback-${versionNumber}.svg`; // Or use original extension
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(filename, Buffer.from(buffer), {
      contentType: 'image/svg+xml',
      upsert: true,
    });

  if (uploadError) {
    return res.status(500).json({ error: uploadError.message });
  }

  const { data: publicUrl } = supabase
    .storage
    .from(process.env.SUPABASE_BUCKET)
    .getPublicUrl(filename);

  await saveVersion(projectId, userId, publicUrl.publicUrl, `Rollback to version ${versionNumber}`);

  res.status(200).json({ message: 'Rollback successful.', fileUrl: publicUrl.publicUrl });
});

module.exports = router;
