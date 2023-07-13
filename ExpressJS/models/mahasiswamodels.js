const mongoose = require('mongoose');
const MahasiswaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

const MahasiswaModel = mongoose.model('Mahasiswa', MahasiswaSchema);

module.exports = MahasiswaModel;
