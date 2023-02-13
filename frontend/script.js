
axios.get("http://localhost:3004/data-barang")
.then((response) => {
    let data = response.data;
    console.log(data);

    let htmlBarang = "";

    data.forEach(data_barang => {
        htmlBarang +=`
        <tr class="tbody" >
            <td class="id">${data_barang.id_barang}</td>
            <td class="nama">${data_barang.nama_barang}</td>
            <td class="foto">${data_barang.foto_barang}</td>
            <td class="deskripsi">${data_barang.deskripsi}</td>
            <td class="jumlah">${data_barang.jumlah}</td>
            <td class="harga">${data_barang.harga_barang}</td>
        </tr>`
    });
    document.querySelector("tbody").innerHTML = htmlBarang;
})
