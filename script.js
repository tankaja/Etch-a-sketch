let gridContainer = document.getElementById("grid");

//slider grid value
let currentNumber = document.getElementById("myRange").value;
document.getElementById("myRange").oninput = function() {
    currentNumber = this.value;
}


let mouseDown = false;
function MouseChecker() {
    onmousedown = () => (mouseDown = true);
    onmouseup = () => (mouseDown = false);
}


let multClicked = false;
let selClicked = false;
let eraseClicked = false;

document.getElementById("myRange").addEventListener("change", createGrid);

function createGrid () {
    removeGrid(document.getElementById("grid"));
    for (let i = 0; i < currentNumber; i++) {
        for (let j = 0; j < currentNumber; j++) {
            let newDiv = document.createElement ("div");
            newDiv.classList.add("etchButton");
            newDiv.setAttribute("draggable", "false");
            newDiv.textContent = "";
            newDiv.style.border = "1px solid black";
            newDiv.addEventListener("mousedown", pen);
            newDiv.addEventListener("mouseover", pen);
            gridContainer.appendChild(newDiv);
        }   
    }
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${currentNumber}, 1fr)`;
    gridContainer.style.margin = "10px";
}

// start state
createGrid();
selClicked = true;
document.getElementById("colorSelect").style.backgroundColor = "blue";


function removeGrid (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

gridContainer.style.display = "grid";
gridContainer.style.gridTemplateColumns = `repeat(${currentNumber}, 1fr)`;
gridContainer.style.margin = "10px";

function changeColor(value) {
    let color = document.getElementById("pen").value;
    value.style.backgroundColor = color;
}

function multiColor() {
    if (multClicked == false) {
        multClicked = true;
        selClicked = false;
        eraseClicked = false;
        document.getElementById("eraser").style.removeProperty("background-color");
        document.getElementById("colorSelect").style.removeProperty("background-color");
        document.getElementById("multiColor").style.backgroundColor = "blue";
    }
    else {
        multClicked = false
        document.getElementById("multiColor").style.removeProperty("background-color");
    }
}

function colorSelect() {
    if (selClicked == false) {
        selClicked = true;
        eraseClicked = false;
        multClicked = false;
        document.getElementById("eraser").style.removeProperty("background-color");
        document.getElementById("multiColor").style.removeProperty("background-color");
        document.getElementById("colorSelect").style.backgroundColor = "blue";
    }
    else {
        selClicked = false
        document.getElementById("colorSelect").style.removeProperty("background-color");
    }
}

function eraser() {
    if (eraseClicked == false) {
        eraseClicked = true;
        selClicked = false;
        multClicked = false;
        document.getElementById("multiColor").style.removeProperty("background-color");
        document.getElementById("colorSelect").style.removeProperty("background-color");
        document.getElementById("eraser").style.backgroundColor = "blue";
    }
    else {
        eraseClicked = false;
        document.getElementById("eraser").style.removeProperty("background-color");
    }
}

function clearColor() {
    let clearColor = document.getElementsByClassName("etchButton");
    for (let i = 0; i < clearColor.length; i++) {
        clearColor[i].style.removeProperty("background-color");
    }
}

function pen(brush)
{
    //console.log(brush.path[0]);
    if (brush.type === "mouseover") {
        MouseChecker();
        if (!mouseDown)
            return;
    }
    if (multClicked){
        //random range color
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        brush.path[0].style.backgroundColor = `#${randColor.toUpperCase()}`;
    }
    else if (selClicked){
        changeColor(brush.path[0]);
    }
    else if (eraseClicked){
        brush.path[0].style.removeProperty("background-color");
    }
}
