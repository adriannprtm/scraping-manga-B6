function tampilkanRekap() {
  const jenis = document.getElementById("jenisRekap").value;
  const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
  const hasilRekap = document.getElementById("hasilRekap");
  let rekap = {};

  transaksi.forEach((t) => {
    let key;
    const tanggal = new Date(t.tanggal);
    const tahun = tanggal.getFullYear();
    const bulan = tanggal.getMonth() + 1;
    const hari = tanggal.getDate();

    if (jenis === "harian") {
      key = `${tahun}-${bulan < 10 ? "0" : ""}${bulan}-${
        hari < 10 ? "0" : ""
      }${hari}`;
    } else if (jenis === "bulanan") {
      key = `${tahun}-${bulan < 10 ? "0" : ""}${bulan}`;
    } else if (jenis === "mingguan") {
      key = `${tahun}-W${tanggal.getWeek()}`;
    } else if (jenis === "tahunan") {
      key = `${tahun}`;
    }

    if (!rekap[key]) rekap[key] = { pemasukan: 0, pengeluaran: 0 };
    if (t.tipe === "pemasukan") {
      rekap[key].pemasukan += parseInt(t.nominal);
    } else if (t.tipe === "pengeluaran") {
      rekap[key].pengeluaran += parseInt(t.nominal); 
    }
    
  });

  htmlContent =
    "<table><thead><tr><th>Tanggal</th><th>Pemasukan</th><th>Pengeluaran</th><th>Selisih</th></tr></thead><tbody>";
  for (const [key, data] of Object.entries(rekap)) {
    const selisih = data.pemasukan - data.pengeluaran;
    htmlContent += `<tr>
                            <td>${key}</td>
                            <td>Rp ${data.pemasukan.toLocaleString()}</td>
                            <td>Rp ${(data.pengeluaran).toLocaleString()}</td>
                            <td>Rp ${selisih.toLocaleString()}</td>
                        </tr>`;
  }
  htmlContent += "</tbody></table>";
  hasilRekap.innerHTML = htmlContent;
}

function eksporKeExcel() {
  const el = document.querySelector("#hasilRekap table");
  const ws = XLSX.utils.table_to_sheet(el);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rekap");

  const jenis = document.getElementById("jenisRekap").value;
  XLSX.writeFile(wb, `Rekap_${jenis}.xlsx`);
}

Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
