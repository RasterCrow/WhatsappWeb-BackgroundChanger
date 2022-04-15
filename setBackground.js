let backgroundImage = "";
chrome.storage.sync.get("backgroundImage", function (data) {
  console.log(data.backgroundImage);
  if (data.backgroundImage !== undefined)
    backgroundImage = data.backgroundImage;
});

//_2-aNW
//.RUGMB
//._2wjK5
//._1LcQK

$(document).arrive("._2gzeB", function () {
  // 'this' refers to the newly created element
  var $newElem = $(this);
  if (backgroundImage !== "") {
    $newElem.css(
      "backgroundImage",
      "url(" + backgroundImage + ")",
      "!important"
    );
    $newElem.css("background-size", "cover");
  }
});
