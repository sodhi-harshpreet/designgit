const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./supabaseClient');
require('dotenv').config();
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
require('dotenv').config();
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const uploadRoutes = require('./routes/upload');
const versionRoutes = require('./routes/versions');
const rollbackRoute = require('./routes/rollback');
const authroutes = require("./routes/authroutes");
const collaboratorsRoutes = require('./routes/collaborators');
const reporoutes = require("./routes/reporoutes");
const getRepos = require("./routes/getRepos");

app.use('/api/collaborators', collaboratorsRoutes);
app.use('/auth', authroutes); 
app.use('/api/repo', reporoutes); 

app.use('/api/upload', uploadRoutes);     
app.use('/api/versions', versionRoutes);  
app.use('/api/rollback', rollbackRoute);
app.use('/api/getRepos', getRepos);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
