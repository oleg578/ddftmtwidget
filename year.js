// @ts-ignore
async function buildYears() {
    try {
        let data = await getYears();
        let years = [];
        if ('Response' in data) {
            years = data.Response.filter(y => y.length > 0);
        }
        const container = document.getElementById("year-select");
        years.forEach(year => {
            let yearOption = document.createElement("option");
            yearOption.innerHTML = `${year}`;
            container.appendChild(yearOption);
        });
    } catch (error) {
        console.log("Error fetching years: ", error);
    }
}


//years observer
const YearSelect = document.getElementById("year-select");
YearSelect.addEventListener('change', (event) => {
    event.target.dataset.year = event.target.value;
});
const yselconfig = { attributes: true, characterData: true, attributeFilter: ['data-year'] };
const yearMutProc = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (mutation.target.dataset.year.length > 0) {
                clearMakes();
                clearEquipments();
                clearModels();
                clearGo();
                let ftmt = new Fitment(mutation.target.dataset.year, null, null, null)
                ftmt.store();
                buildMakes(mutation.target.value);
            }
        }
    }
};
const yearObserver = new MutationObserver(yearMutProc);
yearObserver.observe(YearSelect, yselconfig);
