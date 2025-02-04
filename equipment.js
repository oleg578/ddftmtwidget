// @ts-ignore

function clearEquipments() {
    const equipments = document.getElementById("equipment-select");
    while (equipments.firstChild) {
        equipments.removeChild(equipments.firstChild);
    }
    equipments.dataset.equipment = '';
    stub = document.createElement("option");
    stub.innerText = 'Select Equipment Type';
    equipments.appendChild(stub);
    equipments.disabled = true;
}

async function buildEquipments(year, make) {
    try {
        let data = await getEquipments(year, make);
        let eqps = [];
        if ('Response' in data) {
            eqps = data.Response.filter(eqp => eqp.length > 0);
        }
        const container = document.getElementById("equipment-select");
        eqps.forEach(eqp => {
            let eqOption = document.createElement("option");
            eqOption.innerHTML = `${eqp}`;
            container.appendChild(eqOption);
        });
        container.disabled = false;
    } catch (error) {
        console.log("Error fetching equipmqnts: ", error);
    }
}

//equipments observer
const EqmtSelect = document.getElementById("equipment-select");
EqmtSelect.addEventListener('change', (event) => {
    event.target.dataset.equipment = event.target.value;
});
const eqconfig = { attributes: true, characterData: true, attributeFilter: ['data-equipment'] };
const eqMutProc = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (mutation.target.dataset.equipment.length > 0) {
                clearModels();
                clearGo();
                const yearselect = document.getElementById("year-select");
                const makeselect = document.getElementById("make-select");
                let ftmt = new Fitment(yearselect.dataset.year,
                    makeselect.dataset.make, mutation.target.dataset.equipment, null)
                ftmt.store();
                buildModels(yearselect.dataset.year, makeselect.dataset.make, mutation.target.value)
            }
        }
    }
};
const eqObserver = new MutationObserver(eqMutProc);
eqObserver.observe(EqmtSelect, eqconfig);
