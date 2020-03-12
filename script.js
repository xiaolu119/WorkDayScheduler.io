function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    $("#currentDay").css("text-decoration", "underline");
    for (let i = 9; i < 18; i++) {
    
        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // create a column for hour
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + amPm(i) + '</p>');

        //create column 2 for event info
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="event" placeholder="Add your event here..."></textarea>`);        
       
        //create column 3 for the save button
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}>
        Save</button>`)
        
        // append col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // last step add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }

    function amPm(hours) {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
amPm();

// function to change event block color for past present and future
function updateColors(){
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) { 
     if ($(`#${i}`).data("time") == currentTime){
        $(`#text${i}`).addClass( "present");
    } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass( "future");
    }
}
}

setInterval(function() {
    updateColors();
}, 1000);

var saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.event').val();
    localStorage.setItem(eventId, eventText);
});
});