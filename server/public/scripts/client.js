$(document).ready(onReady);

function onReady(){
    console.log('jq');
}




function taskListGET(){
    $.ajax({
        method: 'GET',
        url: '/taskList'
    })
    .then(res => {
        console.log('List retrieved from db', res);
        // **********ADD FUNCTION TO APPEND TO DOM**************
    })
    .catch(err => {
        console.log('ERROR caught on client side', err);
    }
        )

}


function taskListPOST(){


}


function taskListDELETE(){


}


function taskListPUT(){

    
}