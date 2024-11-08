// document.addEventListener("DOMContentLoaded", function () {
//     const hamburger = document.querySelector(".hamburger-menu");
//     const navbar = document.querySelector(".navbar ul");

//     hamburger.addEventListener("click", function () {
//         navbar.classList.toggle("active");
//         hamburger.classList.toggle("active");
//     });

//     document.querySelectorAll('.navbar ul li a').forEach(link => {
//         link.addEventListener('click', function () {
//             navbar.classList.remove('active');
//             hamburger.classList.remove('active');
//         });
//     });
// });


// Create SVG Element for Background Shapes
const svgBackground = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgBackground.setAttribute("width", "100%");
svgBackground.setAttribute("height", "100%");
svgBackground.style.position = "fixed";
svgBackground.style.top = "0";
svgBackground.style.left = "0";
svgBackground.style.zIndex = "-1";

// Set a neutral background color for contrast
document.body.style.backgroundColor = "#f0f0f0";

const MAX_SHAPES = 50;
const shapes = [];
const shapeTypes = ["rect", "circle", "polygon"]; // Define shape types

// Function to generate random HSL colors for a soft color palette
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 85%)`;
}

// Create and style each shape element
function createShape() {
  const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  const shape = document.createElementNS("http://www.w3.org/2000/svg", shapeType);
  const size = Math.random() * 40 + 15; // Random size for variety
  shape.setAttribute("fill", getRandomColor());
  shape.setAttribute("opacity", "0.6");

  if (shapeType === "rect") {
    shape.setAttribute("width", size);
    shape.setAttribute("height", size);
  } else if (shapeType === "circle") {
    shape.setAttribute("r", size / 2);
  } else if (shapeType === "polygon") {
    const points = Array.from({ length: 3 }, () => `${Math.random() * size},${Math.random() * size}`);
    shape.setAttribute("points", points.join(" "));
  }

  return shape;
}

// Function to animate shapes across the screen
function animateShape(shape) {
  const animationDuration = Math.random() * 10 + 5; // Duration between 5 and 15 seconds
  const targetX = Math.random() * window.innerWidth;
  const targetY = Math.random() * window.innerHeight;

  shape.style.transform = `translate(${targetX}px, ${targetY}px)`;
  shape.style.transition = `transform ${animationDuration}s ease-in-out`;

  setTimeout(() => animateShape(shape), animationDuration * 1000); // Recursively animate
}

// Generate and append shapes
for (let i = 0; i < MAX_SHAPES; i++) {
  const shape = createShape();
  shapes.push(shape);
  svgBackground.appendChild(shape);
}

// Initiate animation for each shape
shapes.forEach(animateShape);

// Add SVG background to the document
document.body.appendChild(svgBackground);

// Update SVG dimensions on window resize
function handleResize() {
  svgBackground.setAttribute("width", window.innerWidth);
  svgBackground.setAttribute("height", window.innerHeight);
}

window.addEventListener("resize", handleResize);
handleResize();

// Initialize animations on scroll (requires AOS library)
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

const removePreloadColors = () => {
    const heroTitle = document.querySelector(".hero-content h1");
    const heroParagraph = document.querySelector(".hero-content p");

    heroTitle.classList.remove("preload-head-color")
    heroParagraph.classList.remove("preload-head-color")
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    video.innerHTML = '<source src="assets/video/18069232-hd_1280_720_24fps.mp4" type="video/mp4">';
    video.load();
    video.addEventListener('loadeddata', () => {
        video.play();
        removePreloadColors();
    });

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