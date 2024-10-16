document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const navbar = document.querySelector(".navbar ul");

    hamburger.addEventListener("click", function () {
        navbar.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});


const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.style.position = "fixed";
svg.style.top = "0";
svg.style.left = "0";
svg.style.zIndex = "-1";

document.body.style.backgroundColor = "#f0f0f0";

const shapeTypes = ["rect", "circle", "polygon"];

function randomColor() {
    return `hsl(${Math.random() * 360}, 70%, 70%)`;
}

function createShape() {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", shapeTypes[Math.floor(Math.random() * shapeTypes.length)]);
    const size = Math.random() * 50 + 10;

    shape.setAttribute("fill", randomColor());
    shape.setAttribute("opacity", "0.5");

    if (shape.tagName === "rect") {
        shape.setAttribute("width", size);
        shape.setAttribute("height", size);
    } else if (shape.tagName === "circle") {
        shape.setAttribute("r", size / 2);
    } else if (shape.tagName === "polygon") {
        const points = [];
        for (let i = 0; i < 3; i++) {
            points.push(`${Math.random() * size},${Math.random() * size}`);
        }
        shape.setAttribute("points", points.join(" "));
    }

    return shape;
}

function animateShape(shape) {
    const duration = Math.random() * 10 + 5;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    shape.style.transform = `translate(${x}px, ${y}px)`;
    shape.style.transition = `transform ${duration}s ease-in-out`;

    setTimeout(() => {
        animateShape(shape);
    }, duration * 1000);
}


for (let i = 0; i < 20; i++) {
    const shape = createShape();
    svg.appendChild(shape);
    animateShape(shape);
}

// Add the SVG to the document
document.body.appendChild(svg);

function handleResize() {
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
}

window.addEventListener("resize", handleResize);


handleResize();
AOS.init();

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = question.classList.contains('active');


        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });

        question.classList.toggle('active');
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    video.innerHTML = '<source src="assets/video/18069232-hd_1280_720_24fps.mp4" type="video/mp4">';
    video.load();
    video.play();
    const player = new Plyr('#player', {
        controls: [
            'play-large',
            // 'restart',
            // 'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            // 'duration',
            'mute', // Toggle mute
            'volume', // Volume control
            // 'captions', // Toggle captions
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            // 'airplay', // Airplay (currently Safari only)
            // 'fullscreen' // Toggle fullscreen
        ],
        settings: ['captions', 'quality', 'speed', 'loop']
    });
    player.poster = 'https://bgremover.realbrain.cc/assets/images/bgremover.png';
});


function getAverageBrightness(videoElement) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw a small portion of the video to the canvas for performance
    context.drawImage(videoElement, 0, 0, 10, 10); // Sampling 10x10 pixels
    var data = context.getImageData(0, 0, 10, 10).data;

    var totalBrightness = 0;
    for (var i = 0; i < data.length; i += 4) {
        // Calculate the perceived brightness (same formula)
        var brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        totalBrightness += brightness;
    }

    // Get the average brightness
    return totalBrightness / (data.length / 4);
}

function adjustTextColor(videoElement, textElement) {
    const brightness = getAverageBrightness(videoElement);

    if (brightness > 128) {
        textElement.style.color = 'black';
    } else {
        textElement.style.color = 'white';
    }
}

const video = document.getElementById('background-video');
const heroContent = document.querySelector('.hero-content');

video.addEventListener('loadeddata', function () {
    adjustTextColor(video, heroContent);
});

video.addEventListener('timeupdate', function () {
    adjustTextColor(video, heroContent);
});