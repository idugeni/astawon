import Swal from 'sweetalert2';

export const showError = (title: string, text: string) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
  });
};

export const validateInputs = (email: string, password: string) => {
  if (!email && !password) {
    showError('Form Tidak Lengkap', 'Harap isi email dan password.');
    return false;
  }

  if (!email) {
    showError('Email Tidak Ditemukan', 'Harap masukkan email Anda.');
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(
      'Format Email Salah',
      'Pastikan email memiliki format yang benar.'
    );
    return false;
  }

  if (!password) {
    showError('Password Tidak Valid', 'Password tidak boleh kosong.');
    return false;
  }

  if (password.length < 6) {
    showError(
      'Password Terlalu Pendek',
      'Password harus memiliki minimal 6 karakter.'
    );
    return false;
  }

  return true;
};
