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
    const queryText ='SELECT * FROM todo_list ORDER BY "completed";';
    pool.query(queryText).then(dbResponse => {
        res.send(dbResponse.rows);
    }).catch(error => {
        console.log(`error retrieving from Database`, error);
        res.sendStatus(500);
    });
});


taskRouter.post('/', (req, res) => {
    const newTask = req.body
    const values = [newTask.task, newTask.notes, newTask.completed]
    const queryText = `INSERT INTO todo_list (task, notes, completed) VALUES ($1, $2, $3);`;
    pool.query(queryText, values).then(dbResponse => {
        console.log(`POST successful`, dbResponse);
        res.sendStatus(201);
    }).catch(error => {
        console.log(`error posting to DB`, error);
    });
})


taskRouter.delete('/:id', (req, res) => {
    const taskID = req.params.id;
    const queryText = `DELETE FROM todo_list WHERE id=$1;`;
    pool.query(queryText, [taskID]).then(dbResponse => {
        console.log(`deleted task`, dbResponse);
        res.sendStatus(200);
    }).catch(error => {
        console.log(`Could not delete your task - server`, error);
        res.sendStatus(500);
    });
});


taskRouter.put('/:id', (req, res) => {
    const taskID = req.params.id;
    const completeStatus = req.body.completed;
    const queryText = `UPDATE todo_list SET "completed"=$1 WHERE id=$2;`
    pool.query(queryText, [completeStatus, taskID]).then(dbResponse => {
        console.log(`Updated todo_list Complete Status`, dbResponse);
        res.sendStatus(202);
    }).catch(error => {
        console.log(`ERROR UPDATING COMPLETE STATUS`, error);
    });
});





module.exports = taskRouter;