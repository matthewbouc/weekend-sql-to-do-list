$(document).ready(onReady);

function onReady(){
    console.log('jq');
}




function taskListGET(){
    $.ajax({
        method: 'GET',
        url: '/taskList'
    })
    .then(response => {
        console.log('List retrieved from db', response);
        // **********ADD FUNCTION TO APPEND TO DOM**************
    })
    .catch(error => {
        console.log('ERROR caught on client side', error);
    }
        )

}


function taskListPOST(){
    $.ajax({
        method: "POST",
        url: '/taskList',
        data: {} // **********ADD DATA - FROM DOM TO DB**************
    })
    .then(response => {
        console.log(`Successful POST`, response);
        taskListGET(); // Update DOM after posting new data to DOM
    })
    .catch(error => {
        console.log(`error caught on client side`, error);
    })
}


function taskListDELETE(){


}


function taskListPUT(){

    
}