import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, Typography, Snackbar } from '@mui/material';

function MahasiswaForm() {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [formError, setFormError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah semua field telah diisi
    if (!nama || !nim || !tanggalLahir || !alamat) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const mahasiswaData = {
      nama,
      nim,
      tanggalLahir,
      alamat,
    };

    // Kirim data ke backend dan lakukan aksi setelahnya
    fetch('http://localhost:8000/api/mahasiswa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mahasiswaData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data mahasiswa berhasil disimpan:', data);
        // Reset form input values
        setNama('');
        setNim('');
        setTanggalLahir('');
        setAlamat('');
        setShowNotification(true); // Menampilkan notifikasi setelah berhasil menambahkan data
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menyimpan data mahasiswa:', error);
      });
  };

  const handleCloseNotification = () => {
    setShowNotification(false); // Menutup notifikasi
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ marginTop: '2rem', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Tambahkan Mahasiswa
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nama"
                    variant="outlined"
                    fullWidth
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="NIM"
                    variant="outlined"
                    fullWidth
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tanggal Lahir"
                    variant="outlined"
                    fullWidth
                    type='date'
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Alamat"
                    variant="outlined"
                    fullWidth
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </Grid>
                {formError && (
                  <Grid item xs={12}>
                    {/* Tidak menampilkan pesan "Masukkan data Anda!" */}
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Tambahkan
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {/* Notifikasi */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message="Data berhasil disimpan!"
      />
    </Grid>
  );
}

export default MahasiswaForm;
