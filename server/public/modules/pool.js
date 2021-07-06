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


module.exports(pool);