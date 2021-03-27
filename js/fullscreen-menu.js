const openBtn = $(".burger");
const closeBtn = $(".fullscreen-menu__close-btn")
const fullScreenMenu = $(".fullscreen-menu");
const menuLink = $(".menu--vertical").find(".menu__item");


console.log(fullScreenMenu);


openBtn.click(e => {
  fullScreenMenu.css("display", "flex");
  $("body").addClass("body--scroll--lock");
});

closeBtn.click(e => {
  fullScreenMenu.css("display", "none");
  $("body").removeClass("body--scroll--lock");
});

menuLink.click(e => {
  e.preventDefault();
  fullScreenMenu.css("display", "none");
  $("body").removeClass("body--scroll--lock");
  
});
