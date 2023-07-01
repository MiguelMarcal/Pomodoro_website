// Change BG button has a "ld_btn" id
// The min Display has "work_display" id and the input has "work_input" id
// The sec Display has "pause_display" id and the input has "pause_input" id
// The start/stop btn has "timer_btn" id
// The main timer has "timer" id

let timerInterval; // Variable to store the interval ID
let stopTimer = false

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
    if (value.length > 1) {
        document.getElementById("work_display").innerHTML = value  
        document.getElementById("work_display").dataset.value = value  
        document.getElementById("timer").innerHTML = value + ":" + "00";
      } else if(value.length == 1){
        document.getElementById("work_display").innerHTML = value  
        document.getElementById("work_display").dataset.value = value  
        document.getElementById("timer").innerHTML = "0" +  value + ":" + "00";
      }
      else {
        document.getElementById("work_display").innerHTML = "00" 
        document.getElementById("work_display").dataset.value = "00"
        document.getElementById("timer").innerHTML = "00" + ":" + "00";
      } 
}

function pauseChange(value) {
    if (value.length > 1) {
        document.getElementById("pause_display").innerHTML = value  
        document.getElementById("pause_display").dataset.value = value  
      } 
      else if(value.length == 1){
        document.getElementById("pause_display").innerHTML = value  
        document.getElementById("pause_display").dataset.value = value  
        document.getElementById("timer").innerHTML = "0" +  value + ":" + "00";
      }else {
        document.getElementById("pause_display").innerHTML = "00" 
        document.getElementById("pause_display").dataset.value = "00"
      }    

}

function timer(time) {
  let remainingTime = time*60;
  return new Promise((resolve) => {
    interval = setInterval(() => {
      if (stopTimer) { // Check if stopTimer is true before updating the timer display
        clearInterval(interval);
        console.log("Timer stopped");
        resolve();
      } else {
        let minutes = (Math.floor(remainingTime / 60)).toString().padStart(2, '0'); // Get the whole minutes
        let remainingSeconds = (remainingTime % 60).toString().padStart(2, '0'); // Get the remaining seconds
        document.getElementById("timer").innerHTML = minutes + ":" + remainingSeconds;

        remainingTime -= 1;
        if (remainingTime < 0) {
          clearInterval(interval);
          console.log("Timer completed");
          resolve();
        }
      }
    }, 1000);
  });
  }
  


async function start() {
  playSound("assets/tap.mp3")
  stopTimer = false;
  workTime = document.getElementById("work_display").dataset.value;
  pauseTime = document.getElementById("pause_display").dataset.value;
  document.getElementById("start_btn").style.display = "none";
  document.getElementById("stop_btn").style.display = "block";

  count = 1;

  while (!stopTimer) {
    if (count % 2 == 0) {
      await timer(parseInt(pauseTime));
      await playSound("assets/fart.mp3");
      popup("Timer to work Bitch");
    } else {
      await timer(parseInt(workTime));
      await playSound("assets/fart.mp3");
      popup("You can chill now");
    }
    count += 1;
    console.log(count);
  }
}

function stop() {
  playSound("assets/tap.mp3")
  document.getElementById("start_btn").style.display = "block";
  document.getElementById("stop_btn").style.display = "none";
  stopTimer = true;
  clearInterval(interval); // Clears the interval, stopping the timer
  document.getElementById("timer").innerHTML = document.getElementById("work_display").dataset.value;
}

function popup(text){
  if(!confirm(text)){
    stop()
  }
}

function playSound(sound) {
  return new Promise((resolve) => {
    var audio = new Audio(sound);
    audio.addEventListener("ended", resolve);
    audio.play();
  });
}