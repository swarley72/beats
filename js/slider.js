// (function (){
//   const items = document.querySelectorAll(".product");
//   const container = document.querySelector(".slider__list");
//   const nextBtn = document.querySelectorAll('.slider__arrow--type--next');
//   const prevBtn = document.querySelectorAll('.slider__arrow--type--prev');

//   let step = setCurrentWidth();
//   const maxRight = step * items.length;
//   let currentRight = 0;

//   container.style.right = currentRight;

//   window.addEventListener("resize", () => {
//     step = setCurrentWidth();
//   })

//   nextBtn.addEventListener("click", (e) => {
//     changeSlide(e, "right");
//   });

//   prevBtn.addEventListener("click", (e) => {
//     changeSlide(e, "left");
//   });

//   function changeSlide(e, direction){
//     e.preventDefault();
//     if (direction == "right"){
//       if (currentRight < maxRight){
//         currentRight += step;
//         container.style.right = `${currentRight}px`
//       }
//       if (currentRight == maxRight){
//         currentRight = 0;
//         container.style.right = `$`
//       }
//     } else {

//     }
//   }

//   function setCurrentWidth(){
//     let itemWidth = document.querySelector(".products-wrapper"). 
//     items.forEach(item => {
//       item.style.width = `${itemWidth}px`
//     })
//     return itemWidth
//   }
// })();

// $(document).ready(function(){
//   $('.slider__list').slick();
// });