import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@mui/material';

function MahasiswaTable() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  // Mengambil data mahasiswa dari backend saat komponen di-mount
  useEffect(() => {
    fetch('http://localhost:8000/api/mahasiswa')
      .then((response) => response.json())
      .then((data) => {
        setMahasiswa(data);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat mengambil data mahasiswa:', error);
      });
  }, []);

  const handleEdit = (id) => {
    const selectedData = mahasiswa.find((data) => data._id === id);
    setEditData(selectedData);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/api/mahasiswa/${editData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data mahasiswa berhasil diperbarui:', data);
        setEditData(null);
        // Mengambil data mahasiswa terbaru setelah perubahan
        fetch('http://localhost:8000/api/mahasiswa')
          .then((response) => response.json())
          .then((data) => {
            setMahasiswa(data);
          })
          .catch((error) => {
            console.error('Terjadi kesalahan saat mengambil data mahasiswa:', error);
          });
        setShowUpdateNotification(true); // Menampilkan notifikasi pembaruan data
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat memperbarui data mahasiswa:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(true);
    setSelectedId(id);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:8000/api/mahasiswa/${selectedId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data mahasiswa berhasil dihapus:', data);
        setDeleteConfirmation(false);
        setSelectedId(null);
        // Mengambil data mahasiswa terbaru setelah penghapusan
        fetch('http://localhost:8000/api/mahasiswa')
          .then((response) => response.json())
          .then((data) => {
            setMahasiswa(data);
          })
          .catch((error) => {
            console.error('Terjadi kesalahan saat mengambil data mahasiswa:', error);
          });
        setShowDeleteNotification(true); // Menampilkan notifikasi penghapusan data
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menghapus data mahasiswa:', error);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setSelectedId(null);
  };

  const handleInputChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateNotificationClose = () => {
    setShowUpdateNotification(false); // Menutup notifikasi pembaruan data
  };

  const handleDeleteNotificationClose = () => {
    setShowDeleteNotification(false); // Menutup notifikasi penghapusan data
  };

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Tanggal Lahir</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mahasiswa.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data.nama}</TableCell>
                  <TableCell>{data.nim}</TableCell>
                  <TableCell sx={{ width: '100px' }}>{new Date(data.tanggalLahir).toLocaleDateString().split('/').join('-')}</TableCell>
                  <TableCell>{data.alamat}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(data._id)} sx={{ marginRight: '8px' }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(data._id)} sx={{ marginRight: '8px' }}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog Konfirmasi Penghapusan */}
        <Dialog open={deleteConfirmation} onClose={handleCancelDelete}>
          <DialogTitle>Apakah Anda yakin menghapus data?</DialogTitle>
          <DialogContent>
            {/* Isi pesan konfirmasi di sini */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Tidak
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Ya
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Edit Data */}
        <Dialog open={!!editData} onClose={handleCancelEdit}>
          <DialogTitle>Edit Data Mahasiswa</DialogTitle>
          <DialogContent>
            <TextField
              label="Nama"
              name="nama"
              value={editData?.nama || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="NIM"
              name="nim"
              value={editData?.nim || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tanggal Lahir"
              name="tanggalLahir"
              type='date'
              value={editData?.tanggalLahir || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Alamat"
              name="alamat"
              value={editData?.alamat || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit} color="primary">
              Batal
            </Button>
            <Button onClick={handleUpdate} color="secondary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notifikasi */}
        <Snackbar
          open={showUpdateNotification}
          autoHideDuration={3000}
          onClose={handleUpdateNotificationClose}
          message="Data berhasil diperbarui!"
        />
        <Snackbar
          open={showDeleteNotification}
          autoHideDuration={3000}
          onClose={handleDeleteNotificationClose}
          message="Data berhasil dihapus!"
        />
      </CardContent>
    </Card>
  );
}

export default MahasiswaTable;
