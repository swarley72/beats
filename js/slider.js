function getWidth (){
  const sliderContainerWidth = $(".slider__container").innerWidth();
  return sliderContainerWidth;
};



let sliderWrapper = document.querySelector(".slider__list-wrapper").style.width = `${getWidth()}px`

window.addEventListener("resize", e => {  
  sliderWrapper.style.width = `${getWidth()}px`
})


const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$(".slider__arrow--type--prev").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".slider__arrow--type--next").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});





