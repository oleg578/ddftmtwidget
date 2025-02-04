// @ts-ignore

function clearMakes() {
    const makes = document.getElementById("make-select");
    while (makes.firstChild) {
        makes.removeChild(makes.firstChild);
    }
    makes.dataset.make = '';
    stub = document.createElement("option");
    stub.innerText = 'Select Make';
    makes.appendChild(stub);
    makes.disabled = true;
}

async function buildMakes(year) {
    try {
        let data = await getMakes(year);
        let makes = [];
        if ('Response' in data) {
            makes = data.Response.filter(m => m.length > 0);
        }
        const container = document.getElementById("make-select");
        makes.forEach(make => {
            let makeOption = document.createElement("option");
            makeOption.innerHTML = `${make}`;
            container.appendChild(makeOption);
        });
        container.disabled = false;
    } catch (error) {
        console.log("Error fetching brands: ", error);
    }
}

//makes observer
const MakeSelect = document.getElementById("make-select");
MakeSelect.addEventListener('change', (event) => {
    event.target.dataset.make = event.target.value;
});
const mselconfig = { attributes: true, characterData: true, attributeFilter: ['data-make'] };
const makeMutProc = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (mutation.target.dataset.make.length > 0) {
                clearEquipments();
                clearModels();
                clearGo();
                const yearselect = document.getElementById("year-select");
                let ftmt = new Fitment(yearselect.dataset.year, mutation.target.dataset.make, null, null)
                ftmt.store();
                buildEquipments(yearselect.dataset.year, mutation.target.value)
            }
        }
    }
};
const makeObserver = new MutationObserver(makeMutProc);
makeObserver.observe(MakeSelect, mselconfig);