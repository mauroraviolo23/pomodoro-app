const clock = document.querySelector(".clock");
const audioAlert = document.querySelector("audio");

const clockMins = document.querySelector(".clock-mins");
const clockSecs = document.querySelector(".clock-secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalSeconds, perc, paused, minutes, seconds;
let clockStarted = false;

startBtn.addEventListener("click", () => {
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
        minutes = +localStorage.getItem("focusTime");
    }
    else {
        minutes = +localStorage.getItem("breakTime");
    }

    seconds = minutes * 60;
    totalSeconds = minutes * 60;
    setTimeout(decrement(), 60);
    startBtn.textContent = "Clock is running";
    startBtn.disabled = true;
    startBtn.classList.add("not-clickable");
    paused = false;
    pauseBtn.disabled = false;
    pauseBtn.classList.remove("not-clickable");
    clockStarted = true;
});

function decrement() {
    clockMins.textContent = Math.floor(seconds/60);
    clockSecs.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    if (circle.classList.contains("danger")) {
        circle.classList.remove("danger");
    }
    if (seconds > 0) {
        perc = Math.ceil(((totalSeconds - seconds) / totalSeconds) * 100);
        setProgress(perc);
        seconds--;
        initial = window.setTimeout("decrement()", 1000);
        if (seconds < 10) {
            circle.classList.add("danger");
        }
    }
    else {
        minutes = 0;
        seconds = 0;
        audioAlert.play();
        let btn = localStorage.getItem("btn");
        pauseBtn.disabled = true;
        pauseBtn.classList.add("not-clickable");

        if (btn === "focus") {
            startBtn.textContent = "Start Break";
            startBtn.classList.add("break");
            startBtn.classList.remove("not-clickable");
            startBtn.disabled = false;
            localStorage.setItem("btn", "break");
        } 
        else {
            startBtn.classList.remove("break");
            startBtn.textContent = "Start Focus";
            startBtn.classList.remove("not-clickable");
            startBtn.disabled = false;
            localStorage.setItem("btn", "focus");
            clockStarted = false;
        }
    }
}

