const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const bgButtons = document.querySelectorAll(".bg-btn");
const strokeButtons = document.querySelectorAll(".stroke-btn");
const clearCanvasBtn = document.querySelector(".clear-canvas");
const sizeSlider = document.getElementById("size-slider");
const bgColorCodeElement = document.getElementById("bg-color-code");
const strokeColorCodeElement = document.getElementById("stroke-color-code");
const eraserBtn = document.getElementById("eraser-btn");
const eraserBottom = document.querySelector(".eraser-bottom");

ctx.lineCap = "round";
let drawing = false;
let eraserMode = false;
let bgColor = "rgb(240, 240, 240)";
let strokeColor = "rgb(0, 0, 0)";

bgButtons.forEach((button) => {
  button.addEventListener("click", () => {
    bgButtons.forEach((btn) => {
      btn.style.transform = "scale(1)";
      btn.style.borderColor = "#ffffff";
    });

    bgColor = window.getComputedStyle(button).backgroundColor;
    if (eraserMode) {
      changeStrokeColor(bgColor);
    }

    changeCanvasBgColor(bgColor);
    button.style.border = "3px solid #ff6347";
    button.style.transform = "scale(1.2)";
  });
});

bgColorCodeElement.addEventListener("input", () => {
  bgColor = bgColorCodeElement.value;
  changeCanvasBgColor(bgColor);
});

function changeCanvasBgColor(color) {
  canvas.style.backgroundColor = color;
}

strokeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    eraserMode = !eraserMode;
    eraserBtn.style.transform = "scale(1)";
    eraserBottom.style.backgroundColor = "black";
    canvas.style.cursor = "crosshair";

    strokeButtons.forEach((btn) => {
      btn.style.transform = "scale(1)";
      btn.style.borderColor = "#ffffff";
    });

    strokeColor = window.getComputedStyle(button).backgroundColor;
    changeStrokeColor(strokeColor);
    button.style.border = "3px solid #ff6347";
    button.style.transform = "scale(1.2)";
  });
});

strokeColorCodeElement.addEventListener("input", () => {
  strokeColor = strokeColorCodeElement.value;
  changeStrokeColor(strokeColor);
});

function changeStrokeColor(color) {
  ctx.strokeStyle = color;
}

clearCanvasBtn.addEventListener("click", () => {
  const clear = confirm("Are your sure! this operation can not be reversed.");
  if (clear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

sizeSlider.addEventListener("input", function () {
  if (parseInt(sizeSlider.value) > 20) {
    sizeSlider.value = 20;
  } else if (parseInt(sizeSlider.value) < 1) {
    sizeSlider.value = 1;
  }
  ctx.lineWidth = sizeSlider.value;
});

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
  ctx.closePath();
}

eraserBtn.addEventListener("click", () => {
  eraserMode = !eraserMode;
  if (eraserMode) {
    changeStrokeColor(bgColor);
    eraserBtn.style.transform = "scale(1.4)";
    eraserBottom.style.backgroundColor = "#ff6347";
    canvas.style.cursor = `url('images/eraser-2.png') 0 20, cell`;

    strokeButtons.forEach((button) => {
      button.style.transform = "scale(1)";
      button.style.borderColor = "#ffffff";
    });
  } else {
    eraserBtn.style.transform = "scale(1)";
    eraserBottom.style.backgroundColor = "black";
    changeStrokeColor(strokeColor);
    canvas.style.cursor = "crosshair";
  }
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
