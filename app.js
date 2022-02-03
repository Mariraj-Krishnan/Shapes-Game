var numberOfShapes = document.getElementById("quantity");
var removePos = document.getElementById("remove-position");
var shapeHolder = document.querySelector(".shape-container");
var shapeDefine = ["square", "circle", "rectangle", "oval"];
var colorDefine = [
  "hsl(0deg,70%,70%)",
  "hsl(120deg,70%,70%)",
  "hsl(240deg,70%,70%)",
  "red",
  "green",
  "blue",
];
var colorArray = [];
var shapeArray = [];
var count = Array(5).fill(0);
function clear() {
  clearInterval(timer);
  clearTimeout(timeout);
}
function addShape() {
  var timeId = setTimeout(() => {}, 0);
  for (var i = 0; i < timeId; i++) {
    clearInterval(i);
    clearTimeout(i);
  }
  count.fill(0);
  shapeArray = [];
  colorArray = [];
  for (var i = 0; i < numberOfShapes.value; i++) {
    var randomColor = Math.floor(Math.random() * 3);
    var randomShape = Math.floor(Math.random() * 4);
    shapeArray.push(shapeDefine[randomShape]);
    colorArray.push(colorDefine[randomColor]);
    if (shapeDefine[randomShape] == "square") {
      ++count[1];
    }

    if (shapeDefine[randomShape] == "circle") {
      ++count[2];
    }

    if (shapeDefine[randomShape] == "rectangle") {
      ++count[3];
    }

    if (shapeDefine[randomShape] == "oval") {
      ++count[4];
    }
  }

  count[0] = shapeArray.length;

  shapeHolder.innerHTML = "";

  shapeArray.forEach((el, index) => {
    shapeHolder.innerHTML += `<div class='${el}' id='${
      index + 1
    }' style='background-color:${colorArray[index]};'><div>`;
  });
  countSpecify();
  userQuestion();
  var time = 4;
  var timerContainer = document.querySelector(".timer");
  timerContainer.style.display = "block";
  timerContainer.innerHTML = time;
  var timer = window.setInterval(function () {
    time = time - 1;
    timerContainer.innerHTML = time;
  }, 1000);
  var timeout = window.setTimeout(function () {
    shapeArray = [];
    count.fill(0);
    shapeHolder.innerHTML = question;
    clearInterval(timer);
    timerContainer.innerHTML = "";
    timerContainer.style.display = "none";
  }, 4000);
}

function countSpecify() {
  document.querySelector("#square-count").innerText = count[1];

  document.querySelector("#circle-count").innerText = count[2];

  document.querySelector("#rect-count").innerText = count[3];

  document.querySelector("#oval-count").innerText = count[4];
}
countSpecify();
function removeShape() {
  var removedShape = document
    .getElementById(removePos.value)
    .getAttribute("class");
  count[0]--;

  if (removedShape == "square") {
    count[1]--;
  }

  if (removedShape == "circle") {
    count[2]--;
  }

  if (removedShape == "rectangle") {
    count[3]--;
  }

  if (removedShape == "oval") {
    count[4]--;
  }

  countSpecify();

  shapeArray.splice(removePos.value - 1, 1);
  colorArray.splice(removePos.value - 1, 1);

  shapeHolder.innerHTML = "";

  shapeArray.forEach((el, index) => {
    shapeHolder.innerHTML += `<div class='${el}' id='${
      index + 1
    }' style='background-color:${colorArray[index]};'><div>`;
  });
}
var ans = 0;
var question = "";
function userQuestion() {
  ans = 0;
  var randomShape = shapeArray[Math.floor(Math.random() * shapeArray.length)];
  var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  var colorNumber = colorDefine.indexOf(randomColor);
  shapeArray.forEach((el, index) => {
    if (el == randomShape) {
      if (colorArray[index] == randomColor) {
        ans = ans + 1;
      }
    }
  });
  question = `<p id="question">
  <label for="ans">How many <span>${
    colorDefine[colorNumber + 3]
  }</span> colored <span>${randomShape}</span> did you see ?</label><br>
  <span><input type="number" id="ans" min='0'>
  <button onclick="check()" required>Submit</button></span>
</p>`;
}
var score = 0;
var scoreContainer = document.querySelector("#score span");
function check() {
  if (document.getElementById("ans").value == ans) {
    shapeHolder.innerHTML = "<h1>Correct!</h1>";
    ++score;
    scoreContainer.innerHTML = score;
  } else shapeHolder.innerHTML = "<h1>Wrong!</h1>";
}
