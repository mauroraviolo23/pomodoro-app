const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("breakTime", breakTimeInput.value);
    if (clockStarted === false) {
        clockMins.textContent = focusTimeInput.value;
    }
});

document.querySelector(".reset").addEventListener("click", () => {
    clearTimeout(initial);
    setProgress(0);
    clockMins.textContent = focusTimeInput.value;
    clockSecs.textContent = "00";
    pauseBtn.disabled = true;
    pauseBtn.classList.add("not-clickable");
    startBtn.classList.remove("not-clickable");
    startBtn.disabled = false;
    clockStarted = false;
    setTimeout(() => {
        pauseBtn.textContent = "Pause";
        pauseBtn.classList.remove("resume");
        startBtn.classList.remove("break");
        startBtn.textContent = "Start Focus";
    }, 250);
});

pauseBtn.addEventListener("click", () => { 
    if (paused === undefined) {
        return;
    }
    if (paused) {
        paused = false;
        initial = setTimeout("decrement()", 60);
        setTimeout(() => {
            pauseBtn.textContent = "Pause";
            pauseBtn.classList.remove("resume");
            startBtn.textContent = "Clock is running";
        }, 250);
    }
    else {
        clearTimeout(initial);
        paused = true;
        setTimeout(() => {
            pauseBtn.textContent = "Resume";
            pauseBtn.classList.add("resume");
            startBtn.textContent = "Time paused";
        }, 250);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("breakTime", breakTimeInput.value);
    pauseBtn.disabled = true;
    pauseBtn.classList.add("not-clickable");
})