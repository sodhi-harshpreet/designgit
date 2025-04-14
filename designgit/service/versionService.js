const supabase = require('../supabaseClient');

async function saveVersion(projectId, userId, fileUrl, commitMessage) {
  const { data: versions } = await supabase
    .from('file_versions')
    .select('version_number')
    .eq('project_id', projectId);

  const newVersion = (versions?.length || 0) + 1;

  const { error } = await supabase.from('file_versions').insert({
    project_id: projectId,
    uploaded_by: userId,
    file_path: fileUrl,
    version_number: newVersion,
    commit_message: commitMessage,
    timestamp: new Date().toISOString()
  });

  if (error) throw new Error(error.message);
}

module.exports = { saveVersion };
