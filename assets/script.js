document.addEventListener("DOMContentLoaded", function() {
    function updateCurrentTime() {
        const now = new Date();
        const formattedTime = now.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        document.getElementById("current-time").innerHTML = `<strong>Current time :</strong> ${formattedTime}`;
    }

    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    document.getElementById("messageForm").onsubmit = function(event) {
        event.preventDefault();

        document.getElementById("result-nama").innerText = document.getElementById("nama").value;
        document.getElementById("result-tanggalLahir").innerText = document.getElementById("tanggalLahir").value;
        document.getElementById("result-gender").innerText = document.querySelector('input[name="gender"]:checked').value;
        document.getElementById("result-pesan").innerText = document.getElementById("pesan").value;
    };
});
