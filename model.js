// @ts-ignore

function clearModels() {
    const models = document.getElementById("model-select");
    while (models.firstChild) {
        models.removeChild(models.firstChild);
    }
    models.dataset.model = '';
    const stub = document.createElement("option");
    stub.innerText = 'Select Model';
    models.appendChild(stub);
    models.disabled = true;
}

async function buildModels(year, make, equipment) {
    try {
        let data = await getModels(year, make, equipment);
        let models = [];
        if ('Response' in data) {
            models = data.Response.filter(m => m.handle.length > 0);
        }
        const container = document.getElementById("model-select");
        models.forEach(model => {
            let modelOption = document.createElement("option");
            modelOption.innerText = `${model.model}`;
            modelOption.value = model.handle;
            container.appendChild(modelOption);
        });
        container.disabled = false;
    } catch (error) {
        console.log("Error fetching brands: ", error);
    }
}

//model observer
const ModelSelect = document.getElementById("model-select");
ModelSelect.addEventListener('change', (event) => {
    event.target.dataset.model = event.target.value;
});
const modelConfig = { attributes: true, characterData: true, attributeFilter: ['data-model'] };
const modelMutProc = (mutationList) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (mutation.target.dataset.model.length > 0) {
                const yearSelect = document.getElementById("year-select");
                const makeSelect = document.getElementById("make-select");
                const eqSelect = document.getElementById("equipment-select");
                let ftmt = new Fitment(yearSelect.dataset.year,
                    makeSelect.dataset.make, eqSelect.dataset.equipment,
                    mutation.target.dataset.model)
                ftmt.store();
                clearGo();
                const targetURL = "/collections/" + mutation.target.dataset.model;
                setGo(targetURL);
                enableGo();
                window.location = targetURL;
            }
        }
    }
};
const modelObserver = new MutationObserver(modelMutProc);
modelObserver.observe(ModelSelect, modelConfig);