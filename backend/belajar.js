const { json } = require("express");
const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");

const app = express();

var connection = mysql.createConnection({
  host: "5.181.216.42",
  user: "u1084987_kelompok_3",
  password: "f2d7tvdcjvi7",
  database: "u1084987_kelompok_3",
});

app.use(bodyParser.json());
app.use(cors());

connection.connect();

app.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM data_barang LEFT JOIN histori_barang ON data_barang.nama_barang = histori_barang.nama_barang;",
    function (error, results, fields) {
      if (error) throw error;

      res.send(results);
    }
  );
});

app.get("/data-barang", (req, res) => {
  connection.query(
    "SELECT * FROM data_barang",
    function (error, results, fields) {
      res.send(results);
    }
  );
});

app.post("/data-barang", (req, res) => {
  let dataInputan = {
    id_barang: req.body.id_barang,
    id_kategori: req.body.id_kategori,
    nama_barang: req.body.nama_barang,
    foto_barang: req.body.foto_barang,
    deskripsi: req.body.deskripsi,
    jumlah_barang: req.body.jumlah_barang,
    harga_barang: req.body.harga_barang,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  };

  connection.query(
    "INSERT INTO data_barang SET ?",
    dataInputan,
    (error, results, fields) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.delete("/data-barang/:id_barang", (req, res) => {
  connection.query(
    `DELETE FROM data_barang WHERE id_barang = '${req.params.id_barang}'`,
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.put("/data-barang/:id_barang", (req, res) => {

    let id_barang = req.body.id_barang;
    let id_kategori = req.body.id_kategori;
    let nama_barang = req.body.nama_barang;
    let foto_barang = req.body.foto_barang;
    let deskripsi = req.body.deskripsi;
    let jumlah_barang = req.body.jumlah_barang;
    let harga_barang = req.body.harga_barang;
    let created_at= req.body.created_at;
    let updated_at= req.body.updated_at;

  // UPDATE table_name
  // SET column1 = value1, column2 = value2, ...
  // WHERE condition;

  connection.query(
    'UPDATE data_barang SET id_barang =? , id_kategori=? , nama_barang =? , foto_barang =?, deskripsi =? , jumlah_barang =? , harga_barang =?, created_at=?,  WHERE id_barang =?, updated_at=?',[id_barang,id_kategori,nama_barang,foto_barang,deskripsi,jumlah_barang,harga_barang,created_at,updated_at,id_barang],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.listen(3004, () => {
  console.log("backend run....");
});
