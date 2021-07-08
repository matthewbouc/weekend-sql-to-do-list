$(document).ready(onReady);

/**
 * Runs when document loads. GETs current DB and initiates listeners.
 */
function onReady(){
    //console.log('jq');
    taskListGET();
    $('#addTaskToList').on('click', taskListPOST); // Listener for add task button
    $('#taskDisplay').on('click', '.completeButton', handlerCompleteButton); //Listener for DOM complete button
    $('#taskDisplay').on('click', '.btn-danger', handlerDeleteButton); // Listener for DOM delete button
    $('.modalButtons').on('click', '.finalDelete', modalListener); // Listener for the modal DELETE button
    $('#ascDESC').on('click', taskListGETDesc); //Listener for query param.  Puts completed on top.
}


/**
 * Appends tasks and notes stored in DB to DOM - includes Complete/Completed button and delete button (triggers modal).
 * Clears texts inputs
 * @param {Array} taskArray 
 */
function displayTasksToDOM(taskArray){
    $('#taskDisplay').empty();
    for(const task of taskArray){
        let completedButton = 'Complete';
        let buttonClass = 'btn btn-success';
        console.log('status of task completion', task.completed);
        if (task.completed == true){
            completedButton = 'Completed';
            buttonClass = 'btn btn-outline-light';
        }
        $('#taskDisplay').append(`
            <tr data-id="${task.id}" data-task="${task.task}">
                <td><button class="${buttonClass} completeButton" data-status="${task.completed}">${completedButton}</button></td>
                <td>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${task.id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${task.id}" aria-expanded="false" aria-controls="collapse${task.id}">
                            ${task.task}
                        </button>
                        </h2>
                        <div id="collapse${task.id}" class="accordion-collapse collapse" aria-labelledby="heading${task.id}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            ${task.notes}
                        </div>
                        </div>
                    </div>
                </td>
                <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Delete
              </button></td>
            </tr>
        `)
    }
    $('.form-control').val('')
}

/**
 * Determine data-id value and data-status value of row clicked. Use as params in taskListPUT()
 */
function handlerCompleteButton(){
    const taskClicked = $(this).parent().parent().data('id');
    const taskStatus = $(this).data('status');
    console.log(`this id is`, taskClicked, taskStatus);
    taskListPUT(taskClicked, taskStatus);
}

/**
 * Determine data-id and data-task values of row.  Use as params for updateModal()
 */
function handlerDeleteButton(){
    const taskClickID = $(this).parent().parent().data('id');
    const dataTask = $(this).parent().parent().data('task');
    console.log('in handler delete.. id is:', taskClickID);
    updateModal(taskClickID, dataTask);
}


/**
 * Listens for click on task delete button.  Records data-id.  Runs taskListDELETE()
 */
 function modalListener(){
    const clickerID = $('.finalDelete').data('id');
    console.log('in click function listener with id', clickerID);
    taskListDELETE(clickerID);
}


/**
 * Sends DELETE request for a specific id value.  Runs taskListGET on success.
 * @param {Number} taskID 
 */
function taskListDELETE(taskID){
    $.ajax({
        method: 'DELETE',
        url: `/taskList/${taskID}`,
    }).then(response => {
        console.log(`Task deleted`, response);
        taskListGET();
    }).catch(error => {
        console.log(`error caught on client`, error);
    });
}

/**
 * Sends GET request to server.  On success runs displayTasksToDOM with returned array.
 */
function taskListGET(){
    $.ajax({
        method: 'GET',
        url: '/taskList'
    }).then(response => {
        console.log('List retrieved from db', response);
        displayTasksToDOM(response);
    }).catch(error => {
        console.log('ERROR caught on client side', error);
    });
}

/**
 * Sends GET request to server using query param, requesting the order to be changed to Descending.
 */
function taskListGETDesc(){
    $.ajax({
        method: 'GET',
        url: '/taskList?order=DESC'
    }).then(response => {
        console.log('List retrieved from db', response);
        displayTasksToDOM(response);
    }).catch(error => {
        console.log('ERROR caught on client side', error);
    });
}

/**
 * Sends POST request to server with object containing task and notes inputs along with a completed: false.
 * Runs taskListGET() on success.
 */
function taskListPOST(){
    $.ajax({
        method: "POST",
        url: '/taskList',
        data: {
            task: $('#taskInput').val(),
            notes: $('#taskNotes').val(),
            completed: false
        }
    }).then(response => {
        console.log(`Successful POST`, response);
        taskListGET();
    }).catch(error => {
        console.log(`error caught on client side`, error);
    });
}


/**
 * Sends PUT request to server to change the completed status of a specific id to the opposite
 * of what it is currently.  Runs taskListGET() on success.
 * @param {Number} taskID 
 * @param {Boolean} status 
 */
function taskListPUT(taskID, status){
    $.ajax({
        method: 'PUT',
        url: `taskList/${taskID}`,
        data: {
            completed: !status,
        }
    }).then(response => {
        console.log(`Successful PUT request from client`, response)
        taskListGET();
    }).catch(error => {
        console.log(`Error PUT-ing on client`, error);
    });
}

/**
 * Takes in taskID and taskName.  Task id is used to create a delete button on the modal that references the
 * intended delete target.  taskName is used as the header of the modal.
 * @param {Number} taskID 
 * @param {String} taskName 
 */
function updateModal(taskID, taskName){
    console.log('in update modal task id is', taskID);
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append(`${taskName}`);
    $('.modalButtons').empty();
    $('.modalButtons').append(`
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-danger finalDelete" data-id="${taskID}" data-bs-dismiss="modal">DELETE</button>
    `)
}