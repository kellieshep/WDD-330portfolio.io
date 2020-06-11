const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 500;
canvas.height = 500;
maxRadius=40;
minRadius=2;

const colorArray = [
    '#8ea4d2',
    '#6279b8',
    '#49516f',
    '#496f5d',
    '#4c9f70'

];
const mouse = {
    x: undefined,
    y: undefined

}

// Event Listeners
window.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

})

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
// Objects
function Circle(x, y, radius,dy,dx, color) {
    this.x = x;
    this.y = y;
    this.dx=dx;
    this.dy=dy
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.velocity = {
        x: Math.random() - 0.5, // Random x value from -0.5 to 0.5
        y: Math.random() - 0.5 // Random y value from -0.5 to 0.5
    };
}
Circle.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

Object.prototype.update = function() {
    this.draw()
    if( this.x + this.radius > innerWidth || this.x -this.radius < 0){
        this.dx = this.color;
    }
    if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
        this.dy = -this.dy;
    }
    this.x += this.velocity.x ;// Move x coordinate
    this.y += this.velocity.y ;// Move y coordinate
}
// Implementation
let circles = [];
function init() {
    for (let i = 0; i < 800; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 5 + 1;
        const color = 'blue';
        circles.push(new Circle(x, y, radius, color));
    }
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate); // Create an animation loop
if (mouse.x - this.x < 50 && mouse.x - this.x > -50
    && mouse.y - this.y < 50 && mouse.y -this.y > -50 ){
    if (this.radius < maxRadius) {
        this.radius += 1;
    }
}
else if (this.radius > minRadius){
    this.radius-= 1;
}
    c.clearRect(0, 0, canvas.width, canvas.height); // Erase whole canvas
    circles.forEach(circle => {
        circle.update();
    })
}
init();
animate();