/* eslint-disable no-unused-vars */
function run() {
  let i = 0;
  const pics = ['./img/1.jpg', './img/2.jpg', './img/3.jpg',
    './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg',
    './img/8.jpg', './img/9.jpg', './img/10.jpg', './img/11.jpg',
    './img/12.jpg', './img/13.jpg', './img/14.jpg'];
  const el = document.getElementById('background');
  function toggle() {
    el.src = pics[i];
    i = (i + 1) % pics.length;
    document.getElementById('background').style.opacity = '0.5';
    document.getElementById('background').style.width = '100%';
  }
  toggle();
  setInterval(toggle, 2500);
}

const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('navbar');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navbar.classList.toggle('active');
  burger.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').src;
      const overlay = document.getElementById('overlay');
      overlay.innerHTML = `<img src="${imgSrc}" class="overlay-img" alt="Zoomed Image">`;
      overlay.style.display = 'block';

      overlay.addEventListener('click', function () {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
      });
    });
  });
});