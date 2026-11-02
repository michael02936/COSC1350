
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 1. Draw a trapezoid
function drawTrapezoid(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 120, y);
    ctx.lineTo(x + 95, y + 70);
    ctx.lineTo(x + 25, y + 70);
    ctx.closePath();
    ctx.fillStyle = "purple";
    ctx.fill();
}

// 2. Draw a red diamond
function drawDiamond(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = "red";
    ctx.fillRect(-35, -35, 70, 70);
    ctx.restore();
}

// 3. Draw a zigzag line
function drawZigzag(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30, y + 30);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x + 90, y + 30);
    ctx.lineTo(x + 120, y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.stroke();
}

// 4. Draw a spiral with 100 line segments
function drawSpiral(x, y) {
    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {
        let angle = i * 0.15;
        let radius = i * 0.8;

        let pointX = x + Math.cos(angle) * radius;
        let pointY = y + Math.sin(angle) * radius;

        if (i === 0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
    }

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 5. Draw a yellow star
function drawStar(x, y, outerRadius) {
    ctx.beginPath();

    for (let i = 0; i < 10; i++) {
        let angle = (Math.PI / 5) * i - Math.PI / 2;
        let radius = i % 2 === 0 ? outerRadius : outerRadius / 2;

        let pointX = x + Math.cos(angle) * radius;
        let pointY = y + Math.sin(angle) * radius;

        if (i === 0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
    }

    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = "orange";
    ctx.stroke();
}

// Draw all five shapes
drawTrapezoid(50, 50);
drawDiamond(280, 90);
drawZigzag(450, 70);
drawSpiral(150, 300);
drawStar(480, 320, 65);
