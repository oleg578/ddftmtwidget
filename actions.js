// @ts-ignore

// reset button
resetBtn = document.getElementById("clear-action");
resetBtn.addEventListener('click', (event) => {
    resetChoise();
});

// GO button
resetBtn = document.getElementById("search-action");
resetBtn.addEventListener('click', (event) => {
    url = event.target.dataset.link;
    window.location = url;
});

function clearGo() {
    let btn = document.getElementById("search-action");
    btn.dataset.link = '';
    btn.disabled = true;
}

function enableGo() {
    let btn = document.getElementById("search-action");
    btn.disabled = false;
}

function setGo(url) {
    let btn = document.getElementById("search-action");
    btn.dataset.link = url;
}

function resetChoise() {
    localStorage.removeItem('FitmentSet');
    let year = document.getElementById("year-select");
    year.value = 'Select Year';
    year.dataset.year = '';
    clearMakes();
    clearEquipments();
    clearModels();
    clearGo();
}