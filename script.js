function darkenBackgroundColor(e) {

    let bg = this.style['background-color'];

    bg = bg ?? `rgb(0, 0, 0)`;

    let bgsubstr = bg.substring(4, bg.length - 1);
    let colors = bgsubstr.split(', ');

    // Subtract 10% of the max value from the box color
    let r = Number(colors[0]), g = Number(colors[1]), b = Number(colors[2]);
    r = Math.max(0, r - .1*255);    // maximize it with zero to avoid negatives
    g = Math.max(0, g - .1*255);
    b = Math.max(0, b - .1*255);

    this.style['background-color'] = `rgb(${r}, ${g}, ${b})`;
}

function resetGrid(gridSize) {
    // Reset the grid
    let grid = document.querySelector('.grid');
    grid.parentElement.removeChild(grid);
    grid = document.createElement('div');
    grid.classList.add('grid');

    // Construct the grid row-by-row
    for (let i = 0; i < gridSize; ++i) {

        // Create a row container
        let row = document.createElement('div');
        row.classList.add('row');
        row.style['display'] = "flex";

        // Set the box size in pixels
        let boxSize = Math.floor(960/gridSize);

        // Construct the row
        for (let j = 0; j < gridSize; ++j) {

            // Define the box
            let box = document.createElement('div');
            box.classList.add('box');
            box.style['background-color'] = "rgb(255, 255, 255)";
            box.style['flex'] = "0 0 auto";
            box.style['border'] = "2px solid #000";
            box.style["height"] = `${boxSize}px`;
            box.style["width"] = `${boxSize}px`;

            // Define the event listener as well
            box.addEventListener('mouseenter', darkenBackgroundColor);

            // Append the box to the row
            row.appendChild(box);
        }

        // Append the row to the grid
        grid.appendChild(row);
    }

    // Add the grid to the body
    let bod = document.querySelector('body');
    bod.appendChild(grid);
}

// Initialize the grid
resetGrid(16);

function checkValidInput(str) {
    let valid = true;
    const ASCII_0 = "0".charCodeAt(0), ASCII_9 = "9".charCodeAt(0);

    // Accept numbers only
    for (let i = 0; i < str.length; ++i) {
        let val = str[i].charCodeAt(0);
        if (!((ASCII_0 <= val) && (val <= ASCII_9))) {
            valid = false;
            return valid;
        }
    }

    // Accept only positive values at most 100
    if ((Number(str) > 100) || (Number(str) <= 0)) {
        valid = false;
    }

    return valid;
}

function clickHandler(e) {
    let inp = document.querySelector('.inputHeader input');
    inp.value = inp.value.trim();

    if (checkValidInput(inp.value)) {
        resetGrid(Number(inp.value));
    }
}

function pressHandler(e) {
    if (e.key !== 'Enter')
        return;

    if (checkValidInput(inp.value)) {
        resetGrid(Number(inp.value));
    }
}

// Accept inputs when user clicks the button
let button = document.querySelector('.inputHeader button');
button.addEventListener('click', clickHandler);

let inp = document.querySelector('.inputHeader input');
inp.addEventListener('keyup', pressHandler);