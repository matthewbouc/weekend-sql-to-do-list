$(document).ready(onReady);

function onReady(){
    console.log('jq');
    taskListGET();
    $('#addTaskToList').on('click', taskListPOST);
    $('#taskDisplay').on('click', '.completeButton', handlerCompleteButton);

    $('#taskDisplay').on('click', '.btn-danger', handlerDeleteButton);
    $('.modalHere').on('click', '.finalDelete', function(){
        const clickerID = $('.finalDelete').data('id');
        console.log('in click function listener with id', clickerID);
        taskListDELETE(clickerID);
    });
}

function displayTasksToDOM(taskArray){
    $('#taskDisplay').empty();
    for(const task of taskArray){
        let completedButton = 'Complete';
        let buttonClass = 'btn btn-success';
        console.log('status of task completeion', task.completed);
        if (task.completed == true){
            completedButton = 'Completed';
            buttonClass = 'btn btn-outline-dark';
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


function handlerCompleteButton(){
    const taskClicked = $(this).parent().parent().data('id');
    const taskStatus = $(this).data('status');
    console.log(`this id is`, taskClicked, taskStatus);
    taskListPUT(taskClicked, taskStatus);
}


function handlerDeleteButton(){
    const taskClickID = $(this).parent().parent().data('id');
    const dataTask = $(this).parent().parent().data('task');
    console.log('in handler delete.. id is:', taskClickID);
    updateModal(taskClickID, dataTask);
}


function updateModal(taskID, taskName){
    console.log('in update modal task id is', taskID);
    $('#exampleModalLabel').empty();
    $('#exampleModalLabel').append(`Task: ${taskName}`);
    $('.modalHere').empty();
    $('.modalHere').append(`
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger finalDelete" data-id="${taskID}" data-bs-dismiss="modal">DELETE</button>
    `)
}

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