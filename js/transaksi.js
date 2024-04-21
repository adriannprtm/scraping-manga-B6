function simpanTransaksi() {
    // Mengambil data dari form
    const tanggal = document.getElementById('tanggal').value;
    const tipe = document.getElementById('tipe').value;
    const nominal = document.getElementById('nominal').value;
    const kategori = document.getElementById('kategori').value;

    // Validasi untuk memastikan semua field telah diisi
    if (!tanggal || !tipe || !nominal || !kategori) {
        swal({
            title: "Gagal!",
            text: "Harap isi semua data",
            icon: "error",
            button: true
        });
        return; 
    }

    // Membuat objek transaksi
    const transaksi = {
        tanggal,
        tipe,
        nominal,
        kategori
    };

    // Mendapatkan transaksi lama dari local storage dan mengkonversinya menjadi array
    // Jika belum ada, buat array baru
    const transaksiLama = JSON.parse(localStorage.getItem('transaksi')) || [];
    transaksiLama.push(transaksi);
    localStorage.setItem('transaksi', JSON.stringify(transaksiLama));
    document.getElementById('transaksiForm').reset();
    window.location.href = 'home.html?status=success';
}

function muatTransaksi() {
    // Mendapatkan transaksi dari local storage
    const transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];
    const tbody = document.getElementById('tabelTransaksi').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 
  
    let selisih = 0; 
  
    transaksi.forEach(t => {
        const row = tbody.insertRow(); 
  
        row.insertCell().innerText = t.tanggal;
        row.insertCell().innerText = t.kategori;
  
        // Menambahkan data pemasukan atau pengeluaran
        if (t.tipe === 'pemasukan') {
            row.insertCell().innerText = `Rp ${t.nominal}`;
            row.insertCell().innerText = ''; // Kolom pengeluaran kosong
            selisih += parseInt(t.nominal); // Menambahkan ke selisih
        } else if (t.tipe === 'pengeluaran') {
            row.insertCell().innerText = ''; // Kolom pemasukan kosong
            row.insertCell().innerText = `Rp ${t.nominal}`;
            selisih -= parseInt(t.nominal); // Mengurangi dari selisih
        }

        row.insertCell().innerText = `Rp ${selisih}`;
    });
  }
  
  document.addEventListener('DOMContentLoaded', muatTransaksi);
