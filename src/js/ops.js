(function () {
const sections = $("section");
const display = $(".maincontent");
const sidemenu = $(".fixed-menu");
const sidemenuItems = sidemenu.find(".fixed-menu__item")
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


let inScroll = false;

sections.first().addClass("active");

function countSectionPosition(sectionEq) {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.erro("not a number")
    return 0
  }
  return position
}

function changeSidemenuColor(sectionEq) {
  const currentSection = sections.eq(sectionEq);
  const sidemenuColor = currentSection.attr("data-sidemenu-color");

  if (sidemenuColor == "white") {
    sidemenu.addClass("fixed-menu--color--white")
  } else {
    sidemenu.removeClass("fixed-menu--color--white")
  }
}

function resetActiveClassForItem(items, itemEq, activeClass) {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

function performTransition(sectionEq) {
  if (inScroll) return
  const transitionOver = 600;
  const mouseInertionOver = 300;
  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeSidemenuColor(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  })

  resetActiveClassForItem(sections, sectionEq, "active")
  
  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(sidemenuItems, sectionEq, "fixed-menu__item--active");

  }, transitionOver + mouseInertionOver);
}

function viewportScroller() {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index())
      }
    },

    prev() {
      if (prevSection.length) {
      performTransition(prevSection.index())
      }
    }
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next()
  }
  
  if (deltaY < 0) {
    scroller.prev()
  }
})

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" && tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return

  switch(e.keyCode) {
    case 38: //prev
      scroller.prev();
      break;

    case 40: //next
      scroller.next();
      break;
    }
})

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})


if (isMobile) {
  $("body").swipe( {
    preventDefaultEvents: false,
    //Generic swipe handler for all directions
    swipe: function(event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";
      let isVerticalScroll = false;
      if (direction == "up"){
        scrollDirection = "next";
        isVerticalScroll = true;
      } 
      if (direction == "down"){
        scrollDirection = "prev";
        isVerticalScroll = true;
      } 
      if (isVerticalScroll){
        scroller[scrollDirection]();
      }
  
    }
  });
  
  $(".wrapper").on("touchmove", e => e.preventDefault());

}
})();