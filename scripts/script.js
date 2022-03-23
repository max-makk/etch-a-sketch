const container = document.querySelector(".container");
const popUp = document.querySelector(".pop-up");
const inputLeft = document.querySelector(".input-left");
const inputRight = document.querySelector(".input-right");
const buttonClear = document.querySelector(".clear");
const buttonNewGrid = document.querySelector(".btn-new-grid");
const closeBtn = document.querySelector(".close");
let mouseTarget;
popUp.style.display = "none";
buttonNewGrid.disabled = true;

// ******************************************************** Grid

function generateGrid() {
  container.style.gridTemplateColumns = "repeat(" + +inputLeft.value + ", 1fr)";

  let sqr = +inputLeft.value * +inputLeft.value;

  for (let index = 0; index < sqr; index++) {
    const div = document.createElement("div");
    div.classList.add("box");
    container.appendChild(div);
  }
  mouseTarget = document.querySelectorAll(".container div");
}

generateGrid();

// ******************************************************** Random Color

function randomRGB() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
}

// ******************************************************** Change Color

function shadeRGBColor(color, percent) {
  var f = color.split(","),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = parseInt(f[0].slice(4)),
    G = parseInt(f[1]),
    B = parseInt(f[2]);
  return (
    "rgb(" +
    (Math.round((t - R) * p) + R) +
    "," +
    (Math.round((t - G) * p) + G) +
    "," +
    (Math.round((t - B) * p) + B) +
    ")"
  );
}

// ******************************************************** Set Color

function setColor() {
  if (!this.hasAttribute("data-counter")) {
    let counter = 0;
    let color = randomRGB();
    this.style.background = color;
    this.setAttribute("data-color", color);
    this.setAttribute("data-counter", counter);
  } else if (+this.getAttribute("data-counter") > -1.0) {
    let attr = (+this.getAttribute("data-counter") + -0.1).toFixed(1);
    this.setAttribute("data-counter", attr);
    this.style.background = shadeRGBColor(
      this.getAttribute("data-color"),
      this.getAttribute("data-counter")
    );
  }
}

// ******************************************************** Inputs Listeners

inputLeft.addEventListener("input", function (e) {
  let regex = /^[1-9]$|^[1-9][0-9]$|^(100)$/;
  if (regex.test(inputLeft.value)) {
    buttonNewGrid.textContent = "OK";
    buttonNewGrid.disabled = false;
  } else {
    buttonNewGrid.disabled = true;
    buttonNewGrid.textContent = ":(";
  }
  inputRight.textContent = e.target.value;
});

// ******************************************************** Buttons

buttonNewGrid.addEventListener("click", applyNewGrid);
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    applyNewGrid();
  }
});

buttonClear.addEventListener("click", function () {
  if (popUp.style.display === "none") {
    popUp.style.display = "grid";
  } else {
    popUp.style.display = "none";
  }
  mouseTarget.forEach((el) => (el.style.background = ""));
  inputLeft.value = "";
  inputLeft.focus();
});

closeBtn.addEventListener("click", function () {
  inputRight.textContent = "";
  popUp.style.display = "none";
});

// ******************************************************** Mouse events

mouseTarget.forEach((el) => el.addEventListener("mouseenter", setColor));

function applyNewGrid() {
  if (inputLeft.value === "") {
    return;
  }
  if(+inputLeft.value > 100) {
    alert('maximum 100')
    return
  }
 if(+inputLeft.value < 1) {
    inputLeft.value = "1"
    return
  }
  container.innerHTML = "";
  generateGrid();

  mouseTarget.forEach((el) => el.addEventListener("mouseenter", setColor));
}
