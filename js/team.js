const employeeListDesk = $(".team__name", ".team__list--desktop");

const employeeListMobile = $(".team__name", ".team__list--mobile");

function hideAccordeon(employeeList){
  employeeList.each((index, item) => {
    let descElem = $(item).next();
    descElem.height(0);
    descElem.removeClass("active");
  });
}

function showAccordeon(descElem){
  descElem.height("auto");
  descElem.addClass("active");
}

function isDesktop(elem) {
  return elem.closest(".team__list--desktop").length == 1;
};

$(".team__name").on("click", function (){
  let currentName = $(this);
  let desc = currentName.next();

  if (desc.hasClass("active")) {
    console.log("active");
    if (isDesktop(currentName)){
      hideAccordeon(employeeListDesk);
    } else {
      hideAccordeon(employeeListMobile);
    }
  } else {
    console.log("not active");
    if (isDesktop(currentName)){
      hideAccordeon(employeeListDesk)
    } else {
      hideAccordeon(employeeListMobile)
    }
    showAccordeon(desc)
  }

});