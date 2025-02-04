// @ts-ignore
window.addEventListener('DOMContentLoaded', (event) => {
    collapsibleWidget();
    Init();
});

async function Init() {
    await buildYears();
    await restoreState();
}