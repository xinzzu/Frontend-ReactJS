const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswacontroller');

// Route to create a new Mahasiswa
router.post('/mahasiswa', mahasiswaController.createMahasiswa);

// Route to get all Mahasiswa
router.get('/mahasiswa', mahasiswaController.getAllMahasiswa);

// Route to get a single Mahasiswa by ID
router.get('/mahasiswa/:id', mahasiswaController.getMahasiswaById);

// Route to update a Mahasiswa by ID
router.put('/mahasiswa/:id', mahasiswaController.updateMahasiswa);

// Route to delete a Mahasiswa by ID
router.delete('/mahasiswa/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;
