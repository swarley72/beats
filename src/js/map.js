(function () {
let myMap;

function init() {
  myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11,
    controls: [

    ]
  });

  const coords = [
    [55.737805, 37.591579],
    [55.720057, 37.630307],
    [55.759343, 37.640231]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: true,
    iconLayout: 'default#image',
    iconImageHref: "./img/icons/marker.svg",
    iconImageSize: [50, 73],
    iconImageOffset: []
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })

  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable("scrollZoom")
}

ymaps.ready(init)

})();