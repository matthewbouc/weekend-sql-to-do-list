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
    const queryText ='SELECT * FROM todo_list;';
    pool.query(queryText).then(dbResponse => {
        res.send(dbResponse.rows);
    }).catch(error => {
        console.log(`error retrieving from Database`, error);
        res.sendStatus(500);
    });
});


taskRouter.post('/', (req, res) => {
    const newTask = req.body
    const values = [newTask.task, newTask.completed]
    const queryText = `INSERT INTO todo_list (task, completed) VALUES ($1, $2);`;
    pool.query(queryText, values).then(dbResponse => {
        console.log(`POST successful`, dbResponse);
        res.sendStatus(201);
    }).catch(error => {
        console.log(`error posting to DB`, error);
    });
})


taskRouter.delete()


taskRouter.put()





module.exports = taskRouter;