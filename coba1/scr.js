document.addEventListener('DOMContentLoaded', () => {
    const nama = prompt('Halo! Siapa nama kamu?') || 'Pengunjung';
    document.getElementById('welcome-message').innerText = `Hai ${nama}, Welcome to Website`;

    const form = document.getElementById('messageForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const tanggal = document.getElementById('tanggalLahir').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const pesan = document.getElementById('pesan').value;

        if (!gender) {
            alert('Silakan pilih jenis kelamin!');
            return;
        }

        document.getElementById('messageResult').innerHTML = `
            <p><strong>Nama:</strong> ${nama}</p>
            <p><strong>Tanggal Lahir:</strong> ${tanggal}</p>
            <p><strong>Jenis Kelamin:</strong> ${gender}</p>
            <p><strong>Pesan:</strong> ${pesan}</p>
        `;
    });
});
