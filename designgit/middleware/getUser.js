const supabase = require('../supabaseClient');

async function getUser(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = data.user;
  next();
}

module.exports = { getUser };
