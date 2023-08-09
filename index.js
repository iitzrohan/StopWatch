const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let millisecs = 0;

startBtn.addEventListener("click", () => {
    if (paused) {
        startBtn.textContent = "Pause"
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
    }
    else {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        startBtn.textContent = "Resume"
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    startBtn.textContent = "Start"
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    millisecs = 0;
    timeDisplay.textContent = "00:00:00:000";
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    millisecs = Math.floor((elapsedTime) % 1000);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);


    millisecs = fix(millisecs);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${millisecs}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

    function fix(unit) {
        if (unit < 10) {
            return "00" + unit;
        } else if (unit < 100) {
            return "0" + unit;
        } else {
            return unit.toString().slice(-3);
        }
    }
}