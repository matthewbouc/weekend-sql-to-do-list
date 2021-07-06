const pool = require('../modules/pool');
const express = require('express');
const taskRouter = express.Router();





/**
 * Gets and returns full list of DB ordered by completion status, then id.  Completed status can be reversed with a req.query.
 */
taskRouter.get('/', (req, res) => {
    const queryParam = req.query.order || 'ASC';
    console.log(queryParam);
    const queryText =`SELECT * FROM todo_list ORDER BY completed ${queryParam}, id;`;
    // instead of:
    // const queryParam = req.query.order || 'ASC';
    //Could do an if statement here to append to the end of queryText.  It would look something like:
    // const queryParam = req.query.order;
    // let queryText =`SELECT * FROM todo_list ORDER BY completed ${queryParam}, id`
    // if (queryParam){
    //    queryText += `${req.query.order};`
    // }else{
    //    queryText += `;`
    //}
    pool.query(queryText).then(dbResponse => {
        res.send(dbResponse.rows);
    }).catch(error => {
        console.log(`error retrieving from Database`, error);
        res.sendStatus(500);
    });
});

// taskRouter.get('/', (req, res) => {
//     const queryText =`SELECT * FROM todo_list ORDER BY completed, id;`;
//     pool.query(queryText).then(dbResponse => {
//         res.send(dbResponse.rows);
//     }).catch(error => {
//         console.log(`error retrieving from Database`, error);
//         res.sendStatus(500);
//     });
// });


/**
 * Posts new object to database containing task and note inputs and completed status of false.
 */
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

/**
 * Deletes a specific row of DB based on id value.
 */
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


/**
 * Changes the completed status of an id to !status.
 */
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