function darkenBackgroundColor(e) {

    let bg = this.style['background-color'];

    bg = bg ?? `rgb(0, 0, 0)`;

    let bgsubstr = bg.substring(4, bg.length - 1);
    let colors = bgsubstr.split(', ');

    let r = Number(colors[0]), g = Number(colors[1]), b = Number(colors[2]);
    r = Math.max(0, r - .1*255);
    g = Math.max(0, g - .1*255);
    b = Math.max(0, b - .1*255);

    this.style['background-color'] = `rgb(${r}, ${g}, ${b})`;
}


function resetGrid(gridSize) {
    // reset the boxes
    let grid = document.querySelector('.grid');
    grid.parentElement.removeChild(grid);

    grid = document.createElement('div');
    grid.classList.add('grid');
    // container.style['display'] = "flex";

    for (let i = 0; i < gridSize; ++i) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.style['display'] = "flex";

        let boxSize = Math.floor(960/gridSize);
        for (let j = 0; j < gridSize; ++j) {
            let box = document.createElement('div');
            box.classList.add('box');

            box.style['background-color'] = "rgb(255, 255, 255)";
            box.style['flex'] = "0 0 auto";
            box.style['border'] = "2px solid #000";
            box.style["height"] = `${boxSize}px`;
            box.style["width"] = `${boxSize}px`;

            row.appendChild(box);
        }
        grid.appendChild(row);
    }

    let bod = document.querySelector('body');

    // bod.appendChild(container);
    bod.appendChild(grid);

    let boxes = document.querySelectorAll('.row .box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', darkenBackgroundColor);
    });
}

resetGrid(16);

function checkInput(str) {
    // str = str.trim();
    // const arr = Array.from(str);
    let valid = true;
    const ASCII_0 = "0".charCodeAt(0), ASCII_9 = "9".charCodeAt(0);

    // Numbers only
    for (let i = 0; i < str.length; ++i) {
        let val = str[i].charCodeAt(0);
        if (!((ASCII_0 <= val) && (val <= ASCII_9))) {
            valid = false;
            return valid;
        }
    }

    if ((Number(str) > 100) || (Number(str) <= 0)) {
        valid = false;
    }

    return valid;
}

function inputHandler(e) {
    let inp = document.querySelector('.inputHeader input');
    inp.value = inp.value.trim();
    // console.log(checkInput(inp.value));

    if (checkInput(inp.value)) {
        resetGrid(Number(inp.value));
    }
}

let button = document.querySelector('.inputHeader button');

button.addEventListener('click', inputHandler);