const numberButtons = document.querySelectorAll(".number-btn");
const rollButton = document.getElementById("rollButton");
const diceArea = document.getElementById("diceArea");

let selectedNumber = 4;

const colors = [
    "#ff0000", // KIRMIZI
    "#ff7b00", // TURUNCU
    "#ffff00", // SARI
    "#00ff22", // YEŞİL
    "#008cff", // MAVİ
    "#a000ff"  // MOR
];

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedNumber = Number(button.dataset.number);

        numberButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        createDiceDots(selectedNumber);
    });
});


function createDiceDots(number) {
    diceArea.innerHTML = "";

    for (let i = 0; i < number; i++) {
        const dot = document.createElement("div");

        dot.className = "dice-dot";

        diceArea.appendChild(dot);
    }
}


function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


function playClickSound() {
    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
        650,
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.08
    );
}


rollButton.addEventListener("click", () => {

    playClickSound();

    diceArea.classList.remove("rolling");

    void diceArea.offsetWidth;

    diceArea.classList.add("rolling");

    const dots = document.querySelectorAll(".dice-dot");

    dots.forEach(dot => {
        dot.style.borderColor = randomColor();
        dot.style.boxShadow =
            "0 0 10px " +
            dot.style.borderColor +
            ", 0 0 25px " +
            dot.style.borderColor;
    });

    setTimeout(() => {
        dots.forEach(dot => {
            dot.style.borderColor = randomColor();

            dot.style.boxShadow =
                "0 0 10px " +
                dot.style.borderColor +
                ", 0 0 25px " +
                dot.style.borderColor;
        });

        diceArea.classList.remove("rolling");
    }, 700);
});


createDiceDots(selectedNumber);
