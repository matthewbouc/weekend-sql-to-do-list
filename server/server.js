const express = require('express');
const pg = require('pg');

const app = express();
const PORT = 5000;
app.listen(PORT, () => {
    console.log('SERVER Listening on PORT', PORT)
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('server/public'));

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10
});