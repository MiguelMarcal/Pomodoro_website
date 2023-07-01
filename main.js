// Change BG button has a "ld_btn" id
// The min Display has "work_display" id and the input has "work_input" id
// The sec Display has "pause_display" id and the input has "pause_input" id
// The start/stop btn has "timer_btn" id
// The main timer has "timer" id

let timerInterval; // Variable to store the interval ID


function bGMode() {
    bgColor = document.getElementById("ld_btn")
    if(bgColor.innerHTML === "Light Mode"){
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
        bgColor.innerHTML = "Dark Mode"
    }else{
        document.body.style.backgroundColor = "#545454"
        document.body.style.color = "white"
        bgColor.innerHTML = "Light Mode"        
    }
}

function workChange(value) {
    if (value.length > 0) {
        document.getElementById("work_display").innerHTML = value  
      } else {
        document.getElementById("work_display").innerHTML = "00" 
      } 
}

function pauseChange(value) {
    if (value.length > 0) {
        document.getElementById("pause_display").innerHTML = value  
      } else {
        document.getElementById("pause_display").innerHTML = "00" 
      }   

}

function startStop() {
    controler = document.getElementById("timer_btn")
    timer = document.getElementById("timer")
    workTime = document.getElementById("work_display")
    pauseTime = document.getElementById("pause_display")


    if (controler.innerHTML === "START"){
        controler.innerHTML = "STOP"
        timerInterval = setInterval(function() {
            // Timer logic goes here
            // Increment the timer or perform any other actions
            timer.
            console.log("Timer running...");
          }, parseInt);
    } else {
        clearInterval(timerInterval); // Clears the interval, stopping the timer
        controler.innerHTML = "START"
        timer.innerHTML = workTime.innerHTML
        timer.style.backgroundColor = "green"
        timer.style.borderradius = "2"
    }  
}