window.addEventListener("load", function() {

    document.getElementById("calculate").addEventListener("click", calculateTip);

    function calculateTip() {

        let bill = document.getElementById("bill").value;
        let service = document.getElementById("service").value;
        let output = document.getElementById("output");

        if (bill === "") {
            output.textContent = "Please enter a bill amount.";
            return;
        }

        bill = parseFloat(bill);
        service = parseFloat(service) / 100;

        let tip = bill * service;

        output.textContent = "Tip: $" + tip.toFixed(2);
    }

});