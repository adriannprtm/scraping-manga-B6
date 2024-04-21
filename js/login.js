// data pengguna
const userData = {
    username: "kelompokB6",
    password: "12345678"
};

// Menyimpan data pengguna ke localStorage
localStorage.setItem('userData', JSON.stringify(userData));

function login(username, password) {
    // Mengambil data pengguna dari localStorage
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : {};

    // Memeriksa apakah username dan password cocok
    if (username === userData.username && password === userData.password) {
        // Setelah berhasil login, atur user sebagai 'logged in'
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html?status=login';
        return true;
    } else {
        swal({
            title: "Gagal!",
            text: "Username atau Password Salah!",
            icon: "error",
            button: true
        });
        return false;
    }
}

function attemptLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isLoggedIn = login(username, password);
    
    if (isLoggedIn) {
        window.location.href = 'home.html?status=login';
    }
}

function logout() {
    // Menghapus status login dari localStorage
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html?status=success';
}

document.getElementById('logoutButton').addEventListener('click', logout);


