// Returns mouse coordinates that are
// relative to the canvas, i.e. useful
function relativeCoords (element, event) {
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var currentElement = element;

  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    currentElement = currentElement.offsetParent;
  } while (currentElement);

  var canvasX = event.pageX - totalOffsetX;
  var canvasY = event.pageY - totalOffsetY;

  return {
    x: canvasX,
    y: canvasY
  };
}
