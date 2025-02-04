function collapsibleWidget() {
    let button = document.getElementById('logo-container');
    button.addEventListener('click', function () {
        if (document.body.clientWidth < 1200) {
            button.classList.toggle('active');
            let fitmentbox = document.getElementById('ddfitment-searchbox');
            fitmentbox.classList.toggle('ddfitment-rolled');
        }
    });
}
