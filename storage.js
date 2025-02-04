// @ts-ignore
function Fitment(year, make, equipmenttype, model) {
    this.year = year;
    this.make = make;
    this.equipmenttype = equipmenttype;
    this.model = model;
    return this;
}
Fitment.prototype.reset = function () {
    this.make = null;
    this.make = null;
    this.equipmenttype = null;
    this.model = null;
    this.store();
    return this;
}

Fitment.prototype.store = function () {
    localStorage.setItem('FitmentSet', JSON.stringify(this));
}

Fitment.prototype.get = function () {
    let ftmt = JSON.parse(localStorage.getItem('FitmentSet'));
    if (ftmt !== null) {
        this.year = ftmt.year;
        this.make = ftmt.make;
        this.equipmenttype = ftmt.equipmenttype;
        this.model = ftmt.model;
    }
    return this;
}

async function restoreState() {
    const ftmt = new Fitment(null, null, null, null);
    ftmt.get();
    if (ftmt == null) {
        return
    }
    if (ftmt.year == null) {
        return
    }
    //stop all observers
    yearObserver.disconnect();
    makeObserver.disconnect();
    eqObserver.disconnect();
    modelObserver.disconnect();
    //year
    let year = document.getElementById("year-select");
    year.value = ftmt.year;
    year.dataset.year = ftmt.year;
    await buildMakes(ftmt.year);
    //make
    if (ftmt.make != null) {
        let make = document.getElementById("make-select");
        make.value = ftmt.make;
        make.dataset.make = ftmt.make;
    }
    await buildEquipments(ftmt.year, ftmt.make);
    //equipmenttype
    if (ftmt.equipmenttype != null) {
        let eqmt = document.getElementById("equipment-select");
        eqmt.value = ftmt.equipmenttype;
        eqmt.dataset.equipment = ftmt.equipmenttype;
    }
    await buildModels(ftmt.year, ftmt.make, ftmt.equipmenttype);
    //models
    if (ftmt.model != null) {
        let model = document.getElementById("model-select");
        model.value = ftmt.model;
        model.dataset.equipment = ftmt.model;
    }
    clearGo();
    setGo("/collections/" + ftmt.model);
    enableGo();
    yearObserver.observe(YearSelect, yselconfig);
    makeObserver.observe(MakeSelect, mselconfig);
    eqObserver.observe(EqmtSelect, eqconfig);
    modelObserver.observe(ModelSelect, modelConfig);
}