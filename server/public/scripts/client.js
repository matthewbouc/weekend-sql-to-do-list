$(document).ready(onReady);

function onReady(){
    console.log('jq');
    taskListGET();
    $('#addTaskToList').on('click', taskListPOST);
    $('#taskDisplay').on('click', '.completeButton', handlerCompleteButton);
    $('#taskDisplay').on('click', '.deleteButton', handlerDeleteButton);
}

function displayTasksToDOM(taskArray){
    $('#taskDisplay').empty();
    for(const task of taskArray){
        $('#taskDisplay').append(`
            <tr data-id="${task.id}">
                <td><button class="completeButton" data-status="${task.completed}">${task.completed}</button></td>
                <td>${task.task}</td>
                <td><button class="deleteButton">Delete</button></td>
            </tr>`)
    }
}


function handlerCompleteButton(){
    const taskClicked = $(this).parent().parent().data('id');
    console.log(`this id is`, taskClicked);
    taskListPUT(taskClicked);
}

function handlerDeleteButton(){
    const taskClicked = $(this).parent().parent().data('id');
    taskListDELETE(taskClicked);
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


function taskListPUT(taskID){
    $.ajax({
        method: 'PUT',
        url: `taskList/${taskID}`,
        data: {
            completed: true,
        }
    }).then(response => {
        console.log(`Successful PUT request from client`, response)
        taskListGET();
    }).catch(error => {
        console.log(`Error PUT-ing on client`, error);
    });
}