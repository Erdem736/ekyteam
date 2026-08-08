const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple"
];

let selectedNumber = 4;
let rolling = false;

const diceArea = document.getElementById("diceArea");
const numberButtons = document.querySelectorAll(".number-btn");
const rollButton = document.getElementById("rollButton");


/* =========================
   YUVARLAKLARI OLUŞTUR
========================= */

function createCircles() {

    diceArea.innerHTML = "";

    const circles = [];

    for (let i = 0; i < selectedNumber; i++) {

        const circle = document.createElement("div");

        circle.className = "result-circle";

        diceArea.appendChild(circle);

        circles.push(circle);
    }

    positionCircles(circles);
}


/* =========================
   YUVARLAKLARI DAİRENİN
   BOYUTUNA GÖRE YERLEŞTİR
========================= */

function positionCircles(circles) {

    const size = diceArea.clientWidth;

    let circleSize;

    if (selectedNumber === 1) {
        circleSize = size * 0.25;
    } else if (selectedNumber === 2) {
        circleSize = size * 0.22;
    } else if (selectedNumber === 3) {
        circleSize = size * 0.20;
    } else if (selectedNumber === 4) {
        circleSize = size * 0.19;
    } else if (selectedNumber === 5) {
        circleSize = size * 0.17;
    } else {
        circleSize = size * 0.16;
    }

    circleSize = Math.max(45, circleSize);

    const center = size / 2;

    const radius = size * 0.27;

    circles.forEach((circle, index) => {

        circle.style.width = circleSize + "px";
        circle.style.height = circleSize + "px";

        let angle;

        if (selectedNumber === 1) {
            angle = 0;
        } else {
            angle =
                (Math.PI * 2 * index / selectedNumber)
                - Math.PI / 2;
        }

        const x =
            center +
            Math.cos(angle) * radius;

        const y =
            center +
            Math.sin(angle) * radius;

        circle.style.left = x + "px";
        circle.style.top = y + "px";
    });
}


/* =========================
   RASTGELE RENK
========================= */

function randomColor() {

    const randomIndex =
        Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}


/* =========================
   TIK SESİ
========================= */

function playClickSound() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) {
        return;
    }

    const audioContext = new AudioContext();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        900,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        250,
        audioContext.currentTime + 0.06
    );

    gain.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.07
    );
}


/* =========================
   SAYI SEÇME
========================= */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) {
            return;
        }

        selectedNumber =
