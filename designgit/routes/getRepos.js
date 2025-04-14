const express = require('express');
const supabase = require('../supabaseClient');
const { getUser } = require('../middleware/getUser');

const router = express.Router();

router.get('/', getUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: ownedProjects, error: ownedError } = await supabase
      .from('projects')
      .select('id, title, created_at')
      .eq('owner_id', userId);

    if (ownedError) throw ownedError;

    const { data: collaboratorEntries, error: collabError } = await supabase
      .from('collaborators')
      .select('project_id')
      .eq('user_id', userId);

    if (collabError) throw collabError;

    const collaboratorProjectIds = collaboratorEntries.map(entry => entry.project_id);

    let collaboratorProjects = [];
    if (collaboratorProjectIds.length > 0) {
      const { data: collabProjects, error: projectFetchError } = await supabase
        .from('projects')
        .select('id, title, created_at')
        .in('id', collaboratorProjectIds);

      if (projectFetchError) throw projectFetchError;

      collaboratorProjects = collabProjects;
    }
    const allProjects = [...ownedProjects, ...collaboratorProjects];

    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
