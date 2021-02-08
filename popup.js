

//type 0 : error, 1:success
function showAlert(type, hideAfter) {
    //console.log("show alert")
    if (type === 0) {
        $('#success-alert').hide();
        $('#error-alert').show();
        $("#error-alert").removeClass("fadeout").addClass("fadein");
        if (hideAfter) {
            setTimeout(function () {
                $('#error-alert').hide();
                $("#error-alert").removeClass("fadein").addClass("fadeout");
            }, 3000);
        }
    } else if (type === 1) {
        $('#error-alert').hide();
        $('#success-alert').show();
        $("#success-alert").removeClass("fadeout").addClass("fadein");
        if (hideAfter) {
            setTimeout(function () {
                $('#success-alert').hide();
                $("#success-alert").removeClass("fadein").addClass("fadeout");
            }, 3000);
        }
    }
}

//translations

function loadTranslation() {
    $('#titoloPrincipale').text(chrome.i18n.getMessage("appName"))
    $('#urlFormText').text(chrome.i18n.getMessage("tutorialText"))
    $('#urlFormUrlText').text(chrome.i18n.getMessage("urlText"))
    $('#setBackground').text(chrome.i18n.getMessage("setButton"))
    $('#setBackgroundImages').text(chrome.i18n.getMessage("setTemplateImagesButton"))
    $('#resetBackground').text(chrome.i18n.getMessage("resetButton"))
    $('#success-alert').text(chrome.i18n.getMessage("successAlert"))
    $('#error-alert').text(chrome.i18n.getMessage("errorAlert"))


}
loadTranslation()
//check if url is img
function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//set background from link
let setBackground = document.getElementById('setBackground');
setBackground.onclick = function (element) {
    let newBackground = document.getElementById("bgImageUrl").value
    if (checkURL(newBackground)) {
        chrome.storage.sync.set({ backgroundImage: newBackground }, function () {
            //console.log("image set to : " + newBackground)
            showAlert(1, true)
        });
    } else {
        showAlert(0, true)
    }

}
//set background as image tempalte
let setBackgroundImages = document.getElementById('setBackgroundImages');
setBackgroundImages.onclick = function (element) {

    //retrieve index of slideshow
    var slides = document.getElementsByClassName("mySlides");
    let newBackground = slides[slideIndex - 1].getElementsByTagName('img')[0].src;
    //console.log(newBackground)
    if (checkURL(newBackground)) {
        chrome.storage.sync.set({ backgroundImage: newBackground }, function () {
            //console.log("This image was set as a background")
            showAlert(1, true)
        });
    } else {
        showAlert(0, true)
    }

}

//reset background
let resetBackground = document.getElementById('resetBackground');
resetBackground.onclick = function (element) {
    chrome.storage.sync.remove("backgroundImage", function () {
        //console.log("image reset")
        showAlert(1, true)
    });
}

//handle image slideshow
document.getElementById("prev").onclick = function (element) {
    plusSlides(-1)
}
document.getElementById("next").onclick = function (element) {
    plusSlides(1)
    //console.log("next")
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    //dots[slideIndex - 1].className += " active";
}


