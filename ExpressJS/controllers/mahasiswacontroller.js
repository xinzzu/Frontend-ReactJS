const Mahasiswa = require('../models/mahasiswamodels');

// Controller function to create a new Mahasiswa
exports.createMahasiswa = (req, res) => {
  const { nama, nim, tanggalLahir, alamat } = req.body;

  const newMahasiswa = new Mahasiswa({ nama, nim, tanggalLahir, alamat });

  newMahasiswa
    .save()
    .then((mahasiswa) => {
      res.status(201).json(mahasiswa);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to create Mahasiswa' });
    });
};

// Controller function to get all Mahasiswa
exports.getAllMahasiswa = (req, res) => {
  Mahasiswa.find()
    .then((mahasiswa) => {
      res.json(mahasiswa);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve Mahasiswa' });
    });
};

// Controller function to get a single Mahasiswa by ID
exports.getMahasiswaById = (req, res) => {
  const { id } = req.params;

  Mahasiswa.findById(id)
    .then((mahasiswa) => {
      if (!mahasiswa) {
        return res.status(404).json({ error: 'Mahasiswa not found' });
      }
      res.json(mahasiswa);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve Mahasiswa' });
    });
};

// Controller function to update a Mahasiswa by ID
exports.updateMahasiswa = (req, res) => {
  const { id } = req.params;
  const { nama, nim, tanggalLahir, alamat } = req.body;

  Mahasiswa.findByIdAndUpdate(
    id,
    { nama, nim, tanggalLahir, alamat },
    { new: true }
  )
    .then((mahasiswa) => {
      if (!mahasiswa) {
        return res.status(404).json({ error: 'Mahasiswa not found' });
      }
      res.json(mahasiswa);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update Mahasiswa' });
    });
};

// Controller function to delete a Mahasiswa by ID
exports.deleteMahasiswa = (req, res) => {
  const { id } = req.params;

  Mahasiswa.findByIdAndRemove(id)
    .then((mahasiswa) => {
      if (!mahasiswa) {
        return res.status(404).json({ error: 'Mahasiswa not found' });
      }
      res.json({ message: 'Mahasiswa deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete Mahasiswa' });
    });
};
