let timerInterval; // Variable to store the interval ID
let stopTimer = false;

function bGMode() {
  bgColor = document.getElementById("ld_btn");
  if (bgColor.innerHTML === "Light Mode") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    bgColor.innerHTML = "Dark Mode";
  } else {
    document.body.style.backgroundColor = "#545454";
    document.body.style.color = "white";
    bgColor.innerHTML = "Light Mode";
  }
}

function workChange(value) {
  work_display = document.getElementById("work_display");
  timer = document.getElementById("timer");
  if (value.length > 1) {
    work_display.innerHTML = value;
    work_display.dataset.value = value;
    timer.innerHTML = value + ":" + "00";
  } else if (value.length == 1) {
    work_display.innerHTML = value;
    work_display.dataset.value = value;
    timer.innerHTML = "0" + value + ":" + "00";
  } else {
    work_display.innerHTML = "00";
    work_display.dataset.value = "00";
    timer.innerHTML = "00" + ":" + "00";
  }
}

function pauseChange(value) {
  pause_display = document.getElementById("pause_display");
  if (value.length > 1) {
    pause_display.innerHTML = value;
    pause_display.dataset.value = value;
  } else if (value.length == 1) {
    pause_display.innerHTML = value;
    pause_display.dataset.value = value;
  } else {
    pause_display.innerHTML = "00";
    pause_display.dataset.value = "00";
  }
}

function startTimer(time) {
  let remainingTime = time * 60;
  return new Promise((resolve) => {
    interval = setInterval(() => {
      if (stopTimer) {
        // Check if stopTimer is true before updating the timer display
        clearInterval(interval);
        console.log("Timer stopped");
        resolve();
      } else {
        let minutes = Math.floor(remainingTime / 60)
          .toString()
          .padStart(2, "0"); // Get the whole minutes
        let remainingSeconds = (remainingTime % 60).toString().padStart(2, "0"); // Get the remaining seconds
        document.getElementById("timer").innerHTML =
          minutes + ":" + remainingSeconds;
        document.title = minutes + ":" + remainingSeconds;
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
  playSound("assets/tap.mp3");
  stopTimer = false;
  workTime = document.getElementById("work_display").dataset.value;
  pauseTime = document.getElementById("pause_display").dataset.value;
  document.getElementById("start_btn").style.display = "none";
  document.getElementById("stop_btn").style.display = "block";
  timer = document.getElementById("timer");
  count = 1;
  timer.classList.add("border-success");
  while (!stopTimer) {
    if (count % 2 == 0) {
      await startTimer(parseInt(pauseTime));
      await playSound("assets/work.mp3");
      await showDialog();

      document.getElementById("custom-popup").style.display = "none";
      timer.classList.toggle("border-warning");
      timer.classList.toggle("border-success");
    } else {
      await startTimer(parseInt(workTime));
      await playSound("assets/pause.mp3");
      await showDialog();

      document.getElementById("custom-popup").style.display = "none";
      timer.classList.toggle("border-warning");
      timer.classList.toggle("border-success");
    }
    count += 1;
    console.log(count);
  }
  timer.classList.remove(
    timer.classList.contains("border-warning")
      ? "border-warning"
      : "border-success"
  );
}

function stop() {
  playSound("assets/tap.mp3");
  document.getElementById("start_btn").style.display = "block";
  document.getElementById("stop_btn").style.display = "none";
  stopTimer = true;
  clearInterval(interval); // Clears the interval, stopping the timer
  document.title = "Pomodoro Work";
  timer.classList.remove(
    timer.classList.contains("border-warning")
      ? "border-warning"
      : "border-success"
  );
}

function showDialog() {
  return new Promise(function (resolve) {
    document.getElementById("custom-popup").style.display = "block";

    document.getElementById("popup").addEventListener("click", function () {
      resolve();
    });
  });
}

function playSound(sound) {
  return new Promise((resolve) => {
    var audio = new Audio(sound);
    audio.addEventListener("ended", resolve);
    audio.play();
  });
}
