const express = require('express');
const taskRouter = require('./routes/taskListRouter')

const app = express();
const PORT = 5000;
app.listen(PORT, () => {
    console.log('SERVER Listening on PORT', PORT)
});

// ****** Middleware ******
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('server/public'));

// ****** Routes ******
app.use('/taskList', taskRouter);