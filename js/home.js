const nav = document.querySelector(".nav"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
}, 1000); 
});

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  if (status === 'success') {
      swal({
          title: "Berhasil!",
          text: "Transaksi berhasil disimpan",
          icon: "success",
          button: true
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  if (status === 'login') {
      swal({
          title: "Berhasil!",
          text: "Anda telah Login",
          icon: "success",
          button: true
      });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname.split('/').pop();
  const menuLinks = document.querySelectorAll('.nav-link');

  menuLinks.forEach(link => {
      const linkHref = link.getAttribute('href').split('/').pop();
      if (linkHref === currentLocation) {
          link.classList.add('is-active'); 
      }
  });
});



