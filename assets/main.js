document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const navbar = document.querySelector(".navbar ul");

    // Toggle active class on hamburger and navbar
    hamburger.addEventListener("click", function () {
        navbar.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Optional: Close menu when any nav item is clicked
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});



// Create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.style.position = "fixed";
svg.style.top = "0";
svg.style.left = "0";
svg.style.zIndex = "-1";

// Set the background color
document.body.style.backgroundColor = "#f0f0f0";

// Create an array of shape types
const shapeTypes = ["rect", "circle", "polygon"];

// Function to generate a random color
function randomColor() {
    return `hsl(${Math.random() * 360}, 70%, 70%)`;
}

// Function to create a random shape
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

// Function to animate a shape
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

// Create and animate shapes
for (let i = 0; i < 20; i++) {
    const shape = createShape();
    svg.appendChild(shape);
    animateShape(shape);
}

// Add the SVG to the document
document.body.appendChild(svg);

// Function to handle window resize
function handleResize() {
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
}

// Add event listener for window resize
window.addEventListener("resize", handleResize);

// Initial call to set the correct size
handleResize();