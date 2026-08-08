// EKY DICE - Ana JavaScript

const numberButtons = document.querySelectorAll(".number-btn");
const rollButton = document.getElementById("rollButton");
const diceDots = document.getElementById("diceDots");

let selectedNumber = 4;
let isRolling = false;

const colors = [
    {
        name: "SARI",
        color: "#ffff00"
    },
    {
        name: "MOR",
        color: "#bf00ff"
    },
    {
        name: "KIRMIZI",
        color: "#ff0000"
    },
    {
        name: "TURUNCU",
        color: "#ff7a00"
    },
    {
        name: "MAVİ",
        color: "#008cff"
    },
    {
        name: "YEŞİL",
        color: "#00ff22"
    }
];

// Zarın içindeki noktaları oluştur
function createDots(number) {
    diceDots.innerHTML = "";
    diceDots.dataset.count = number;

    for (let i = 0; i < number; i++) {
        const dot = document.createElement("div");
        dot.className = "dice-dot";

        diceDots.appendChild(dot);
    }
}

// Seçilen sayıyı değiştir
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (isRolling) {
            return;
        }

        selectedNumber = Number(button.dataset.number);

        numberButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        createDots(selectedNumber);
    });
});

// Tık sesi oluştur
function playClickSound() {
    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
        return;
    }

    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
        900,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        300,
        audioContext.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.08);
}

// Rastgele renk seç
function getRandomColor() {
    const randomIndex = Math.floor(
        Math.random() * colors.length
    );

    return colors[randomIndex];
}

// Noktaların rengini değiştir
function setDotsColor(color) {
    const dots = document.querySelectorAll(".dice-dot");

    dots.forEach(dot => {
        dot.style.color = color;
        dot.style.background = color;

        dot.style.boxShadow = `
            0 0 8px ${color},
            0 0 20px ${color},
            0 0 35px ${color}
        `;
    });
}

// Yuvarlakları hareket ettir
function moveDotsRandomly() {
    const dots = document.querySelectorAll(".dice-dot");

    dots.forEach(dot => {
        const x = 25 + Math.random() * 50;
        const y = 25 + Math.random() * 50;

        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
    });
}

// Se
