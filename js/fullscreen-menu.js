const openBtn = document.querySelector(".burger");
const closeBtn = document.querySelector(".fullscreen-menu__close-btn")
const fullScreenMenu = document.querySelector(".fullscreen-menu");

openBtn.addEventListener("click", e => {
  fullScreenMenu.style.display = "flex"
});

closeBtn.addEventListener("click", e => {
  fullScreenMenu.style.display = "none"
});



