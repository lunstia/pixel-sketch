const GRID_CONTAINER = document.querySelector(".gridContainer");
const ROOT = document.querySelector(":root");
const SLIDER = document.querySelector("#slider");
const COLOR_PICKER = document.querySelector("#color");
const CLEAR = document.querySelector("#clear");
const HUE_SHIFT = document.querySelector("#hue-shift");

let mouseDown = 0;
let currentSize = SLIDER.getAttribute('value');
let isHueShift = false;

let hueShiftValue = 1;

function clearGrid() {
    GRID_CONTAINER.replaceChildren();
}

function generateGrid(input) {
    let itemSize = 600/(input);

    ROOT.style.setProperty('--itemSize', `${itemSize}px`);

    for (let i = 0; i < input ** 2; i++) {
        let newItem = document.createElement("div");
        newItem.setAttribute('class', 'grid-item');
        newItem.setAttribute('style', `height: ${itemSize}px; width: ${itemSize}px;`);

        // mousedown is because mouseover doesnt register if you're already hovering over an item then hold your mouse down :/

        newItem.addEventListener('mousedown', e => {
            if (isHueShift) {
                console.log(hueShiftValue)
                e.target.style.setProperty('background-color', `hsl(${hueShiftValue % 360}deg, 90%, 50%)`);
                hueShiftValue++;
            } else {
                e.target.style.setProperty('background-color', COLOR_PICKER.value);
            }
        })

        newItem.addEventListener('mouseover', e => {
            if (!mouseDown) return;
            if (isHueShift) {
                e.target.style.setProperty('background-color', `hsl(${hueShiftValue % 360}deg, 90%, 50%)`);
                hueShiftValue++;
            } else {
                e.target.style.setProperty('background-color', COLOR_PICKER.value);
            }
        })

        GRID_CONTAINER.appendChild(newItem);
    }
}


document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

HUE_SHIFT.addEventListener('click', e=>{
    isHueShift = !isHueShift;
    if (isHueShift) {
        e.target.style.setProperty('background-color', '#121212');
        e.target.style.setProperty('color', 'white');
    } else {
        e.target.style.setProperty('background-color', 'white');
        e.target.style.setProperty('color', 'black');
    }
})

COLOR_PICKER.addEventListener('input', e=>{
    COLOR_PICKER.parentElement.style.setProperty('background-color', e.target.value);
})

CLEAR.addEventListener('click', e=>{
    clearGrid();
    generateGrid(currentSize);
})

SLIDER.addEventListener('input', e=> {
    SLIDER.previousElementSibling.textContent = e.target.value + " x " + e.target.value;
})

SLIDER.addEventListener('change', e=> {
    clearGrid();
    currentSize = e.target.value;
    generateGrid(currentSize);
})

generateGrid(currentSize);