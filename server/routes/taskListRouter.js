const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');


const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10
});

pool.on('connect', response => {
    console.log('PG connected')
});
pool.on('error', error => {
    console.log('ERROR PG', error);
});


taskRouter.get('/', (req, res) => {
    const queryText ='SELECT * FROM to_do_list;';
}).then().catch();


taskRouter.post().then().catch();


taskRouter.delete().then().catch();


taskRouter.put().then().catch();





module.exports = taskRouter;